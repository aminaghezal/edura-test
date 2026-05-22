-- =============================================================================
-- FIX DUPLICATE TABLES — keeps YOUR existing `students` table untouched.
-- Detects the real type of `students.id` (TEXT vs UUID) and uses it for FKs.
-- =============================================================================

BEGIN;

-- ── STEP 1: Drop my fake `student` (singular) table ──────────────────────────
DROP TABLE IF EXISTS student CASCADE;

-- ── STEP 2: Drop old test tables (we recreate them with right FK type) ──────
DROP TABLE IF EXISTS test_results  CASCADE;
DROP TABLE IF EXISTS test_sessions CASCADE;

-- ── STEP 3: Detect type of students.id and build matching test tables ───────
DO $$
DECLARE
  id_type TEXT;
BEGIN
  -- Get the actual data type of students.id
  SELECT data_type INTO id_type
  FROM information_schema.columns
  WHERE table_name = 'students' AND column_name = 'id' AND table_schema = 'public';

  IF id_type IS NULL THEN
    RAISE EXCEPTION 'Could not find students.id — does the table exist?';
  END IF;

  RAISE NOTICE 'students.id type detected: %', id_type;

  -- Build test_sessions with matching FK type
  EXECUTE format($f$
    CREATE TABLE test_sessions (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      student_id      %s NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      attempt_number  INTEGER NOT NULL DEFAULT 1,
      status          TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
      started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      completed_at    TIMESTAMPTZ
    )
  $f$, id_type);

  -- Build test_results with matching FK type
  EXECUTE format($f$
    CREATE TABLE test_results (
      id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id              UUID NOT NULL UNIQUE REFERENCES test_sessions(id) ON DELETE CASCADE,
      student_id              %s NOT NULL REFERENCES students(id) ON DELETE CASCADE,
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
    )
  $f$, id_type);
END $$;

CREATE INDEX idx_test_sessions_student  ON test_sessions(student_id);
CREATE INDEX idx_test_results_student   ON test_results(student_id);

-- ── STEP 4: Rebuild the report view ──────────────────────────────────────────
DROP VIEW IF EXISTS student_assessment_summary;

CREATE VIEW student_assessment_summary AS
SELECT
  s.*,
  ts.id             AS session_id,
  ts.attempt_number,
  ts.completed_at,
  tr.mbti_type,
  tr.mbti_scores,
  tr.iq_score,
  tr.iq_level,
  tr.iq_percentile,
  tr.dominant_intelligence,
  tr.intelligence_scores,
  tr.career_liked,
  tr.career_top_match,
  tr.submitted_at
FROM students s
JOIN test_sessions ts ON ts.student_id = s.id
JOIN test_results  tr ON tr.session_id = ts.id
WHERE ts.status = 'completed';

-- ── STEP 5: Row-level security ───────────────────────────────────────────────
ALTER TABLE students       ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tablet can read students"        ON students;
DROP POLICY IF EXISTS "Tablet can create sessions"      ON test_sessions;
DROP POLICY IF EXISTS "Tablet can read sessions"        ON test_sessions;
DROP POLICY IF EXISTS "Tablet can update sessions"      ON test_sessions;
DROP POLICY IF EXISTS "Tablet can create results"       ON test_results;
DROP POLICY IF EXISTS "Tablet can read results"         ON test_results;
DROP POLICY IF EXISTS "Tablet can update results"       ON test_results;

CREATE POLICY "Tablet can read students"    ON students        FOR SELECT TO anon USING (true);
CREATE POLICY "Tablet can create sessions"  ON test_sessions   FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Tablet can read sessions"    ON test_sessions   FOR SELECT TO anon USING (true);
CREATE POLICY "Tablet can update sessions"  ON test_sessions   FOR UPDATE TO anon USING (true);
CREATE POLICY "Tablet can create results"   ON test_results    FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Tablet can read results"     ON test_results    FOR SELECT TO anon USING (true);
CREATE POLICY "Tablet can update results"   ON test_results    FOR UPDATE TO anon USING (true);

COMMIT;

-- =============================================================================
-- DONE. The test tables now use the same id type as your `students` table.
-- =============================================================================
-- Now please run this query and paste me the result — I need to align the
-- app code to your real column names:
--
--   SELECT column_name, data_type FROM information_schema.columns
--   WHERE table_name = 'students' ORDER BY ordinal_position;
-- =============================================================================
