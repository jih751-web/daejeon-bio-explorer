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

-- 앱의 모든 DB 접근은 getSupabaseServerClient()(service_role)를 통하며 RLS를 우회한다.
-- 브라우저에 노출되는 anon key는 DB 테이블에 직접 접근할 필요가 없으므로,
-- 정책 없이 RLS만 켜서 anon key로의 직접 접근을 차단한다.
alter table sessions enable row level security;
alter table observations enable row level security;
alter table quiz_results enable row level security;
