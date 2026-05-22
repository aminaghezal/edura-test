export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string | null;
  lastNameAr?: string | null;
  birthDate: string;        // ISO timestamp from Supabase
  gender?: string | null;
  classId?: string | null;
  className?: string | null; // resolved from classes table when available
  photoUrl?: string | null;
}

export interface TestSession {
  id: string;
  student_id: string;
  attempt_number: number;
  started_at: string;
  completed_at?: string;
  status: 'in_progress' | 'completed';
}

export interface MBTIResult {
  type: string; // e.g. "INTJ"
  scores: {
    E: number; I: number;
    S: number; N: number;
    T: number; F: number;
    J: number; P: number;
  };
  // description is now resolved via mbtiDescriptions in scoring.ts — kept for backward compat
  description?: string;
}

export type IQLevel = 'Below Average' | 'Average' | 'Above Average' | 'Superior' | 'Very Superior';

export interface IQResult {
  score: number;
  level: IQLevel;
  percentile: number;
}

export type IntelligenceType =
  | 'Linguistic'
  | 'Logical-Mathematical'
  | 'Spatial'
  | 'Musical'
  | 'Bodily-Kinesthetic'
  | 'Interpersonal'
  | 'Intrapersonal'
  | 'Naturalist';

export interface IntelligenceResult {
  dominant: IntelligenceType;
  scores: Record<IntelligenceType, number>;
}

import type { Translations } from '@/lib/i18n';

export interface Career {
  id: string;
  title: Translations;
  emoji: string;
  domain: Translations;
  description: Translations;
  traits: Translations[];
}

export interface CareerResult {
  liked: Career[];
  topMatch: Career | null;
}

export interface QuizResults {
  mbti: MBTIResult | null;
  iq: IQResult | null;
  intelligence: IntelligenceResult | null;
  career: CareerResult | null;
}

export type QuizStep = 'mbti' | 'iq' | 'intelligence' | 'career';
