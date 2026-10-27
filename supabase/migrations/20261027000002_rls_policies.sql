-- Migration 2: Enable RLS on all tables
alter table public.answer_keys    enable row level security;
alter table public.players        enable row level security;
alter table public.attempts       enable row level security;
alter table public.question_answers enable row level security;
create policy "players_insert_anon"
  on public.players for insert
  to anon
  with check (
    char_length(trim(full_name)) between 2 and 60
    and char_length(trim(class_name)) between 1 and 40
    and year_of_study in ('1ère année','2ème année','3ème année')
  );
comment on table public.answer_keys is 'No anon policy intentional — access via SECURITY DEFINER RPCs only.';
