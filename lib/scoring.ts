import { MBTIResult, IQResult, IQLevel, IntelligenceResult, IntelligenceType } from '@/types';
import { Translations, t3 } from '@/lib/i18n';

// ── MBTI ─────────────────────────────────────────────────────────────────────
// Descriptions are trilingual (meaning-based) and looked up from the results UI.

export const mbtiDescriptions: Record<string, { title: Translations; description: Translations }> = {
  INTJ: { title: t3('The Architect', 'L’Architecte', 'المهندس الاستراتيجي'),
          description: t3('Strategic, independent, and driven by long-term vision.', 'Stratège, indépendant(e) et guidé(e) par une vision à long terme.', 'استراتيجي ومستقل، تقوده رؤية طويلة المدى.') },
  INTP: { title: t3('The Thinker', 'Le Penseur', 'المفكّر'),
          description: t3('Analytical, inventive, and fascinated by ideas.', 'Analytique, inventif(ve), fasciné(e) par les idées.', 'تحليلي ومبتكر، تأسرك الأفكار.') },
  ENTJ: { title: t3('The Commander', 'Le Commandant', 'القائد'),
          description: t3('Bold, decisive, and a natural-born leader.', 'Audacieux(se), décidé(e), un(e) leader né(e).', 'جريء وحازم وقائد بالفطرة.') },
  ENTP: { title: t3('The Debater', 'Le Débatteur', 'المُحاور'),
          description: t3('Clever, curious, and thrives on intellectual challenges.', 'Astucieux(se), curieux(se), aime les défis intellectuels.', 'ذكي وفضولي، يستمتع بالتحديات الفكرية.') },
  INFJ: { title: t3('The Advocate', 'L’Avocat(e)', 'النصير'),
          description: t3('Insightful, principled, and deeply empathetic.', 'Perspicace, fidèle à ses principes et profondément empathique.', 'بصير ومبدئي وذو تعاطف عميق.') },
  INFP: { title: t3('The Mediator', 'Le Médiateur', 'الوسيط'),
          description: t3('Idealistic, creative, and guided by personal values.', 'Idéaliste, créatif(ve), guidé(e) par ses valeurs.', 'مثالي ومبدع، تقوده قيمه الشخصية.') },
  ENFJ: { title: t3('The Protagonist', 'Le Protagoniste', 'البطل'),
          description: t3('Charismatic, inspiring, and focused on others.', 'Charismatique, inspirant(e), centré(e) sur les autres.', 'كاريزمي وملهم، يركّز على الآخرين.') },
  ENFP: { title: t3('The Campaigner', 'Le Campaigner', 'صاحب الرسالة'),
          description: t3('Enthusiastic, creative, and socially vibrant.', 'Enthousiaste, créatif(ve), socialement rayonnant(e).', 'متحمس ومبدع، ذو حضور اجتماعي.') },
  ISTJ: { title: t3('The Logistician', 'Le Logisticien', 'المنظّم'),
          description: t3('Reliable, organized, and committed to duty.', 'Fiable, organisé(e), engagé(e) dans son devoir.', 'موثوق ومنظّم، ملتزم بواجبه.') },
  ISFJ: { title: t3('The Defender', 'Le Défenseur', 'المُدافع'),
          description: t3('Caring, loyal, and attentive to others’ needs.', 'Attentionné(e), loyal(e), à l’écoute des autres.', 'مهتم ومخلص، يرعى احتياجات الآخرين.') },
  ESTJ: { title: t3('The Executive', 'L’Exécutif(ve)', 'التنفيذي'),
          description: t3('Organized, assertive, and values order.', 'Organisé(e), affirmé(e), apprécie l’ordre.', 'منظّم وحازم، يقدّر النظام.') },
  ESFJ: { title: t3('The Consul', 'Le Consul', 'القنصل'),
          description: t3('Warm, social, and eager to help.', 'Chaleureux(se), social(e), désireux(se) d’aider.', 'دافئ واجتماعي، حريص على المساعدة.') },
  ISTP: { title: t3('The Virtuoso', 'Le Virtuose', 'البارع'),
          description: t3('Hands-on, observant, and mechanically gifted.', 'Pratique, observateur(trice), doué(e) techniquement.', 'عملي وملاحظ، موهوب تقنياً.') },
  ISFP: { title: t3('The Adventurer', 'L’Aventurier(ère)', 'المغامر'),
          description: t3('Artistic, gentle, and spontaneous.', 'Artistique, doux(ce), spontané(e).', 'فني وهادئ وعفوي.') },
  ESTP: { title: t3('The Entrepreneur', 'L’Entrepreneur(e)', 'رجل المبادرة'),
          description: t3('Energetic, perceptive, and action-oriented.', 'Énergique, perspicace, tourné(e) vers l’action.', 'نشيط وحاد الملاحظة وميّال للعمل.') },
  ESFP: { title: t3('The Entertainer', 'L’Animateur(trice)', 'المؤدّي'),
          description: t3('Playful, expressive, and loves the spotlight.', 'Joueur(se), expressif(ve), aime la scène.', 'مرح ومعبّر، يحب الأضواء.') },
};

export function scoreMBTI(answers: Record<number, 'A' | 'B'>): MBTIResult {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  Object.entries(answers).forEach(([idx, answer]) => {
    const i = parseInt(idx);
    if (i < 15) { answer === 'A' ? scores.E++ : scores.I++; }
    else if (i < 30) { answer === 'A' ? scores.S++ : scores.N++; }
    else if (i < 45) { answer === 'A' ? scores.T++ : scores.F++; }
    else { answer === 'A' ? scores.J++ : scores.P++; }
  });

  const type =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return { type, scores };
}

// ── IQ scoring ───────────────────────────────────────────────────────────────
// Level is returned as a stable English string (used as DB value); the UI maps
// it to ui.iq_* keys for translation.

export function scoreIQ(correctCount: number, totalQuestions: number): IQResult {
  const ratio = correctCount / totalQuestions;
  const score = Math.round(70 + ratio * 75);

  let level: IQLevel;
  let percentile: number;

  if (score < 80)       { level = 'Below Average'; percentile = 9; }
  else if (score < 90)  { level = 'Average';        percentile = 25; }
  else if (score < 110) { level = 'Average';        percentile = 50; }
  else if (score < 120) { level = 'Above Average';  percentile = 75; }
  else if (score < 130) { level = 'Superior';       percentile = 91; }
  else                  { level = 'Very Superior';  percentile = 98; }

  return { score, level, percentile };
}

// Map IQLevel → i18n key for the UI
export const iqLevelKey: Record<IQLevel, 'iq_below' | 'iq_average' | 'iq_above' | 'iq_high' | 'iq_genius'> = {
  'Below Average': 'iq_below',
  'Average':       'iq_average',
  'Above Average': 'iq_above',
  'Superior':      'iq_high',
  'Very Superior': 'iq_genius',
};

// ── Multiple Intelligences scoring ───────────────────────────────────────────

export function scoreIntelligences(
  answers: Record<number, number>,
  questionMap: Array<{ type: IntelligenceType }>,
): IntelligenceResult {
  const totals: Record<string, number> = {
    Linguistic: 0, 'Logical-Mathematical': 0, Spatial: 0,
    Musical: 0, 'Bodily-Kinesthetic': 0, Interpersonal: 0,
    Intrapersonal: 0, Naturalist: 0,
  };
  const counts: Record<string, number> = { ...totals };

  Object.entries(answers).forEach(([idx, val]) => {
    const type = questionMap[parseInt(idx)]?.type;
    if (type) { totals[type] += val; counts[type]++; }
  });

  const scores: Record<IntelligenceType, number> = {} as any;
  (Object.keys(totals) as IntelligenceType[]).forEach((k) => {
    scores[k] = counts[k] > 0 ? Math.round((totals[k] / (counts[k] * 5)) * 100) : 0;
  });

  const dominant = (Object.entries(scores) as [IntelligenceType, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  return { dominant, scores };
}

// ── Maps Howard Gardner's IntelligenceType to lowercase i18n key ────────────
export const intelligenceI18nKey: Record<IntelligenceType, string> = {
  Linguistic: 'linguistic',
  'Logical-Mathematical': 'logical',
  Spatial: 'spatial',
  Musical: 'musical',
  'Bodily-Kinesthetic': 'bodily',
  Interpersonal: 'interpersonal',
  Intrapersonal: 'intrapersonal',
  Naturalist: 'naturalist',
};
