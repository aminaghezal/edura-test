import { IntelligenceType } from '@/types';
import { Translations, t3 } from '@/lib/i18n';

export interface IntelligenceQuestion {
  id: number;
  type: IntelligenceType;
  text: Translations;
}

export const intelligenceQuestions: IntelligenceQuestion[] = [
  // ── Linguistic (0–4) ──────────────────────────────────────────────────────
  { id: 0, type: 'Linguistic', text: t3(
    'I enjoy reading books, articles, or stories in my spare time.',
    'J’aime lire des livres, articles ou histoires pendant mon temps libre.',
    'أستمتع بقراءة الكتب أو المقالات أو القصص في وقت فراغي.') },
  { id: 1, type: 'Linguistic', text: t3(
    'Writing — essays, stories, or journals — comes naturally to me.',
    'L’écriture — essais, histoires ou journaux — me vient naturellement.',
    'الكتابة — مقالات أو قصص أو يوميات — أمر طبيعي بالنسبة لي.') },
  { id: 2, type: 'Linguistic', text: t3(
    'I have a rich vocabulary and enjoy finding exactly the right word.',
    'J’ai un vocabulaire riche et j’aime trouver le mot juste.',
    'لدي مفردات غنية وأستمتع باختيار الكلمة الأنسب.') },
  { id: 3, type: 'Linguistic', text: t3(
    'I can easily remember quotes, lyrics, and poems.',
    'Je retiens facilement les citations, les paroles de chansons et les poèmes.',
    'أتذكر بسهولة الاقتباسات وكلمات الأغاني والأشعار.') },
  { id: 4, type: 'Linguistic', text: t3(
    'I enjoy word games, crosswords, and puns.',
    'J’aime les jeux de mots, mots croisés et calembours.',
    'أستمتع بألعاب الكلمات والكلمات المتقاطعة والتورية.') },

  // ── Logical-Mathematical (5–9) ────────────────────────────────────────────
  { id: 5, type: 'Logical-Mathematical', text: t3(
    'I enjoy solving mathematical puzzles or logic problems.',
    'J’aime résoudre des énigmes mathématiques ou des problèmes logiques.',
    'أستمتع بحل الألغاز الرياضية والمسائل المنطقية.') },
  { id: 6, type: 'Logical-Mathematical', text: t3(
    'I think in clear cause-and-effect steps.',
    'Je pense par étapes claires de cause à effet.',
    'أفكر بخطوات واضحة من السبب إلى النتيجة.') },
  { id: 7, type: 'Logical-Mathematical', text: t3(
    'I like to experiment and test theories.',
    'J’aime expérimenter et tester des théories.',
    'أحب التجريب واختبار النظريات.') },
  { id: 8, type: 'Logical-Mathematical', text: t3(
    'I enjoy strategy games like chess or coding challenges.',
    'J’aime les jeux de stratégie comme les échecs ou la programmation.',
    'أستمتع بألعاب الاستراتيجية كالشطرنج وتحديات البرمجة.') },
  { id: 9, type: 'Logical-Mathematical', text: t3(
    'I notice patterns and relationships in numbers easily.',
    'Je remarque facilement les motifs et relations entre les nombres.',
    'ألاحظ الأنماط والعلاقات بين الأرقام بسهولة.') },

  // ── Spatial (10–14) ───────────────────────────────────────────────────────
  { id: 10, type: 'Spatial', text: t3(
    'I can visualise objects in 3D and rotate them in my mind.',
    'Je peux visualiser des objets en 3D et les faire tourner dans ma tête.',
    'أستطيع تخيّل الأشياء ثلاثية الأبعاد وتدويرها في ذهني.') },
  { id: 11, type: 'Spatial', text: t3(
    'I enjoy drawing, design, or photography.',
    'J’aime le dessin, le design ou la photographie.',
    'أستمتع بالرسم أو التصميم أو التصوير.') },
  { id: 12, type: 'Spatial', text: t3(
    'I rarely get lost — I have a strong sense of direction.',
    'Je me perds rarement — j’ai un bon sens de l’orientation.',
    'نادراً ما أضل طريقي — لديّ حسّ قوي بالاتجاه.') },
  { id: 13, type: 'Spatial', text: t3(
    'I think in images rather than words when solving problems.',
    'Je pense en images plutôt qu’en mots pour résoudre des problèmes.',
    'أفكر بالصور أكثر من الكلمات عند حل المشكلات.') },
  { id: 14, type: 'Spatial', text: t3(
    'I enjoy puzzles like jigsaws, mazes, or architecture.',
    'J’aime les puzzles, labyrinthes ou l’architecture.',
    'أستمتع بالألغاز كالبازل والمتاهات والعمارة.') },

  // ── Musical (15–19) ───────────────────────────────────────────────────────
  { id: 15, type: 'Musical', text: t3(
    'I can easily recognise rhythms, melodies, and musical patterns.',
    'Je reconnais facilement les rythmes, mélodies et motifs musicaux.',
    'أتعرّف بسهولة على الإيقاعات واللحن والأنماط الموسيقية.') },
  { id: 16, type: 'Musical', text: t3(
    'I play a musical instrument or sing regularly.',
    'Je joue d’un instrument ou je chante régulièrement.',
    'أعزف على آلة موسيقية أو أغني بانتظام.') },
  { id: 17, type: 'Musical', text: t3(
    'Music strongly influences my mood.',
    'La musique influence beaucoup mon humeur.',
    'الموسيقى تؤثر بقوة على مزاجي.') },
  { id: 18, type: 'Musical', text: t3(
    'I often hum or tap rhythms without thinking.',
    'Je fredonne ou tape des rythmes sans y penser.',
    'كثيراً ما أدندن أو أنقر إيقاعات دون أن أنتبه.') },
  { id: 19, type: 'Musical', text: t3(
    'I can remember songs and melodies after hearing them once or twice.',
    'Je retiens chansons et mélodies après les avoir entendues une ou deux fois.',
    'أحفظ الأغاني واللحن بعد سماعها مرة أو مرتين.') },

  // ── Bodily-Kinesthetic (20–24) ────────────────────────────────────────────
  { id: 20, type: 'Bodily-Kinesthetic', text: t3(
    'I learn best by doing things hands-on rather than reading about them.',
    'J’apprends mieux en faisant qu’en lisant.',
    'أتعلّم أفضل بالممارسة الفعلية لا بالقراءة.') },
  { id: 21, type: 'Bodily-Kinesthetic', text: t3(
    'I excel at sports or physical activities.',
    'Je suis bon(ne) en sport ou en activités physiques.',
    'أتفوّق في الرياضة والأنشطة البدنية.') },
  { id: 22, type: 'Bodily-Kinesthetic', text: t3(
    'I enjoy working with my hands — building, crafting, or cooking.',
    'J’aime travailler de mes mains — construction, artisanat ou cuisine.',
    'أستمتع بالعمل اليدوي — البناء أو الحرف أو الطبخ.') },
  { id: 23, type: 'Bodily-Kinesthetic', text: t3(
    'I have good body coordination and balance.',
    'J’ai une bonne coordination et un bon équilibre.',
    'لدي تناسق جيد بين أعضاء جسمي وتوازن جيد.') },
  { id: 24, type: 'Bodily-Kinesthetic', text: t3(
    'I struggle to sit still for long periods.',
    'J’ai du mal à rester assis(e) longtemps.',
    'يصعب عليّ الجلوس بلا حركة لفترات طويلة.') },

  // ── Interpersonal (25–29) ─────────────────────────────────────────────────
  { id: 25, type: 'Interpersonal', text: t3(
    'I am good at reading people’s emotions and moods.',
    'Je suis doué(e) pour lire les émotions des autres.',
    'أُجيد قراءة مشاعر الآخرين وحالتهم المزاجية.') },
  { id: 26, type: 'Interpersonal', text: t3(
    'Friends and classmates often come to me for advice.',
    'Mes amis viennent souvent me demander conseil.',
    'كثيراً ما يأتي إليّ الأصدقاء والزملاء طلباً للنصيحة.') },
  { id: 27, type: 'Interpersonal', text: t3(
    'I enjoy group activities and teamwork.',
    'J’aime les activités de groupe et le travail d’équipe.',
    'أستمتع بالأنشطة الجماعية والعمل ضمن فريق.') },
  { id: 28, type: 'Interpersonal', text: t3(
    'I am skilled at mediating conflicts.',
    'Je suis doué(e) pour la médiation en cas de conflit.',
    'أُجيد التوسّط لحل النزاعات.') },
  { id: 29, type: 'Interpersonal', text: t3(
    'I feel energised when helping others.',
    'Je me sens revigoré(e) en aidant les autres.',
    'أشعر بنشاط عند مساعدة الآخرين.') },

  // ── Intrapersonal (30–34) ─────────────────────────────────────────────────
  { id: 30, type: 'Intrapersonal', text: t3(
    'I am very aware of my own strengths and weaknesses.',
    'Je connais bien mes forces et mes faiblesses.',
    'أعي جيداً نقاط قوتي وضعفي.') },
  { id: 31, type: 'Intrapersonal', text: t3(
    'I enjoy journaling or reflecting on my own thoughts.',
    'J’aime tenir un journal ou réfléchir à mes pensées.',
    'أستمتع بكتابة مذكراتي والتأمل في أفكاري.') },
  { id: 32, type: 'Intrapersonal', text: t3(
    'I set personal goals and monitor my own progress.',
    'Je me fixe des objectifs et je suis mon progrès.',
    'أضع أهدافاً شخصية وأتابع تقدمي.') },
  { id: 33, type: 'Intrapersonal', text: t3(
    'I prefer working independently at my own pace.',
    'Je préfère travailler seul(e) à mon rythme.',
    'أفضّل العمل بمفردي وبإيقاعي الخاص.') },
  { id: 34, type: 'Intrapersonal', text: t3(
    'I regularly question my beliefs and motivations.',
    'Je remets régulièrement en question mes croyances et motivations.',
    'أراجع باستمرار قناعاتي ودوافعي.') },

  // ── Naturalist (35–39) ────────────────────────────────────────────────────
  { id: 35, type: 'Naturalist', text: t3(
    'I enjoy spending time outdoors in nature.',
    'J’aime passer du temps dans la nature.',
    'أستمتع بقضاء الوقت في الطبيعة.') },
  { id: 36, type: 'Naturalist', text: t3(
    'I can identify many plants, animals, or natural phenomena.',
    'Je peux identifier beaucoup de plantes, animaux ou phénomènes naturels.',
    'أستطيع التعرف على نباتات وحيوانات وظواهر طبيعية كثيرة.') },
  { id: 37, type: 'Naturalist', text: t3(
    'I notice changes in weather, seasons, or ecosystems easily.',
    'Je remarque facilement les changements de météo, saisons ou écosystèmes.',
    'ألاحظ بسهولة تغيّرات الطقس والفصول والنُظم البيئية.') },
  { id: 38, type: 'Naturalist', text: t3(
    'I am passionate about environmental issues.',
    'Je suis passionné(e) par les questions environnementales.',
    'أهتم بشدة بالقضايا البيئية.') },
  { id: 39, type: 'Naturalist', text: t3(
    'I enjoy categorising and classifying things in the natural world.',
    'J’aime catégoriser et classer les éléments du monde naturel.',
    'أستمتع بتصنيف الأشياء في عالم الطبيعة.') },
];

// ── Intelligence type metadata (emoji + multilingual description) ───────────
export const intelligenceLabels: Record<IntelligenceType, { emoji: string; description: Translations }> = {
  'Linguistic': { emoji: '📝', description: t3(
    'You have a strong ability with language — reading, writing, and communication are your strengths.',
    'Vous avez une grande aisance avec le langage — lecture, écriture et communication sont vos forces.',
    'لديك قدرة قوية في اللغة — القراءة والكتابة والتواصل من نقاط قوتك.') },
  'Logical-Mathematical': { emoji: '🔢', description: t3(
    'You excel at reasoning, logic, and working with numbers and abstract patterns.',
    'Vous excellez en raisonnement, logique et manipulation des nombres et schémas abstraits.',
    'تتفوّق في التفكير المنطقي والتعامل مع الأرقام والأنماط المجردة.') },
  'Spatial': { emoji: '🎨', description: t3(
    'You think in images and excel at visualising space, design, and creative arts.',
    'Vous pensez en images et excellez en visualisation, design et arts créatifs.',
    'تفكر بالصور وتتفوّق في تخيّل المساحة والتصميم والفنون الإبداعية.') },
  'Musical': { emoji: '🎵', description: t3(
    'You have a natural sensitivity to rhythm, melody, and musical structure.',
    'Vous avez une sensibilité naturelle au rythme, à la mélodie et à la structure musicale.',
    'لديك حساسية فطرية للإيقاع واللحن والبنية الموسيقية.') },
  'Bodily-Kinesthetic': { emoji: '⚽', description: t3(
    'You learn through movement and have excellent physical coordination and body awareness.',
    'Vous apprenez par le mouvement et avez une excellente coordination physique.',
    'تتعلّم عبر الحركة وتمتلك تناسقاً جسدياً ووعياً ممتازين بجسدك.') },
  'Interpersonal': { emoji: '🤝', description: t3(
    'You understand and communicate with others with great empathy and social skill.',
    'Vous comprenez et communiquez avec les autres avec empathie et habileté sociale.',
    'تفهم الآخرين وتتواصل معهم بتعاطف وذكاء اجتماعي عالٍ.') },
  'Intrapersonal': { emoji: '🧘', description: t3(
    'You have deep self-awareness and strong insight into your own thoughts and feelings.',
    'Vous avez une profonde conscience de vous-même et une grande lucidité intérieure.',
    'لديك وعي ذاتي عميق وبصيرة قوية بأفكارك ومشاعرك.') },
  'Naturalist': { emoji: '🌿', description: t3(
    'You have a deep connection to the natural world and excel at observing living things.',
    'Vous avez un lien fort avec la nature et excellez dans l’observation du vivant.',
    'لديك ارتباط عميق بالطبيعة وتتفوّق في ملاحظة الكائنات الحية.') },
};
