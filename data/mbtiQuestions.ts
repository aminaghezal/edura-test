import { Translations, t3 } from '@/lib/i18n';

export interface MBTIQuestion {
  id: number;
  text: Translations;
  optionA: Translations;
  optionB: Translations;
  // A maps to: E(0-14), S(15-29), T(30-44), J(45-59)
}

export const mbtiQuestions: MBTIQuestion[] = [
  // ── E vs I (0–14) ─────────────────────────────────────────────────────────
  { id: 0, text: t3('At a party, you tend to…', 'Lors d’une fête, vous avez tendance à…', 'في الحفلات، تميل إلى…'),
    optionA: t3('Talk to many people, including strangers', 'Parler à beaucoup de gens, y compris des inconnus', 'التحدث مع كثير من الناس، حتى مع الغرباء'),
    optionB: t3('Spend time with a few close friends', 'Passer du temps avec quelques amis proches', 'البقاء مع عدد قليل من الأصدقاء المقربين') },

  { id: 1, text: t3('You feel most energized when you…', 'Vous vous sentez le plus énergique quand vous…', 'تشعر بأكبر قدر من الطاقة عندما…'),
    optionA: t3('Are around lots of people', 'Êtes entouré(e) de beaucoup de gens', 'تكون محاطاً بكثير من الناس'),
    optionB: t3('Have time alone to recharge', 'Avez du temps seul(e) pour vous ressourcer', 'تجد وقتاً للوحدة لاستعادة طاقتك') },

  { id: 2, text: t3('When working on a project, you prefer to…', 'En travaillant sur un projet, vous préférez…', 'عند العمل على مشروع، تفضّل…'),
    optionA: t3('Collaborate and talk ideas through with others', 'Collaborer et discuter des idées avec d’autres', 'التعاون ومناقشة الأفكار مع الآخرين'),
    optionB: t3('Think it through quietly on your own first', 'D’abord réfléchir tranquillement seul(e)', 'التفكير بهدوء بمفردك أولاً') },

  { id: 3, text: t3('In a group discussion, you…', 'Dans une discussion de groupe, vous…', 'في المناقشات الجماعية، أنت…'),
    optionA: t3('Speak up quickly and think out loud', 'Prenez vite la parole et pensez à voix haute', 'تتكلم بسرعة وتفكر بصوت عالٍ'),
    optionB: t3('Listen carefully before sharing your thoughts', 'Écoutez attentivement avant de parler', 'تستمع جيداً قبل المشاركة برأيك') },

  { id: 4, text: t3('You would rather spend a free afternoon…', 'Vous préférez passer un après-midi libre…', 'تفضّل قضاء وقت فراغك في…'),
    optionA: t3('Going out with friends', 'À sortir avec des amis', 'الخروج مع الأصدقاء'),
    optionB: t3('Reading, gaming, or a solo hobby', 'À lire, jouer ou pratiquer un loisir solo', 'القراءة أو الألعاب أو نشاط فردي') },

  { id: 5, text: t3('When you meet new people, you feel…', 'En rencontrant de nouvelles personnes, vous vous sentez…', 'عند مقابلة أشخاص جدد، تشعر…'),
    optionA: t3('Excited and curious', 'Enthousiaste et curieux(se)', 'بالحماس والفضول'),
    optionB: t3('Somewhat reserved at first', 'D’abord plutôt réservé(e)', 'بالتحفّظ في البداية') },

  { id: 6, text: t3('Your ideal work environment is…', 'Votre environnement de travail idéal est…', 'بيئة العمل المثالية بالنسبة لك هي…'),
    optionA: t3('Open, social, with lots of interaction', 'Ouvert, social, avec beaucoup d’interactions', 'مفتوحة واجتماعية مع تفاعل كثير'),
    optionB: t3('Quiet, with minimal interruptions', 'Calme, avec peu d’interruptions', 'هادئة مع أقل قدر من المقاطعات') },

  { id: 7, text: t3('After a long social event you feel…', 'Après un long événement social, vous vous sentez…', 'بعد حدث اجتماعي طويل تشعر بـ…'),
    optionA: t3('Energised and happy', 'Plein(e) d’énergie et heureux(se)', 'الطاقة والسعادة'),
    optionB: t3('Tired and in need of quiet time', 'Fatigué(e) et en quête de calme', 'التعب والحاجة إلى الهدوء') },

  { id: 8, text: t3('You are known for…', 'On vous connaît pour…', 'يعرفك الناس بأنك…'),
    optionA: t3('Being outgoing and easy to approach', 'Votre côté ouvert et accessible', 'منفتح وسهل التواصل'),
    optionB: t3('Being thoughtful and a good listener', 'Votre côté réfléchi et bon(ne) auditeur(trice)', 'مفكّر ومستمع جيد') },

  { id: 9, text: t3('You prefer to…', 'Vous préférez…', 'تفضّل أن…'),
    optionA: t3('Share your experiences widely', 'Partager largement vos expériences', 'تشارك تجاربك بشكل واسع'),
    optionB: t3('Keep experiences mostly to yourself', 'Garder vos expériences plutôt pour vous', 'تحتفظ بتجاربك لنفسك في الغالب') },

  { id: 10, text: t3('When solving a problem, you…', 'Pour résoudre un problème, vous…', 'لحل مشكلة، تفضّل أن…'),
    optionA: t3('Prefer to brainstorm with others', 'Préférez en discuter avec d’autres', 'تتبادل الأفكار مع الآخرين'),
    optionB: t3('Prefer to figure it out alone first', 'Préférez d’abord chercher seul(e)', 'تحلّها بنفسك أولاً') },

  { id: 11, text: t3('Your social circle is…', 'Votre cercle social est…', 'دائرتك الاجتماعية…'),
    optionA: t3('Large — you know many people', 'Large — vous connaissez beaucoup de gens', 'واسعة — تعرف الكثيرين'),
    optionB: t3('Small — you have a few deep friendships', 'Petit — vous avez quelques amitiés profondes', 'صغيرة — لديك صداقات قليلة وعميقة') },

  { id: 12, text: t3('In class, you are more comfortable…', 'En classe, vous êtes plus à l’aise…', 'في الصف، أنت أكثر راحة عندما…'),
    optionA: t3('Volunteering answers out loud', 'En répondant à voix haute', 'تجيب بصوت عالٍ'),
    optionB: t3('Writing answers or being called on', 'En écrivant ou quand on vous interroge', 'تكتب أو تُسأل مباشرة') },

  { id: 13, text: t3('You process new information better by…', 'Vous assimilez mieux l’information en…', 'تستوعب المعلومات الجديدة أفضل عبر…'),
    optionA: t3('Talking it through with someone', 'En discutant avec quelqu’un', 'مناقشتها مع شخص ما'),
    optionB: t3('Reflecting on it quietly', 'En y réfléchissant tranquillement', 'التفكير فيها بهدوء') },

  { id: 14, text: t3('When bored, you tend to…', 'Quand vous vous ennuyez, vous avez tendance à…', 'عند الملل، تميل إلى…'),
    optionA: t3('Seek people to chat with', 'Chercher des gens avec qui discuter', 'البحث عن أشخاص للمحادثة'),
    optionB: t3('Find a solitary activity', 'Trouver une activité solitaire', 'إيجاد نشاط فردي') },

  // ── S vs N (15–29) ────────────────────────────────────────────────────────
  { id: 15, text: t3('You trust information that is…', 'Vous faites confiance aux informations qui sont…', 'تثق في المعلومات التي…'),
    optionA: t3('Concrete and based on real experience', 'Concrètes et basées sur l’expérience réelle', 'ملموسة ومبنية على تجربة حقيقية'),
    optionB: t3('Theoretical and about future possibilities', 'Théoriques et liées à des possibilités futures', 'نظرية ومتعلقة باحتمالات مستقبلية') },

  { id: 16, text: t3('When reading instructions, you…', 'En lisant des instructions, vous…', 'عند قراءة التعليمات…'),
    optionA: t3('Follow them step by step', 'Les suivez étape par étape', 'تتبعها خطوة بخطوة'),
    optionB: t3('Skim for the big picture and improvise', 'Les survolez et improvisez', 'تتصفّحها لفهم العام وترتجل') },

  { id: 17, text: t3('You are more interested in…', 'Vous êtes plus intéressé(e) par…', 'تهتم أكثر بـ…'),
    optionA: t3('What is happening right now', 'Ce qui se passe maintenant', 'ما يحدث الآن'),
    optionB: t3('What could happen in the future', 'Ce qui pourrait arriver à l’avenir', 'ما قد يحدث في المستقبل') },

  { id: 18, text: t3('You remember events by…', 'Vous vous souvenez des événements par…', 'تتذكر الأحداث من خلال…'),
    optionA: t3('Specific facts, sights, and sounds', 'Des faits, images et sons précis', 'حقائق ومشاهد وأصوات محددة'),
    optionB: t3('The impressions and feelings they left', 'Les impressions et émotions ressenties', 'الانطباعات والمشاعر التي خلّفتها') },

  { id: 19, text: t3('When describing something, you prefer…', 'Pour décrire quelque chose, vous préférez…', 'لوصف شيء، تفضّل…'),
    optionA: t3('Precise, literal language', 'Un langage précis et littéral', 'لغة دقيقة وحرفية'),
    optionB: t3('Metaphors and imaginative language', 'Des métaphores et un langage imagé', 'الاستعارات واللغة الخيالية') },

  { id: 20, text: t3('You find more appeal in…', 'Vous êtes plus attiré(e) par…', 'تنجذب أكثر إلى…'),
    optionA: t3('Practical, hands-on work', 'Le travail pratique et manuel', 'العمل العملي والتطبيقي'),
    optionB: t3('Abstract ideas and theories', 'Les idées abstraites et les théories', 'الأفكار المجردة والنظريات') },

  { id: 21, text: t3('You notice…', 'Vous remarquez…', 'تلاحظ…'),
    optionA: t3('Details others often miss', 'Les détails que les autres oublient', 'تفاصيل يغفلها الآخرون'),
    optionB: t3('Patterns and connections between things', 'Les schémas et liens entre les choses', 'الأنماط والروابط بين الأشياء') },

  { id: 22, text: t3('Your plans tend to be…', 'Vos plans sont plutôt…', 'خططك عادةً…'),
    optionA: t3('Step-by-step and detailed', 'Détaillés et étape par étape', 'تفصيلية وخطوة بخطوة'),
    optionB: t3('Broad outlines that you fill in as you go', 'De grandes lignes complétées au fur et à mesure', 'خطوط عامة تُكمَل أثناء التنفيذ') },

  { id: 23, text: t3('You are drawn to problems that are…', 'Vous êtes attiré(e) par les problèmes…', 'تنجذب إلى المشكلات…'),
    optionA: t3('Practical and grounded in reality', 'Pratiques et ancrés dans la réalité', 'العملية والمرتبطة بالواقع'),
    optionB: t3('Novel and open-ended', 'Nouveaux et ouverts', 'الجديدة والمفتوحة') },

  { id: 24, text: t3('You value knowledge that is…', 'Vous valorisez le savoir qui est…', 'تُقدّر المعرفة التي…'),
    optionA: t3('Directly applicable today', 'Directement applicable aujourd’hui', 'يمكن تطبيقها اليوم مباشرة'),
    optionB: t3('Intellectually stimulating regardless of use', 'Intellectuellement stimulant, peu importe l’usage', 'تُحفز الفكر بغض النظر عن فائدتها') },

  { id: 25, text: t3('When learning something new, you prefer…', 'Pour apprendre une nouveauté, vous préférez…', 'لتعلّم شيء جديد، تفضّل…'),
    optionA: t3('Clear examples and demonstrations', 'Des exemples clairs et des démonstrations', 'الأمثلة الواضحة والشروحات'),
    optionB: t3('Understanding the underlying concept', 'Comprendre le concept sous-jacent', 'فهم المفهوم الأساسي') },

  { id: 26, text: t3('You are described as more…', 'On vous décrit plutôt comme…', 'يصفك الآخرون بأنك أكثر…'),
    optionA: t3('Realistic and grounded', 'Réaliste et terre-à-terre', 'واقعية ورزانة'),
    optionB: t3('Imaginative and visionary', 'Imaginatif(ve) et visionnaire', 'خيالاً ورؤية') },

  { id: 27, text: t3('You enjoy work that involves…', 'Vous aimez le travail qui implique…', 'تستمتع بالعمل الذي يتضمن…'),
    optionA: t3('Routine and mastery of a skill', 'Une routine et la maîtrise d’une compétence', 'الروتين وإتقان مهارة'),
    optionB: t3('Change and tackling new challenges', 'Du changement et de nouveaux défis', 'التغيير ومواجهة تحديات جديدة') },

  { id: 28, text: t3('In art and stories, you appreciate…', 'Dans l’art et les histoires, vous appréciez…', 'في الفن والقصص، تُقدّر…'),
    optionA: t3('Realism and authenticity', 'Le réalisme et l’authenticité', 'الواقعية والأصالة'),
    optionB: t3('Symbolism and deeper meaning', 'Le symbolisme et le sens profond', 'الرمزية والمعنى العميق') },

  { id: 29, text: t3('You are more comfortable with…', 'Vous êtes plus à l’aise avec…', 'أنت أكثر راحة مع…'),
    optionA: t3('Facts you can verify', 'Des faits vérifiables', 'الحقائق التي يمكن التحقق منها'),
    optionB: t3('Speculations about what might be true', 'Des spéculations sur ce qui pourrait être vrai', 'التكهنات حول ما قد يكون صحيحاً') },

  // ── T vs F (30–44) ────────────────────────────────────────────────────────
  { id: 30, text: t3('When making a decision, you rely more on…', 'Pour prendre une décision, vous comptez plus sur…', 'عند اتخاذ قرار، تعتمد أكثر على…'),
    optionA: t3('Logic and objective analysis', 'La logique et l’analyse objective', 'المنطق والتحليل الموضوعي'),
    optionB: t3('Your feelings and how it affects people', 'Vos émotions et l’impact sur autrui', 'مشاعرك وتأثير القرار على الناس') },

  { id: 31, text: t3('In a disagreement, you focus on…', 'Dans un désaccord, vous vous concentrez sur…', 'في الخلاف، تُركّز على…'),
    optionA: t3('Finding the correct answer', 'Trouver la bonne réponse', 'إيجاد الإجابة الصحيحة'),
    optionB: t3('Maintaining harmony', 'Maintenir l’harmonie', 'الحفاظ على التفاهم') },

  { id: 32, text: t3('You find it more important that people are…', 'Vous trouvez plus important que les gens soient…', 'تجد أن من الأهم أن يكون الناس…'),
    optionA: t3('Competent and effective', 'Compétents et efficaces', 'أكفاء وفعّالين'),
    optionB: t3('Kind and considerate', 'Gentils et attentionnés', 'لطفاء ومراعين') },

  { id: 33, text: t3('When giving feedback, you tend to be…', 'En donnant un avis, vous avez tendance à être…', 'عند تقديم ملاحظات، أنت…'),
    optionA: t3('Direct and honest even if it stings', 'Direct(e) et honnête même si ça pique', 'مباشر وصادق حتى لو كان ذلك مؤلماً'),
    optionB: t3('Tactful and gentle', 'Tactique et doux(ce)', 'لبق ولطيف') },

  { id: 34, text: t3('You are more influenced by…', 'Vous êtes plus influencé(e) par…', 'تتأثر أكثر بـ…'),
    optionA: t3('Evidence and reasoning', 'Les preuves et le raisonnement', 'الأدلة والمنطق'),
    optionB: t3('Personal values and empathy', 'Les valeurs personnelles et l’empathie', 'القيم الشخصية والتعاطف') },

  { id: 35, text: t3('You are seen as…', 'On vous voit comme…', 'يراك الآخرون كشخص…'),
    optionA: t3('Logical and analytical', 'Logique et analytique', 'منطقي وتحليلي'),
    optionB: t3('Warm and caring', 'Chaleureux(se) et attentionné(e)', 'دافئ ومُهتم') },

  { id: 36, text: t3('A good leader, in your view, should…', 'Selon vous, un bon leader devrait…', 'القائد الجيد في رأيك يجب أن…'),
    optionA: t3('Make the strategically right call, even if unpopular', 'Prendre la bonne décision, même impopulaire', 'يتخذ القرار الصحيح ولو لم يُعجب الجميع'),
    optionB: t3('Keep the team motivated and connected', 'Garder l’équipe motivée et soudée', 'يحافظ على حماس فريقه وترابطه') },

  { id: 37, text: t3('When rules seem unfair, you…', 'Quand les règles semblent injustes, vous…', 'عندما تبدو القواعد ظالمة، أنت…'),
    optionA: t3('Evaluate the rule rationally and suggest changes', 'Évaluez la règle rationnellement et proposez des changements', 'تقيّمها بعقلانية وتقترح تغييرات'),
    optionB: t3('Feel upset about the human impact first', 'Êtes d’abord touché(e) par l’impact humain', 'تتأثر أولاً بالأثر الإنساني') },

  { id: 38, text: t3('You solve problems primarily with…', 'Vous résolvez les problèmes surtout par…', 'تحل المشكلات أساساً بـ…'),
    optionA: t3('Analysis and frameworks', 'L’analyse et les méthodes', 'التحليل والأطر المنهجية'),
    optionB: t3('Intuition and empathy', 'L’intuition et l’empathie', 'الحدس والتعاطف') },

  { id: 39, text: t3('You tend to trust…', 'Vous avez tendance à faire confiance à…', 'تميل إلى الثقة في…'),
    optionA: t3('Systems and principles', 'Les systèmes et principes', 'الأنظمة والمبادئ'),
    optionB: t3('People and relationships', 'Les personnes et les relations', 'الناس والعلاقات') },

  { id: 40, text: t3('In conflict, you prefer to…', 'En cas de conflit, vous préférez…', 'في النزاع، تفضّل…'),
    optionA: t3('Settle it fairly based on facts', 'Le régler équitablement selon les faits', 'حله بعدل بناءً على الحقائق'),
    optionB: t3('Settle it kindly to preserve the relationship', 'Le régler avec douceur pour préserver la relation', 'حله بلطف للحفاظ على العلاقة') },

  { id: 41, text: t3('You are more comfortable when praised for your…', 'Vous appréciez d’être complimenté(e) pour…', 'تفضّل أن يُشيد بك بسبب…'),
    optionA: t3('Skill and intelligence', 'Vos compétences et votre intelligence', 'مهارتك وذكائك'),
    optionB: t3('Helpfulness and kindness', 'Votre serviabilité et votre gentillesse', 'مساعدتك ولطفك') },

  { id: 42, text: t3('When someone shares a problem, you first…', 'Quand on vous confie un problème, vous…', 'عندما يشاركك أحد مشكلته، أنت أولاً…'),
    optionA: t3('Offer practical solutions', 'Proposez des solutions pratiques', 'تقدّم حلولاً عملية'),
    optionB: t3('Listen and empathise', 'Écoutez et compatissez', 'تستمع وتُظهر التعاطف') },

  { id: 43, text: t3('You think decisions should be based on…', 'Vous pensez que les décisions doivent reposer sur…', 'تعتقد أن القرارات يجب أن تُبنى على…'),
    optionA: t3('Objective criteria', 'Des critères objectifs', 'معايير موضوعية'),
    optionB: t3('Circumstances and feelings', 'Les circonstances et les émotions', 'الظروف والمشاعر') },

  { id: 44, text: t3('Being right vs being liked — you prioritise…', 'Avoir raison ou être apprécié(e) — vous privilégiez…', 'بين أن تكون محقاً أو محبوباً، تختار…'),
    optionA: t3('Being right', 'Avoir raison', 'أن تكون محقاً'),
    optionB: t3('Being liked', 'Être apprécié(e)', 'أن تكون محبوباً') },

  // ── J vs P (45–59) ────────────────────────────────────────────────────────
  { id: 45, text: t3('You prefer your life to be…', 'Vous préférez que votre vie soit…', 'تفضّل أن تكون حياتك…'),
    optionA: t3('Planned and orderly', 'Planifiée et ordonnée', 'مخططة ومنظمة'),
    optionB: t3('Spontaneous and flexible', 'Spontanée et flexible', 'تلقائية ومرنة') },

  { id: 46, text: t3('Deadlines make you feel…', 'Les délais vous donnent envie de…', 'المواعيد النهائية تجعلك…'),
    optionA: t3('Motivated to plan ahead and finish early', 'Planifier à l’avance et finir tôt', 'تخطط مسبقاً وتنهي مبكراً'),
    optionB: t3('Better when working right up to the deadline', 'Travailler jusqu’au dernier moment', 'تعمل أفضل قرب الموعد النهائي') },

  { id: 47, text: t3('Your workspace is usually…', 'Votre espace de travail est généralement…', 'مساحة عملك عادةً…'),
    optionA: t3('Organised and tidy', 'Organisé et net', 'منظمة وأنيقة'),
    optionB: t3('Creatively cluttered', 'Joliment en désordre', 'فوضوية بطريقة إبداعية') },

  { id: 48, text: t3('You feel best when things are…', 'Vous vous sentez bien quand les choses sont…', 'تشعر بالراحة عندما تكون الأمور…'),
    optionA: t3('Decided and settled', 'Décidées et réglées', 'محسومة ومستقرة'),
    optionB: t3('Open and still being considered', 'Encore ouvertes et à l’étude', 'مفتوحة وقيد الدراسة') },

  { id: 49, text: t3('When plans change unexpectedly, you feel…', 'Quand les plans changent à l’improviste, vous vous sentez…', 'عند تغيّر الخطط فجأة، تشعر بـ…'),
    optionA: t3('Frustrated', 'Frustré(e)', 'الإحباط'),
    optionB: t3('Adaptable and often excited', 'Adaptable et souvent enthousiaste', 'القدرة على التكيف وأحياناً الحماس') },

  { id: 50, text: t3('You tend to…', 'Vous avez tendance à…', 'تميل إلى أن…'),
    optionA: t3('Follow a schedule', 'Suivre un planning', 'تتبع جدولاً'),
    optionB: t3('Do things when inspiration strikes', 'Agir quand l’inspiration vient', 'تعمل عندما يأتيك الإلهام') },

  { id: 51, text: t3('Before a trip, you…', 'Avant un voyage, vous…', 'قبل السفر، أنت…'),
    optionA: t3('Plan every detail carefully', 'Planifiez chaque détail soigneusement', 'تخطط لكل تفصيلة بدقة'),
    optionB: t3('Decide things as you go', 'Décidez au fur et à mesure', 'تتخذ القرارات أثناء الرحلة') },

  { id: 52, text: t3('To-do lists are…', 'Les listes de tâches sont…', 'قوائم المهام هي…'),
    optionA: t3('Essential — you love checking things off', 'Essentielles — vous adorez cocher', 'ضرورية — تحبّ شطب المهام'),
    optionB: t3('Rarely used — you keep it in your head', 'Rares — vous gardez tout en tête', 'نادراً ما تستخدمها — تحتفظ بها في رأسك') },

  { id: 53, text: t3('You prefer projects that have…', 'Vous préférez les projets avec…', 'تفضّل المشاريع التي لها…'),
    optionA: t3('Clear goals and a set timeline', 'Des objectifs clairs et un calendrier précis', 'أهداف واضحة وجدول زمني محدد'),
    optionB: t3('Flexibility to evolve', 'De la flexibilité pour évoluer', 'مرونة للتطور') },

  { id: 54, text: t3('You finish tasks…', 'Vous terminez les tâches…', 'تُنهي مهامّك…'),
    optionA: t3('Well before the deadline', 'Bien avant l’échéance', 'قبل الموعد بكثير'),
    optionB: t3('Just in time or sometimes after', 'Pile à temps, voire après', 'في الموعد بالضبط أو بعده أحياناً') },

  { id: 55, text: t3('Starting a new task, you…', 'En commençant une nouvelle tâche, vous…', 'عند بدء مهمة جديدة، أنت…'),
    optionA: t3('Set up a clear plan first', 'Établissez d’abord un plan clair', 'تضع خطة واضحة أولاً'),
    optionB: t3('Jump in and figure it out as you go', 'Vous lancez et improvisez', 'تبدأ مباشرة وتعالج الأمور أثناء العمل') },

  { id: 56, text: t3('Life feels better when it is…', 'La vie semble meilleure quand elle est…', 'تشعر أن الحياة أفضل عندما تكون…'),
    optionA: t3('Structured and predictable', 'Structurée et prévisible', 'منظمة ويمكن التنبؤ بها'),
    optionB: t3('Open and full of possibilities', 'Ouverte et pleine de possibilités', 'مفتوحة ومليئة بالاحتمالات') },

  { id: 57, text: t3('You make decisions…', 'Vous prenez des décisions…', 'تتخذ القرارات…'),
    optionA: t3('Quickly and stick to them', 'Rapidement et vous vous y tenez', 'بسرعة وتلتزم بها'),
    optionB: t3('After gathering lots of options', 'Après avoir étudié beaucoup d’options', 'بعد دراسة خيارات كثيرة') },

  { id: 58, text: t3('Unfinished projects make you feel…', 'Les projets inachevés vous donnent un sentiment…', 'المشاريع غير المُكتملة تجعلك تشعر…'),
    optionA: t3('Uncomfortable until they are done', 'D’inconfort jusqu’à leur achèvement', 'بعدم الراحة حتى تنتهي'),
    optionB: t3('Fine — you’ll get to it eventually', 'De tranquillité — vous y reviendrez', 'بأنك ستعود إليها لاحقاً دون قلق') },

  { id: 59, text: t3('You prefer to work…', 'Vous préférez travailler…', 'تفضّل العمل على…'),
    optionA: t3('Methodically through one task at a time', 'Méthodiquement, une tâche à la fois', 'مهمة واحدة في وقت واحد بمنهجية'),
    optionB: t3('On multiple things simultaneously', 'Sur plusieurs choses à la fois', 'عدة مهام في الوقت نفسه') },
];
