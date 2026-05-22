import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ────────────────────────────────────────────────────────────────────────────
// Supported languages — meaning-based translation, not word-by-word
// EN: English  ·  FR: French  ·  AR: Modern Standard Arabic (RTL)
// ────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'fr' | 'ar';

export const LANGS: { code: Lang; label: string; native: string; flag: string; rtl: boolean }[] = [
  { code: 'en', label: 'English',  native: 'English',  flag: '🇬🇧', rtl: false },
  { code: 'fr', label: 'French',   native: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'ar', label: 'Arabic',   native: 'العربية',  flag: '🇸🇦', rtl: true  },
];

export type Translations = Record<Lang, string>;

// Helper for cleaner trilingual entries elsewhere
export const t3 = (en: string, fr: string, ar: string): Translations => ({ en, fr, ar });

// ────────────────────────────────────────────────────────────────────────────
// UI dictionary
// ────────────────────────────────────────────────────────────────────────────

export const ui = {
  // Brand & generic
  brand:           t3('EDURA', 'EDURA', 'إدورا'),
  assessmentCentre:t3('Assessment Centre',         'Centre d’évaluation',          'مركز التقييم'),
  language:        t3('Language',                  'Langue',                       'اللغة'),
  cancel:          t3('Cancel',                    'Annuler',                      'إلغاء'),
  retry:           t3('Retry',                     'Réessayer',                    'إعادة المحاولة'),
  close:           t3('Close',                     'Fermer',                       'إغلاق'),
  loading:         t3('Loading…',                  'Chargement…',                  'جارٍ التحميل…'),

  // Home screen
  searchPlaceholder: t3('Search student name…',    'Rechercher un élève…',         'ابحث عن اسم الطالب…'),
  studentsCount:     t3('students',                'élèves',                       'طالب'),
  loadingStudents:   t3('Loading students from Edura…', 'Chargement des élèves depuis Edura…', 'جارٍ تحميل قائمة الطلاب من إدورا…'),
  noStudents:        t3('No students found',       'Aucun élève trouvé',           'لا يوجد طلاب'),
  tapToBegin:        t3('Tap your name to begin the assessment', 'Touchez votre nom pour commencer', 'انقر على اسمك لبدء التقييم'),
  loadFailed:        t3('Could not load students. Check your connection.', 'Impossible de charger les élèves. Vérifiez votre connexion.', 'تعذّر تحميل الطلاب. تحقّق من اتصالك.'),

  // Verify screen
  verifyTitle:    t3('Verify Your Identity',          'Vérifiez votre identité',          'تحقق من هويتك'),
  verifySub:      t3('Enter your date of birth to continue', 'Entrez votre date de naissance pour continuer', 'أدخل تاريخ ميلادك للمتابعة'),
  dobPlaceholder: t3('DD/MM/YYYY',                    'JJ/MM/AAAA',                       'يوم/شهر/سنة'),
  dobInvalid:     t3('Enter your date of birth as DD/MM/YYYY', 'Entrez la date au format JJ/MM/AAAA', 'أدخل التاريخ بالشكل يوم/شهر/سنة'),
  dobMismatch:    t3('Date of birth does not match. Please try again.', 'La date de naissance ne correspond pas. Réessayez.', 'تاريخ الميلاد غير مطابق. حاول مجدداً.'),
  dobNotSet:      t3('Your birthday has not been registered yet. Please ask your teacher to set it up.', 'Votre date de naissance n’a pas encore été enregistrée. Demandez à votre enseignant(e) de l’ajouter.', 'لم يتم تسجيل تاريخ ميلادك بعد. اطلب من معلمك إضافته.'),
  checking:       t3('Checking…',                     'Vérification…',                    'جارٍ التحقق…'),
  startAssessment:t3('Start Assessment',              'Commencer l’évaluation',           'ابدأ التقييم'),
  resultsSentAuto:t3('Your results will be sent to your school automatically.', 'Vos résultats seront envoyés automatiquement à votre école.', 'سيتم إرسال نتائجك إلى مدرستك تلقائياً.'),

  // Previous attempt dialog
  prevTitle:    t3('Previous Results Found',  'Résultats précédents trouvés',  'نتائج سابقة موجودة'),
  prevBodyOne:  t3('You have already completed the assessment once. Would you like to take it again?', 'Vous avez déjà passé l’évaluation une fois. Voulez-vous la repasser ?', 'لقد أكملت التقييم مرة سابقة. هل تريد إعادته؟'),
  prevBodyMany: t3('You have already completed the assessment {n} times. Would you like to take it again?', 'Vous avez déjà passé l’évaluation {n} fois. Voulez-vous la repasser ?', 'لقد أكملت التقييم {n} مرات. هل تريد إعادته؟'),
  viewResults:  t3('View Results',            'Voir les résultats',            'عرض النتائج'),
  takeAgain:    t3('Take Again',              'Repasser',                      'إعادة التقييم'),

  // Intro screen
  introTitle:     t3('Your Assessment',           'Votre évaluation',                  'تقييمك'),
  introSub:       t3('Complete all 4 sections. Results are shared with your school automatically.', 'Complétez les 4 sections. Les résultats seront partagés automatiquement avec votre école.', 'أكمل جميع الأقسام الأربعة. سيتم مشاركة النتائج مع مدرستك تلقائياً.'),
  stepMbtiTitle:  t3('Personality (MBTI)',        'Personnalité (MBTI)',               'الشخصية (MBTI)'),
  stepMbtiDesc:   t3('60 questions · ~12 min',    '60 questions · ~12 min',            '60 سؤالاً · 12 دقيقة تقريباً'),
  stepIqTitle:    t3('IQ Test',                   'Test de QI',                        'اختبار الذكاء (IQ)'),
  stepIqDesc:     t3('20 questions · ~15 min',    '20 questions · ~15 min',            '20 سؤالاً · 15 دقيقة تقريباً'),
  stepIntelTitle: t3('Multiple Intelligences',    'Intelligences multiples',           'الذكاءات المتعددة'),
  stepIntelDesc:  t3('40 questions · ~8 min',     '40 questions · ~8 min',             '40 سؤالاً · 8 دقائق تقريباً'),
  stepCareerTitle:t3('Career Match',              'Correspondance professionnelle',    'المهنة المناسبة'),
  stepCareerDesc: t3('Swipe 30 careers · ~5 min', 'Balayez 30 métiers · ~5 min',       'اسحب 30 مهنة · 5 دقائق تقريباً'),
  rule1: t3('There are no right or wrong answers',          'Il n’y a pas de bonnes ou mauvaises réponses', 'لا توجد إجابات صحيحة أو خاطئة'),
  rule2: t3('Answer honestly — it gives better results',     'Répondez sincèrement — vous aurez de meilleurs résultats', 'أجب بصدق — ستحصل على نتائج أدق'),
  rule3: t3('Do not close the app mid-assessment',           'Ne fermez pas l’application en cours d’évaluation', 'لا تُغلق التطبيق أثناء التقييم'),
  rule4: t3('Total time: approximately 40 minutes',          'Durée totale : environ 40 minutes',           'المدة الإجمالية: حوالي 40 دقيقة'),
  beginAssessment: t3('Begin Assessment',         'Commencer l’évaluation',            'ابدأ التقييم'),

  // MBTI screen
  mbtiHeader:   t3('Personality',                 'Personnalité',                       'الشخصية'),
  pickOption:   t3('Pick the option that feels most like you', 'Choisissez l’option qui vous ressemble le plus', 'اختر الخيار الذي يشبهك أكثر'),
  optionOr:     t3('OR',                          'OU',                                 'أو'),

  // IQ screen
  iqHeader:     t3('IQ Test',                     'Test de QI',                         'اختبار الذكاء'),
  iqTimeLeft:   t3('Time left',                   'Temps restant',                      'الوقت المتبقي'),
  iqExplain:    t3('Explanation',                 'Explication',                        'التوضيح'),
  iqCorrect:    t3('Correct!',                    'Correct !',                          'إجابة صحيحة!'),
  iqWrong:      t3('Incorrect',                   'Incorrect',                          'إجابة خاطئة'),
  iqNext:       t3('Moving on…',                  'Suivante…',                          'إلى السؤال التالي…'),

  // Intelligences screen
  intelHeader:  t3('Multiple Intelligences',      'Intelligences multiples',            'الذكاءات المتعددة'),
  rate1:        t3('Not at all',                  'Pas du tout',                        'إطلاقاً'),
  rate2:        t3('Rarely',                      'Rarement',                           'نادراً'),
  rate3:        t3('Sometimes',                   'Parfois',                            'أحياناً'),
  rate4:        t3('Often',                       'Souvent',                            'غالباً'),
  rate5:        t3('Always',                      'Toujours',                           'دائماً'),

  // Careers screen
  careersHeader:  t3('Career Match',              'Correspondance professionnelle',     'المهنة المناسبة'),
  swipeRight:     t3('Swipe right if it appeals to you', 'Glissez à droite si cela vous attire', 'اسحب يميناً إذا أعجبتك المهنة'),
  swipeLeft:      t3('Swipe left to skip',        'Glissez à gauche pour passer',       'اسحب يساراً للتخطي'),
  like:           t3('LIKE',                      'J’AIME',                             'يعجبني'),
  nope:           t3('NOPE',                      'NON',                                'لا'),
  done:           t3('Done',                      'Terminé',                            'انتهى'),

  // Results screen
  resultsTitle:    t3('Your Results',             'Vos résultats',                      'نتائجك'),
  resultsSub:      t3('A summary of your assessment', 'Résumé de votre évaluation',     'ملخّص تقييمك'),
  yourPersonality: t3('Your personality type',    'Votre type de personnalité',         'نوع شخصيتك'),
  yourIq:          t3('Your IQ score',            'Votre score de QI',                  'نتيجة اختبار الذكاء'),
  iqLevel:         t3('Level',                    'Niveau',                             'المستوى'),
  yourIntelligence:t3('Your dominant intelligence','Votre intelligence dominante',      'ذكاؤك المهيمن'),
  yourCareer:      t3('Top career match',         'Métier le plus compatible',          'أنسب مهنة لك'),
  syncing:         t3('Sending results to your school…', 'Envoi des résultats à votre école…', 'إرسال النتائج إلى المدرسة…'),
  synced:          t3('Sent successfully to your school', 'Envoyé avec succès à votre école',   'تم الإرسال بنجاح إلى المدرسة'),
  syncFailed:      t3('Could not send results — they are saved locally.', 'Impossible d’envoyer les résultats — ils sont enregistrés localement.', 'تعذّر الإرسال — تم الحفظ محلياً.'),
  finish:          t3('Finish',                   'Terminer',                           'إنهاء'),

  // IQ levels (returned by scoring.ts)
  iq_genius:    t3('Genius',                      'Génie',                              'عبقري'),
  iq_high:      t3('High',                        'Élevé',                              'مرتفع'),
  iq_above:     t3('Above average',               'Au-dessus de la moyenne',            'فوق المتوسط'),
  iq_average:   t3('Average',                     'Moyenne',                            'متوسط'),
  iq_below:     t3('Below average',               'En-dessous de la moyenne',           'تحت المتوسط'),
};

export type UIKey = keyof typeof ui;

// ────────────────────────────────────────────────────────────────────────────
// Multi-intelligence type labels (Howard Gardner's 8)
// ────────────────────────────────────────────────────────────────────────────

export const intelligenceLabelsI18n: Record<string, Translations> = {
  linguistic:    t3('Linguistic',           'Linguistique',           'لغوي'),
  logical:       t3('Logical-Mathematical', 'Logico-mathématique',    'منطقي-رياضي'),
  spatial:       t3('Spatial-Visual',       'Visuo-spatial',          'بصري-مكاني'),
  musical:       t3('Musical',              'Musical',                'موسيقي'),
  bodily:        t3('Bodily-Kinesthetic',   'Corporel-kinesthésique', 'جسدي-حركي'),
  interpersonal: t3('Interpersonal',        'Interpersonnel',         'اجتماعي'),
  intrapersonal: t3('Intrapersonal',        'Intrapersonnel',         'ذاتي'),
  naturalist:    t3('Naturalist',           'Naturaliste',            'طبيعي'),
};

// ────────────────────────────────────────────────────────────────────────────
// Context, provider, hook
// ────────────────────────────────────────────────────────────────────────────

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => Promise<void>;
  t: (key: UIKey, params?: Record<string, string | number>) => string;
  tr: (entry: Translations) => string;     // pluck from a trilingual record
  rtl: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = '@edura_test_lang';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'en' || stored === 'fr' || stored === 'ar') {
        applyLanguage(stored);
      }
    });
  }, []);

  const applyLanguage = (l: Lang) => {
    const target = LANGS.find(x => x.code === l);
    if (target && I18nManager.isRTL !== target.rtl) {
      // I18nManager.forceRTL requires app reload to take effect on natives,
      // so we apply soft RTL via flexDirection in styles (see useRtlStyles).
      I18nManager.allowRTL(true);
      try { I18nManager.forceRTL(target.rtl); } catch { /* no-op on web */ }
    }
    setLangState(l);
  };

  const setLang = useCallback(async (l: Lang) => {
    await AsyncStorage.setItem(STORAGE_KEY, l);
    applyLanguage(l);
  }, []);

  const t = useCallback(
    (key: UIKey, params?: Record<string, string | number>) => {
      const raw = ui[key]?.[lang] ?? ui[key]?.en ?? key;
      if (!params) return raw;
      return Object.keys(params).reduce(
        (s, k) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(params[k])),
        raw,
      );
    },
    [lang],
  );

  const tr = useCallback((entry: Translations) => entry?.[lang] ?? entry?.en ?? '', [lang]);

  const rtl = LANGS.find(x => x.code === lang)?.rtl ?? false;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tr, rtl }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
