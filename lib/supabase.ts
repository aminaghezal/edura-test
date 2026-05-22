import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Fail loud on missing env — avoids the "app installs but won't start" mystery.
// If the build accidentally ships without these, fetchStudents() throws a clear
// message instead of crashing the app on launch with createClient(undefined).
export const supabaseConfigError =
  !supabaseUrl || !supabaseAnonKey
    ? `Supabase credentials missing in the build. EXPO_PUBLIC_SUPABASE_URL=${supabaseUrl ?? 'undefined'} / ANON_KEY=${supabaseAnonKey ? 'set' : 'undefined'}`
    : null;

// Use safe fallback values so createClient doesn't throw at import time
// — fetchStudents will catch the misconfig and surface it to the UI.
export const supabase = createClient(
  supabaseUrl ?? 'https://invalid.supabase.co',
  supabaseAnonKey ?? 'invalid',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

// ── Students ─────────────────────────────────────────────────────────────────

export async function fetchStudents() {
  // Surface misconfig as a fetch error instead of letting Supabase
  // bury it in a generic network failure.
  if (supabaseConfigError) throw new Error(supabaseConfigError);

  // Pull all active students with the columns we display/verify against
  const { data: students, error } = await supabase
    .from('students')
    .select('id, firstName, lastName, firstNameAr, lastNameAr, birthDate, gender, classId, photoUrl, isActive')
    .eq('isActive', true)
    .order('lastName', { ascending: true });

  if (error) throw error;

  // Optional: try to resolve class names from a `classes` table.
  // If the table doesn't exist or fails, we fall back to showing classId.
  const classIds = [...new Set((students ?? []).map((s: any) => s.classId).filter(Boolean))];
  let classMap: Record<string, string> = {};
  if (classIds.length > 0) {
    const { data: classes } = await supabase
      .from('classes')
      .select('id, name')
      .in('id', classIds as string[]);
    if (classes) classMap = Object.fromEntries(classes.map((c: any) => [c.id, c.name]));
  }

  return (students ?? []).map((s: any) => ({
    id: s.id,
    firstName: s.firstName,
    lastName: s.lastName,
    firstNameAr: s.firstNameAr,
    lastNameAr: s.lastNameAr,
    birthDate: s.birthDate,
    gender: s.gender,
    classId: s.classId,
    className: classMap[s.classId] ?? s.classId ?? null,
    photoUrl: s.photoUrl,
  }));
}

// ── Test sessions ────────────────────────────────────────────────────────────

export async function getOrCreateSession(studentId: string) {
  const { count } = await supabase
    .from('test_sessions')
    .select('id', { count: 'exact', head: true })
    .eq('student_id', studentId)
    .eq('status', 'completed');

  const attemptNumber = (count ?? 0) + 1;

  const { data, error } = await supabase
    .from('test_sessions')
    .insert({
      student_id: studentId,
      attempt_number: attemptNumber,
      status: 'in_progress',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completeSession(sessionId: string) {
  const { error } = await supabase
    .from('test_sessions')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', sessionId);

  if (error) throw error;
}

// ── Result sync ──────────────────────────────────────────────────────────────

export async function saveResults(
  sessionId: string,
  studentId: string,
  mbti: any,
  iq: any,
  intelligence: any,
  career: any,
) {
  const now = new Date().toISOString();

  // 1) Insert the full result snapshot into test_results
  const payload = {
    session_id: sessionId,
    student_id: studentId,
    mbti_type: mbti?.type ?? null,
    mbti_scores: mbti?.scores ?? null,
    iq_score: iq?.score ?? null,
    iq_level: iq?.level ?? null,
    iq_percentile: iq?.percentile ?? null,
    dominant_intelligence: intelligence?.dominant ?? null,
    intelligence_scores: intelligence?.scores ?? null,
    career_liked: career?.liked?.map((c: any) => c.id) ?? [],
    career_top_match: career?.topMatch?.id ?? null,
    submitted_at: now,
  };

  const { error } = await supabase
    .from('test_results')
    .upsert(payload, { onConflict: 'session_id' });

  if (error) throw error;

  // 2) Denormalised write-back onto the students table — so other Edura
  //    features (risk model, orientation page, etc.) can read the latest
  //    profile without joining test_results.
  const studentUpdates: Record<string, any> = {
    updatedAt: now,
  };
  if (mbti?.type)            { studentUpdates.mbtiType = mbti.type;            studentUpdates.mbtiTestDate = now; }
  if (typeof iq?.score === 'number') {
    studentUpdates.iqScore = iq.score;
    studentUpdates.iqTestDate = now;
    studentUpdates.iqTestName = 'EDURA Test (interne)';
  }
  if (career?.topMatch?.id)  { studentUpdates.orientationSuggestion = career.topMatch.id; }

  // Don't fail the whole save if the write-back is blocked by policy —
  // the test_results row is the source of truth and is already saved.
  try {
    await supabase.from('students').update(studentUpdates).eq('id', studentId);
  } catch {
    // ignore — non-fatal
  }
}

export async function getStudentResults(studentId: string) {
  const { data, error } = await supabase
    .from('test_results')
    .select('*, test_sessions(attempt_number, completed_at)')
    .eq('student_id', studentId)
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}
