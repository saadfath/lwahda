-- =============================================================================
-- TAWḤDA — protected answer keys for the quiz "unity-day-quiz"
--
-- SECURITY: this file must only be run server-side (Supabase SQL editor,
-- migration, or service role). Never import it into the frontend and never
-- expose the `answer_keys` table through the public API. Enable RLS on the
-- table and grant no SELECT policy to the `anon` / `authenticated` roles;
-- grading must happen in a trusted server-side function (Edge Function or
-- SECURITY DEFINER RPC) that reads this table.
--
-- Assumed schema (adapt column names/types if your table already exists;
-- e.g. use jsonb instead of text[] for source_ids if that is what you defined):
--
--   create table if not exists public.answer_keys (
--     question_id       text primary key,
--     correct_option_id text not null check (correct_option_id in ('a','b','c','d')),
--     explanation_ar    text not null,
--     explanation_fr    text not null,
--     source_ids        text[] not null default '{}'
--   );
--   alter table public.answer_keys enable row level security;
--
-- The seed is repeatable: re-running it updates existing rows (upsert on
-- question_id) and never creates duplicates.
-- Question ids and option ids match src/data/quiz.questions.json exactly.
-- =============================================================================

begin;

insert into public.answer_keys
  (question_id, correct_option_id, explanation_ar, explanation_fr, source_ids)
values
  (
    'q01',
    'b',
    $ar$حدّد بلاغ الديوان الملكي يوم 31 أكتوبر من كل سنة عيدا وطنيا باسم «عيد الوحدة». أما 4 نونبر فهو تاريخ نشر البلاغ، و15 يناير تاريخ مصادقة مجلس الحكومة على مشروعي المرسومين.$ar$,
    $fr$Le communiqué du Cabinet royal fixe le 31 octobre de chaque année comme fête nationale intitulée « Aid Al Wahda ». Le 4 novembre est la date de publication du communiqué, et le 15 janvier celle de l'approbation des deux projets de décret par le Conseil de gouvernement.$fr$,
    array['royal-office-ar']::text[]
  ),
  (
    'q02',
    'd',
    $ar$نُشر بلاغ الديوان الملكي يوم الثلاثاء 4 نونبر 2025. أما 31 أكتوبر 2025 فهو يوم اعتماد القرار 2797 وإلقاء الخطاب الملكي، و15 يناير 2026 يوم مصادقة مجلس الحكومة، و31 أكتوبر 2026 هو أول 31 أكتوبر بعد الإعلان.$ar$,
    $fr$Le communiqué du Cabinet royal a été publié le mardi 4 novembre 2025. Le 31 octobre 2025 est le jour de l'adoption de la résolution 2797 et du discours royal, le 15 janvier 2026 celui de l'approbation par le Conseil de gouvernement, et le 31 octobre 2026 le premier 31 octobre suivant l'annonce.$fr$,
    array['royal-office-ar','royal-office-fr','royal-office-en']::text[]
  ),
  (
    'q03',
    'a',
    $ar$سمّى البلاغ الملكي هذا العيد الوطني «عيد الوحدة» (Aid Al Wahda)، وربط الاسم بالوحدة الوطنية والسلامة الترابية للمملكة.$ar$,
    $fr$Le communiqué royal nomme cette fête nationale « Fête de l'Unité » (Aid Al Wahda), un nom lié à l'unité nationale et à l'intégrité territoriale du Royaume.$fr$,
    array['royal-office-ar','royal-office-fr','royal-office-en']::text[]
  ),
  (
    'q04',
    'c',
    $ar$صدر الإعلان في بلاغ للديوان الملكي. أما مجلس الحكومة فقد صادق لاحقا، يوم 15 يناير 2026، على مشروعي مرسومين لتنفيذ القرار الملكي.$ar$,
    $fr$L'annonce a fait l'objet d'un communiqué du Cabinet royal. Le Conseil de gouvernement est intervenu plus tard, le 15 janvier 2026, en approuvant deux projets de décret pour mettre en œuvre la décision royale.$fr$,
    array['royal-office-ar','royal-office-fr','royal-office-en']::text[]
  ),
  (
    'q05',
    'd',
    $ar$ينص البلاغ على أن 31 أكتوبر مناسبة يصدر فيها الملك عفوه. أما افتتاح البرلمان وعيد العرش فهما المناسبتان الرسميتان للخطب الملكية.$ar$,
    $fr$Le communiqué indique que le 31 octobre est une occasion au cours de laquelle le Roi accorde sa grâce. L'ouverture du Parlement et la fête du Trône sont, elles, les deux occasions officielles des discours royaux.$fr$,
    array['royal-office-ar','royal-office-fr','royal-office-en']::text[]
  ),
  (
    'q06',
    'b',
    $ar$أشار البلاغ إلى قرار مجلس الأمن رقم 2797/2025، الذي اعتُمد يوم 31 أكتوبر 2025.$ar$,
    $fr$Le communiqué mentionne la résolution 2797/2025 du Conseil de sécurité, adoptée le 31 octobre 2025.$fr$,
    array['royal-office-ar','royal-office-fr','un-res-2797']::text[]
  ),
  (
    'q07',
    'c',
    $ar$وفق سجل المكتبة الرقمية للأمم المتحدة، اعتُمد القرار 2797 (2025) بـ11 صوتا مؤيدا ودون أي صوت معارض، مع امتناع 3 أعضاء.$ar$,
    $fr$Selon la fiche de la Bibliothèque numérique des Nations unies, la résolution 2797 (2025) a été adoptée par 11 voix pour, aucune voix contre et 3 abstentions.$fr$,
    array['un-res-2797']::text[]
  ),
  (
    'q08',
    'a',
    $ar$حدّد البلاغ مناسبتين رسميتين للخطب الملكية: عيد العرش وافتتاح السنة التشريعية بالبرلمان، مع احتفاظ الملك بإمكانية مخاطبة الأمة في أي وقت يراه مناسبا.$ar$,
    $fr$Le communiqué fixe deux occasions officielles pour les discours royaux : la fête du Trône et l'ouverture de l'année législative au Parlement, le Roi conservant la possibilité de s'adresser à la Nation à tout autre moment qu'il juge approprié.$fr$,
    array['royal-office-ar','royal-office-en']::text[]
  ),
  (
    'q09',
    'b',
    $ar$أوضح البلاغ أن الاحتفالات بالذكرى الخمسين للمسيرة الخضراء ستجري كما هو مبرمج، دون خطاب ملكي بهذه المناسبة.$ar$,
    $fr$Le communiqué précise que les célébrations du cinquantenaire de la Marche verte se dérouleront comme prévu, sans discours royal à cette occasion.$fr$,
    array['royal-office-ar','royal-office-fr','royal-office-en']::text[]
  ),
  (
    'q10',
    'c',
    $ar$يوم الخميس 15 يناير 2026 صادق مجلس الحكومة على مشروعي المرسومين رقم 2.26.14 ورقم 2.25.1140 لتنفيذ القرار الملكي القاضي بجعل 31 أكتوبر عيدا وطنيا.$ar$,
    $fr$Le jeudi 15 janvier 2026, le Conseil de gouvernement a approuvé les projets de décret n° 2.26.14 et n° 2.25.1140 mettant en œuvre la décision royale qui fait du 31 octobre une fête nationale.$fr$,
    array['medias24-council','hespress-council-en','lematin-decrees']::text[]
  )
on conflict (question_id) do update set
  correct_option_id = excluded.correct_option_id,
  explanation_ar    = excluded.explanation_ar,
  explanation_fr    = excluded.explanation_fr,
  source_ids        = excluded.source_ids;

commit;
