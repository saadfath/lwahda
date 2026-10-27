-- Migration 1: Create tables for TAWḤDA quiz
create table if not exists public.answer_keys (
  question_id       text primary key,
  correct_option_id text not null check (correct_option_id in ('a','b','c','d')),
  explanation_ar    text not null,
  explanation_fr    text not null,
  source_ids        text[] not null default '{}'
);
create table if not exists public.players (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null check (char_length(trim(full_name)) between 2 and 60),
  class_name       text not null check (char_length(trim(class_name)) between 1 and 40),
  year_of_study    text not null check (year_of_study in ('1ère année','2ème année','3ème année')),
  created_at       timestamptz not null default now()
);
create table if not exists public.attempts (
  id                   uuid primary key default gen_random_uuid(),
  player_id            uuid not null references public.players(id) on delete cascade,
  status               text not null default 'in_progress'
                         check (status in ('in_progress','finished','invalidated')),
  score                integer,
  correct_count        integer,
  total_time_seconds   numeric(8,3),
  started_at           timestamptz not null default now(),
  finished_at          timestamptz,
  constraint attempts_score_range check (score is null or score between 0 and 2000)
);
create table if not exists public.question_answers (
  id                uuid primary key default gen_random_uuid(),
  attempt_id        uuid not null references public.attempts(id) on delete cascade,
  question_id       text not null,
  option_id         text     check (option_id in ('a','b','c','d')),
  is_correct        boolean,
  time_taken_seconds numeric(8,3),
  submitted_at      timestamptz not null default now(),
  constraint question_answers_unique unique (attempt_id, question_id)
);
create index on public.attempts (player_id);
create index on public.attempts (status, score desc, total_time_seconds asc, finished_at asc);
create index on public.question_answers (attempt_id);
