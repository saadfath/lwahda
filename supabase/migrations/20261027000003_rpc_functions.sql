-- Migration 3: RPC functions (all SECURITY DEFINER)
create or replace function public.start_attempt(
  p_full_name     text,
  p_class_name    text,
  p_year_of_study text
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_player_id   uuid;
  v_attempt_id  uuid;
  v_count       int;
begin
  p_full_name     := trim(p_full_name);
  p_class_name    := trim(p_class_name);
  p_year_of_study := trim(p_year_of_study);
  if char_length(p_full_name) < 2 or char_length(p_full_name) > 60 then
    raise exception 'invalid_full_name' using errcode = 'P0001';
  end if;
  if char_length(p_class_name) < 1 or char_length(p_class_name) > 40 then
    raise exception 'invalid_class_name' using errcode = 'P0001';
  end if;
  if p_year_of_study not in ('1ère année','2ème année','3ème année') then
    raise exception 'invalid_year_of_study' using errcode = 'P0001';
  end if;
  select count(*) into v_count
  from public.attempts a
  join public.players  p on p.id = a.player_id
  where lower(trim(p.full_name)) = lower(p_full_name)
    and lower(trim(p.class_name)) = lower(p_class_name)
    and a.started_at > now() - interval '24 hours';
  if v_count >= 5 then
    raise exception 'rate_limit_exceeded' using errcode = 'P0002';
  end if;
  insert into public.players (full_name, class_name, year_of_study)
  values (p_full_name, p_class_name, p_year_of_study)
  returning id into v_player_id;
  insert into public.attempts (player_id, status)
  values (v_player_id, 'in_progress')
  returning id into v_attempt_id;
  return json_build_object('attempt_id', v_attempt_id);
end;
$$;

create or replace function public.submit_answer(
  p_attempt_id  uuid,
  p_question_id text,
  p_option_id   text
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt         record;
  v_correct_option  text;
  v_is_correct      boolean;
  v_time_taken      numeric;
  v_already_exists  int;
begin
  select * into v_attempt from public.attempts where id = p_attempt_id;
  if not found then raise exception 'attempt_not_found' using errcode = 'P0003'; end if;
  if v_attempt.status <> 'in_progress' then raise exception 'attempt_not_in_progress' using errcode = 'P0003'; end if;
  select count(*) into v_already_exists from public.question_answers where attempt_id = p_attempt_id and question_id = p_question_id;
  if v_already_exists > 0 then raise exception 'already_answered' using errcode = 'P0004'; end if;
  if p_option_id is not null and p_option_id not in ('a','b','c','d') then raise exception 'invalid_option_id' using errcode = 'P0001'; end if;
  v_time_taken := extract(epoch from (now() - v_attempt.started_at));
  select correct_option_id into v_correct_option from public.answer_keys where question_id = p_question_id;
  if not found then raise exception 'question_not_found' using errcode = 'P0005'; end if;
  v_is_correct := (p_option_id is not null and p_option_id = v_correct_option);
  insert into public.question_answers (attempt_id, question_id, option_id, is_correct, time_taken_seconds)
  values (p_attempt_id, p_question_id, p_option_id, v_is_correct, v_time_taken);
  return json_build_object('is_correct', v_is_correct);
end;
$$;

create or replace function public.finish_attempt(
  p_attempt_id uuid
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt         record;
  v_total_score     integer := 0;
  v_correct_count   integer := 0;
  v_total_time      numeric;
  v_rank            bigint;
  v_ans             record;
  v_prev_time       numeric := 0;
  v_q_time          numeric;
  v_speed_bonus     integer;
begin
  select * into v_attempt from public.attempts where id = p_attempt_id;
  if not found then raise exception 'attempt_not_found' using errcode = 'P0003'; end if;
  if v_attempt.status <> 'in_progress' then raise exception 'attempt_not_in_progress' using errcode = 'P0003'; end if;
  v_total_time := extract(epoch from (now() - v_attempt.started_at));
  for v_ans in select qa.is_correct, qa.time_taken_seconds from public.question_answers qa where qa.attempt_id = p_attempt_id order by qa.submitted_at asc loop
    v_q_time := v_ans.time_taken_seconds - v_prev_time;
    v_prev_time := v_ans.time_taken_seconds;
    if v_ans.is_correct then
      v_correct_count := v_correct_count + 1;
      v_speed_bonus := floor(100.0 * greatest(0.0, (20.0 - v_q_time) / 20.0))::integer;
      v_total_score := v_total_score + 100 + v_speed_bonus;
    end if;
  end loop;
  update public.attempts set status='finished', score=v_total_score, correct_count=v_correct_count, total_time_seconds=v_total_time, finished_at=now() where id = p_attempt_id;
  select count(*) + 1 into v_rank from public.attempts where status='finished' and id <> p_attempt_id and (score > v_total_score or (score = v_total_score and total_time_seconds < v_total_time) or (score = v_total_score and total_time_seconds = v_total_time and finished_at < now()));
  return json_build_object('score', v_total_score, 'correct_count', v_correct_count, 'total_time_seconds', v_total_time, 'rank', v_rank);
end;
$$;

create or replace function public.get_attempt_status(
  p_attempt_id uuid
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt     record;
  v_answered    int;
  v_next_q_idx  int;
begin
  select * into v_attempt from public.attempts where id = p_attempt_id;
  if not found then return json_build_object('status', 'not_found'); end if;
  if v_attempt.status = 'finished' then return json_build_object('status', 'finished', 'score', v_attempt.score, 'correct_count', v_attempt.correct_count, 'total_time_seconds', v_attempt.total_time_seconds); end if;
  if v_attempt.status = 'invalidated' then return json_build_object('status', 'invalidated'); end if;
  select count(*) into v_answered from public.question_answers where attempt_id = p_attempt_id;
  v_next_q_idx := v_answered;
  return json_build_object('status', 'in_progress', 'next_q_index', v_next_q_idx);
end;
$$;

create or replace function public.get_leaderboard(
  p_limit int default 50
)
returns table (
  rank               bigint,
  full_name          text,
  class_name         text,
  year_of_study      text,
  score              integer,
  correct_count      integer,
  total_time_seconds numeric
)
language sql
security definer
set search_path = public
as $$
  with best_attempts as (
    select pl.full_name, pl.class_name, pl.year_of_study, a.score, a.correct_count, a.total_time_seconds,
      row_number() over (partition by pl.full_name, pl.class_name order by a.score desc, a.total_time_seconds asc, a.finished_at asc) as rn
    from public.attempts a join public.players pl on pl.id = a.player_id where a.status = 'finished'
  )
  select rank() over (order by score desc, total_time_seconds asc) as rank, full_name, class_name, year_of_study, score, correct_count, total_time_seconds
  from best_attempts where rn = 1 order by score desc, total_time_seconds asc limit p_limit;
$$;

grant execute on function public.start_attempt(text,text,text)  to anon, authenticated;
grant execute on function public.submit_answer(uuid,text,text)  to anon, authenticated;
grant execute on function public.finish_attempt(uuid)           to anon, authenticated;
grant execute on function public.get_attempt_status(uuid)       to anon, authenticated;
grant execute on function public.get_leaderboard(int)           to anon, authenticated;
