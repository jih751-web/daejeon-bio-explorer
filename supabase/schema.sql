create table sessions (
  code text primary key,
  teacher_name text,
  created_at timestamptz not null default now()
);

create table observations (
  id uuid primary key default gen_random_uuid(),
  code text not null references sessions(code) on delete cascade,
  nickname text not null,
  photo_url text not null,
  species_name text not null,
  confidence numeric not null,
  description text,
  created_at timestamptz not null default now()
);

create table quiz_results (
  id uuid primary key default gen_random_uuid(),
  code text not null references sessions(code) on delete cascade,
  nickname text not null,
  observation_id uuid not null references observations(id) on delete cascade,
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);

create index observations_code_idx on observations(code);
create index quiz_results_code_idx on quiz_results(code);

-- 학생 사진 업로드용 버킷 (Supabase 대시보드에서 Storage > New bucket 'observation-photos', public으로 생성)
