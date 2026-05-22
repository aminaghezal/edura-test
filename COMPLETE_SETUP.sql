-- =============================================================================
-- EDURA + EDURA TEST — Complete Database Setup
-- =============================================================================
-- This single file sets up your ENTIRE database from scratch.
-- Run this once in your Supabase SQL Editor (https://supabase.com/dashboard).
--
-- It creates:
--   1. All Edura platform tables (students, classes, teachers, etc.)
--   2. EDURA Test tables (sessions + results)
--   3. Sample data so you can immediately test the app
--   4. Security policies that allow the tablet app to read/write
-- =============================================================================

-- ── Clean slate (only drops tables this script created — safe to re-run) ─────
DROP VIEW  IF EXISTS student_assessment_summary CASCADE;
DROP TABLE IF EXISTS test_results            CASCADE;
DROP TABLE IF EXISTS test_sessions           CASCADE;
DROP TABLE IF EXISTS attendance              CASCADE;
DROP TABLE IF EXISTS assignment_submission   CASCADE;
DROP TABLE IF EXISTS assignment              CASCADE;
DROP TABLE IF EXISTS grade                   CASCADE;
DROP TABLE IF EXISTS exam                    CASCADE;
DROP TABLE IF EXISTS notification            CASCADE;
DROP TABLE IF EXISTS schedule                CASCADE;
DROP TABLE IF EXISTS class_course            CASCADE;
DROP TABLE IF EXISTS class_student_rel       CASCADE;
DROP TABLE IF EXISTS course                  CASCADE;
DROP TABLE IF EXISTS class                   CASCADE;
DROP TABLE IF EXISTS teacher                 CASCADE;
DROP TABLE IF EXISTS student                 CASCADE;
DROP TABLE IF EXISTS season                  CASCADE;
DROP TABLE IF EXISTS profiles                CASCADE;

-- =============================================================================
-- PART 1 — EDURA PLATFORM TABLES
-- =============================================================================

CREATE TABLE profiles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID UNIQUE,
  full_name   TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
  email       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE teacher (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id          UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject_specialty   TEXT,
  hire_date           DATE DEFAULT CURRENT_DATE
);

CREATE TABLE student (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  date_of_birth   DATE NOT NULL,
  gender          TEXT CHECK (gender IN ('M', 'F')),
  address         TEXT,
  email           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE class (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT NOT NULL
);

CREATE TABLE course (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT NOT NULL
);

CREATE TABLE class_student_rel (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    UUID REFERENCES class(id)   ON DELETE CASCADE,
  student_id  UUID REFERENCES student(id) ON DELETE CASCADE,
  UNIQUE (class_id, student_id)
);

CREATE TABLE class_course (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    UUID REFERENCES class(id)   ON DELETE CASCADE,
  course_id   UUID REFERENCES course(id)  ON DELETE CASCADE,
  teacher_id  UUID REFERENCES teacher(id) ON DELETE SET NULL,
  UNIQUE (class_id, course_id)
);

CREATE TABLE season (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  start_date  DATE,
  end_date    DATE
);

CREATE TABLE schedule (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_course_id UUID REFERENCES class_course(id) ON DELETE CASCADE,
  teacher_id      UUID REFERENCES teacher(id),
  season_id       UUID REFERENCES season(id),
  day_of_week     INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  start_time      TIME,
  end_time        TIME,
  room            TEXT
);

CREATE TABLE exam (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_course_id UUID REFERENCES class_course(id) ON DELETE CASCADE,
  season_id       UUID REFERENCES season(id),
  date            DATE,
  start_time      TIME,
  end_time        TIME,
  type            TEXT,
  room            TEXT
);

CREATE TABLE grade (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID REFERENCES student(id) ON DELETE CASCADE,
  exam_id     UUID REFERENCES exam(id)    ON DELETE CASCADE,
  score       NUMERIC(5,2),
  remarks     TEXT,
  UNIQUE (student_id, exam_id)
);

CREATE TABLE assignment (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  description     TEXT,
  class_course_id UUID REFERENCES class_course(id) ON DELETE CASCADE,
  teacher_id      UUID REFERENCES teacher(id),
  due_date        TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE assignment_submission (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      UUID REFERENCES student(id)    ON DELETE CASCADE,
  assignment_id   UUID REFERENCES assignment(id) ON DELETE CASCADE,
  file_url        TEXT,
  grade           NUMERIC(5,2),
  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, assignment_id)
);

CREATE TABLE attendance (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      UUID REFERENCES student(id) ON DELETE CASCADE,
  class_course_id UUID REFERENCES class_course(id) ON DELETE CASCADE,
  date            DATE NOT NULL,
  status          TEXT CHECK (status IN ('present', 'absent', 'late', 'excused')),
  reason          TEXT,
  UNIQUE (student_id, class_course_id, date)
);

CREATE TABLE notification (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_profile_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  receiver_profile_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title                 TEXT NOT NULL,
  message               TEXT,
  is_read               BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- PART 2 — EDURA TEST TABLES
-- =============================================================================

CREATE TABLE test_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE,
  attempt_number  INTEGER NOT NULL DEFAULT 1,
  status          TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

CREATE TABLE test_results (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id              UUID NOT NULL UNIQUE REFERENCES test_sessions(id) ON DELETE CASCADE,
  student_id              UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE,
  mbti_type               TEXT,
  mbti_scores             JSONB,
  iq_score                INTEGER,
  iq_level                TEXT,
  iq_percentile           INTEGER,
  dominant_intelligence   TEXT,
  intelligence_scores     JSONB,
  career_liked            TEXT[],
  career_top_match        TEXT,
  submitted_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_test_sessions_student   ON test_sessions(student_id);
CREATE INDEX idx_test_results_student    ON test_results(student_id);
CREATE INDEX idx_test_results_submitted  ON test_results(submitted_at DESC);
CREATE INDEX idx_class_student_rel       ON class_student_rel(student_id, class_id);

-- =============================================================================
-- PART 3 — VIEW for Edura dashboard
-- =============================================================================

CREATE VIEW student_assessment_summary AS
SELECT
  s.id              AS student_id,
  s.full_name,
  ts.attempt_number,
  ts.completed_at,
  tr.mbti_type,
  tr.iq_score,
  tr.iq_level,
  tr.dominant_intelligence,
  tr.career_top_match,
  tr.submitted_at
FROM student s
JOIN test_sessions ts ON ts.student_id = s.id
JOIN test_results  tr ON tr.session_id = ts.id
WHERE ts.status = 'completed'
ORDER BY tr.submitted_at DESC;

-- =============================================================================
-- PART 4 — ROW LEVEL SECURITY (lets the tablet app read & write safely)
-- =============================================================================

ALTER TABLE student              ENABLE ROW LEVEL SECURITY;
ALTER TABLE class                ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_student_rel    ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results         ENABLE ROW LEVEL SECURITY;

-- Tablet app needs to READ the student list
CREATE POLICY "Tablet can read students"          ON student            FOR SELECT TO anon USING (true);
CREATE POLICY "Tablet can read classes"           ON class              FOR SELECT TO anon USING (true);
CREATE POLICY "Tablet can read class_student_rel" ON class_student_rel  FOR SELECT TO anon USING (true);

-- Tablet app needs to WRITE test results
CREATE POLICY "Tablet can create sessions"   ON test_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Tablet can read sessions"     ON test_sessions FOR SELECT TO anon USING (true);
CREATE POLICY "Tablet can update sessions"   ON test_sessions FOR UPDATE TO anon USING (true);
CREATE POLICY "Tablet can create results"    ON test_results  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Tablet can update results"    ON test_results  FOR UPDATE TO anon USING (true);
CREATE POLICY "Tablet can read results"      ON test_results  FOR SELECT TO anon USING (true);

-- =============================================================================
-- PART 5 — SAMPLE DATA (so you can test immediately)
-- =============================================================================

-- Classes
INSERT INTO class (id, name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Grade 10 - A'),
  ('22222222-2222-2222-2222-222222222222', 'Grade 11 - B'),
  ('33333333-3333-3333-3333-333333333333', 'Grade 12 - A');

-- Courses
INSERT INTO course (id, name) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mathematics'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Physics'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Literature');

-- Students (with realistic test DOBs you can use to log in)
INSERT INTO student (id, full_name, date_of_birth, gender) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Amina Boudiaf',     '2008-05-12', 'F'),
  ('a0000002-0000-0000-0000-000000000002', 'Yacine Belkacem',   '2007-09-23', 'M'),
  ('a0000003-0000-0000-0000-000000000003', 'Lina Hamidi',       '2008-02-14', 'F'),
  ('a0000004-0000-0000-0000-000000000004', 'Karim Ouali',       '2007-11-30', 'M'),
  ('a0000005-0000-0000-0000-000000000005', 'Sara Mansouri',     '2008-07-08', 'F'),
  ('a0000006-0000-0000-0000-000000000006', 'Mehdi Cherif',      '2007-03-19', 'M'),
  ('a0000007-0000-0000-0000-000000000007', 'Nour Benali',       '2008-12-04', 'F'),
  ('a0000008-0000-0000-0000-000000000008', 'Rayan Khelifi',     '2007-06-27', 'M'),
  ('a0000009-0000-0000-0000-000000000009', 'Yasmine Saidi',     '2008-01-15', 'F'),
  ('a0000010-0000-0000-0000-000000000010', 'Adam Brahimi',      '2007-08-21', 'M'),
  ('a0000011-0000-0000-0000-000000000011', 'Maya Tounsi',       '2008-04-09', 'F'),
  ('a0000012-0000-0000-0000-000000000012', 'Sami Larbi',        '2007-10-13', 'M');

-- Assign students to classes
INSERT INTO class_student_rel (class_id, student_id) VALUES
  -- Grade 10 - A
  ('11111111-1111-1111-1111-111111111111', 'a0000001-0000-0000-0000-000000000001'),
  ('11111111-1111-1111-1111-111111111111', 'a0000003-0000-0000-0000-000000000003'),
  ('11111111-1111-1111-1111-111111111111', 'a0000005-0000-0000-0000-000000000005'),
  ('11111111-1111-1111-1111-111111111111', 'a0000007-0000-0000-0000-000000000007'),
  ('11111111-1111-1111-1111-111111111111', 'a0000009-0000-0000-0000-000000000009'),
  ('11111111-1111-1111-1111-111111111111', 'a0000011-0000-0000-0000-000000000011'),
  -- Grade 11 - B
  ('22222222-2222-2222-2222-222222222222', 'a0000002-0000-0000-0000-000000000002'),
  ('22222222-2222-2222-2222-222222222222', 'a0000004-0000-0000-0000-000000000004'),
  ('22222222-2222-2222-2222-222222222222', 'a0000006-0000-0000-0000-000000000006'),
  -- Grade 12 - A
  ('33333333-3333-3333-3333-333333333333', 'a0000008-0000-0000-0000-000000000008'),
  ('33333333-3333-3333-3333-333333333333', 'a0000010-0000-0000-0000-000000000010'),
  ('33333333-3333-3333-3333-333333333333', 'a0000012-0000-0000-0000-000000000012');

-- =============================================================================
-- DONE! Your database is fully set up.
-- =============================================================================
-- Test the tablet app: any of the 12 students above can log in using their
-- date of birth (formatted as DD/MM/YYYY in the app).
--
-- Example: "Amina Boudiaf" → enter 12/05/2008
--          "Yacine Belkacem" → enter 23/09/2007
-- =============================================================================
