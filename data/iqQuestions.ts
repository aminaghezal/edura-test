import { Translations, t3 } from '@/lib/i18n';

export interface IQQuestion {
  id: number;
  type: 'sequence' | 'analogy' | 'matrix' | 'logic';
  text: Translations;
  options: Translations[];
  answer: number; // index into options
  explanation: Translations;
}

export const iqQuestions: IQQuestion[] = [
  { id: 0, type: 'sequence',
    text: t3('What comes next in the sequence?\n2, 4, 8, 16, __', 'Quel nombre vient ensuite ?\n2, 4, 8, 16, __', 'ما الرقم التالي في التسلسل؟\n2، 4، 8، 16، __'),
    options: [t3('24','24','24'), t3('32','32','32'), t3('28','28','28'), t3('20','20','20')],
    answer: 1,
    explanation: t3('Each number doubles the previous one. 16 × 2 = 32.', 'Chaque nombre double le précédent. 16 × 2 = 32.', 'كل رقم ضِعف الذي قبله. 16 × 2 = 32.') },

  { id: 1, type: 'analogy',
    text: t3('Book is to Library as Painting is to …', 'Livre est à Bibliothèque ce que Peinture est à …', 'الكتاب من المكتبة كما اللوحة من …'),
    options: [t3('Artist','Artiste','الفنان'), t3('Canvas','Toile','القماش'), t3('Museum','Musée','المتحف'), t3('Colour','Couleur','اللون')],
    answer: 2,
    explanation: t3('Books are housed in libraries; paintings are displayed in museums.', 'Les livres sont dans les bibliothèques ; les peintures dans les musées.', 'الكتب توجد في المكتبات، واللوحات تُعرض في المتاحف.') },

  { id: 2, type: 'sequence',
    text: t3('What comes next?\n1, 1, 2, 3, 5, 8, __', 'Quel nombre vient ensuite ?\n1, 1, 2, 3, 5, 8, __', 'ما الرقم التالي؟\n1، 1، 2، 3، 5، 8، __'),
    options: [t3('11','11','11'), t3('12','12','12'), t3('13','13','13'), t3('14','14','14')],
    answer: 2,
    explanation: t3('Fibonacci sequence: each term is the sum of the two before it. 5 + 8 = 13.', 'Suite de Fibonacci : chaque terme est la somme des deux précédents. 5 + 8 = 13.', 'متتالية فيبوناتشي: كل حد هو مجموع الحدّين السابقين. 5 + 8 = 13.') },

  { id: 3, type: 'logic',
    text: t3('All roses are flowers. Some flowers fade quickly. Therefore …', 'Toutes les roses sont des fleurs. Certaines fleurs fanent vite. Donc …', 'كل الورود زهور. بعض الزهور تذبل بسرعة. إذن …'),
    options: [
      t3('All roses fade quickly', 'Toutes les roses fanent vite', 'كل الورود تذبل بسرعة'),
      t3('Some roses may fade quickly', 'Certaines roses peuvent faner vite', 'قد تذبل بعض الورود بسرعة'),
      t3('No roses fade quickly', 'Aucune rose ne fane vite', 'لا تذبل أي وردة بسرعة'),
      t3('Flowers are all roses', 'Toutes les fleurs sont des roses', 'كل الزهور ورود'),
    ],
    answer: 1,
    explanation: t3('Roses are a subset of flowers, so only “some roses may fade quickly” is valid.', 'Les roses sont un sous-ensemble des fleurs, donc seul « certaines roses peuvent faner vite » est valide.', 'الورود مجموعة فرعية من الزهور، فقط "بعض الورود قد تذبل بسرعة" صحيح.') },

  { id: 4, type: 'analogy',
    text: t3('Thermometer is to Temperature as Barometer is to …', 'Thermomètre est à Température ce que Baromètre est à …', 'مقياس الحرارة يقيس الحرارة كما المرقاب يقيس …'),
    options: [t3('Wind','Vent','الرياح'), t3('Humidity','Humidité','الرطوبة'), t3('Pressure','Pression','الضغط'), t3('Rain','Pluie','المطر')],
    answer: 2,
    explanation: t3('A thermometer measures temperature; a barometer measures atmospheric pressure.', 'Le thermomètre mesure la température ; le baromètre mesure la pression.', 'مقياس الحرارة يقيس درجة الحرارة، والمرقاب يقيس الضغط الجوي.') },

  { id: 5, type: 'sequence',
    text: t3('Find the missing number:\n3, 6, 11, 18, 27, __', 'Trouvez le nombre manquant :\n3, 6, 11, 18, 27, __', 'أوجد الرقم المفقود:\n3، 6، 11، 18، 27، __'),
    options: [t3('35','35','35'), t3('36','36','36'), t3('38','38','38'), t3('40','40','40')],
    answer: 2,
    explanation: t3('Differences are 3, 5, 7, 9, 11 (odd numbers). 27 + 11 = 38.', 'Les différences sont 3, 5, 7, 9, 11 (nombres impairs). 27 + 11 = 38.', 'الفروق هي 3، 5، 7، 9، 11 (أعداد فردية). 27 + 11 = 38.') },

  { id: 6, type: 'logic',
    text: t3('A clock shows 3:15. What is the angle between the hour and minute hands?', 'Une horloge indique 3h15. Quel est l’angle entre les aiguilles ?', 'الساعة تشير إلى 3:15. ما الزاوية بين عقربي الساعة والدقائق؟'),
    options: [t3('0°','0°','0°'), t3('7.5°','7,5°','7.5°'), t3('15°','15°','15°'), t3('22.5°','22,5°','22.5°')],
    answer: 1,
    explanation: t3('Minute hand at 90°; hour hand at 97.5° (3×30 + 15×0.5). Difference = 7.5°.', 'Minute à 90° ; heure à 97,5° (3×30 + 15×0,5). Différence = 7,5°.', 'عقرب الدقائق عند 90°، وعقرب الساعات عند 97.5°. الفرق = 7.5°.') },

  { id: 7, type: 'sequence',
    text: t3('What comes next?\n81, 27, 9, 3, __', 'Quel nombre vient ensuite ?\n81, 27, 9, 3, __', 'ما الرقم التالي؟\n81، 27، 9، 3، __'),
    options: [t3('1','1','1'), t3('0','0','0'), t3('2','2','2'), t3('0.5','0,5','0.5')],
    answer: 0,
    explanation: t3('Each term is divided by 3. 3 ÷ 3 = 1.', 'Chaque terme est divisé par 3. 3 ÷ 3 = 1.', 'كل حد يُقسَم على 3. 3 ÷ 3 = 1.') },

  { id: 8, type: 'analogy',
    text: t3('Pen is to Writer as Scalpel is to …', 'Stylo est à Écrivain ce que Bistouri est à …', 'القلم للكاتب كما المشرط لـ …'),
    options: [t3('Patient','Patient','المريض'), t3('Surgeon','Chirurgien','الجرّاح'), t3('Hospital','Hôpital','المستشفى'), t3('Medicine','Médecine','الطب')],
    answer: 1,
    explanation: t3('A pen is the main tool of a writer; a scalpel is the main tool of a surgeon.', 'Le stylo est l’outil principal de l’écrivain ; le bistouri celui du chirurgien.', 'القلم أداة الكاتب الأساسية، والمشرط أداة الجرّاح الأساسية.') },

  { id: 9, type: 'logic',
    text: t3('Rearrange the letters “CIFAIPC”. The result names a …', 'Réarrangez les lettres « CIFAIPC ». Le résultat désigne un …', 'أعد ترتيب الأحرف "CIFAIPC". الكلمة الناتجة تُسمّي…'),
    options: [t3('Country','Pays','دولة'), t3('Ocean','Océan','محيط'), t3('Continent','Continent','قارة'), t3('City','Ville','مدينة')],
    answer: 1,
    explanation: t3('CIFAIPC → PACIFIC (the Pacific Ocean).', 'CIFAIPC → PACIFIC (l’océan Pacifique).', '"CIFAIPC" → PACIFIC، وهو المحيط الهادئ.') },

  { id: 10, type: 'sequence',
    text: t3('What comes next?\n2, 6, 12, 20, 30, __', 'Quel nombre vient ensuite ?\n2, 6, 12, 20, 30, __', 'ما الرقم التالي؟\n2، 6، 12، 20، 30، __'),
    options: [t3('40','40','40'), t3('42','42','42'), t3('44','44','44'), t3('46','46','46')],
    answer: 1,
    explanation: t3('Pattern: n × (n+1). 6 × 7 = 42.', 'Motif : n × (n+1). 6 × 7 = 42.', 'النمط: n × (n+1). 6 × 7 = 42.') },

  { id: 11, type: 'logic',
    text: t3('A train travels 60 km in 45 minutes. How far will it travel in 2 hours at the same speed?', 'Un train parcourt 60 km en 45 minutes. Quelle distance parcourra-t-il en 2 heures à la même vitesse ?', 'يقطع قطار 60 كم في 45 دقيقة. كم يقطع في ساعتين بالسرعة نفسها؟'),
    options: [t3('120 km','120 km','120 كم'), t3('150 km','150 km','150 كم'), t3('160 km','160 km','160 كم'), t3('180 km','180 km','180 كم')],
    answer: 2,
    explanation: t3('Speed = 80 km/h. In 2 hours: 80 × 2 = 160 km.', 'Vitesse = 80 km/h. En 2 h : 80 × 2 = 160 km.', 'السرعة = 80 كم/سا. في ساعتين: 80 × 2 = 160 كم.') },

  { id: 12, type: 'analogy',
    text: t3('Architect is to Blueprint as Chef is to …', 'Architecte est à Plan ce que Chef est à …', 'المهندس المعماري مع المخطط كما الطاهي مع …'),
    options: [t3('Kitchen','Cuisine','المطبخ'), t3('Restaurant','Restaurant','المطعم'), t3('Recipe','Recette','الوصفة'), t3('Ingredient','Ingrédient','المكوّن')],
    answer: 2,
    explanation: t3('An architect works from a blueprint; a chef works from a recipe.', 'L’architecte travaille à partir d’un plan ; le chef à partir d’une recette.', 'المهندس يعمل وفق مخطط، والطاهي يعمل وفق وصفة.') },

  { id: 13, type: 'sequence',
    text: t3('What number replaces the “?”:\n4, 9, 25, 49, 121, ?', 'Quel nombre remplace le « ? » :\n4, 9, 25, 49, 121, ?', 'ما الرقم الذي يحلّ محل "؟":\n4، 9، 25، 49، 121، ؟'),
    options: [t3('144','144','144'), t3('169','169','169'), t3('196','196','196'), t3('225','225','225')],
    answer: 1,
    explanation: t3('Squares of primes: 2², 3², 5², 7², 11², 13² = 169.', 'Carrés de nombres premiers : 2², 3², 5², 7², 11², 13² = 169.', 'مربعات أعداد أولية: 2²، 3²، 5²، 7²، 11²، 13² = 169.') },

  { id: 14, type: 'logic',
    text: t3('Maria is taller than Lena. Lena is taller than Sara. Who is shortest?', 'Maria est plus grande que Lena. Lena est plus grande que Sara. Qui est la plus petite ?', 'مريم أطول من لينا. لينا أطول من سارة. من الأقصر؟'),
    options: [t3('Maria','Maria','مريم'), t3('Lena','Lena','لينا'), t3('Sara','Sara','سارة'), t3('Cannot tell','Impossible à dire','لا يمكن التحديد')],
    answer: 2,
    explanation: t3('Maria > Lena > Sara, so Sara is shortest.', 'Maria > Lena > Sara, donc Sara est la plus petite.', 'مريم > لينا > سارة، إذن سارة هي الأقصر.') },

  { id: 15, type: 'sequence',
    text: t3('What comes next?\nAZ, BY, CX, DW, __', 'Quel duo vient ensuite ?\nAZ, BY, CX, DW, __', 'ما التالي؟\nAZ، BY، CX، DW، __'),
    options: [t3('EV','EV','EV'), t3('EU','EU','EU'), t3('FV','FV','FV'), t3('EW','EW','EW')],
    answer: 0,
    explanation: t3('First letters go forward (A,B,C,D,E); second letters go backward (Z,Y,X,W,V).', 'Les premières lettres avancent (A,B,C,D,E) ; les secondes reculent (Z,Y,X,W,V).', 'الحرف الأول يتقدم (A,B,C,D,E)، والحرف الثاني يتراجع (Z,Y,X,W,V).') },

  { id: 16, type: 'logic',
    text: t3('Each letter equals its alphabet position (A=1, B=2 …). If HOUSE sums to 68, what does CAT sum to?', 'Chaque lettre vaut sa position dans l’alphabet (A=1, B=2 …). Si HOUSE = 68, combien vaut CAT ?', 'كل حرف يساوي ترتيبه في الأبجدية الإنجليزية (A=1, B=2 …). إذا كان مجموع HOUSE = 68، فما مجموع CAT؟'),
    options: [t3('22','22','22'), t3('24','24','24'), t3('26','26','26'), t3('28','28','28')],
    answer: 1,
    explanation: t3('C=3, A=1, T=20. Sum = 24.', 'C=3, A=1, T=20. Somme = 24.', 'C=3، A=1، T=20. المجموع = 24.') },

  { id: 17, type: 'analogy',
    text: t3('Water is to Thirst as Food is to …', 'Eau est à Soif ce que Nourriture est à …', 'الماء يروي العطش كما الطعام يسدّ …'),
    options: [t3('Taste','Goût','المذاق'), t3('Hunger','Faim','الجوع'), t3('Nutrition','Nutrition','التغذية'), t3('Stomach','Estomac','المعدة')],
    answer: 1,
    explanation: t3('Water satisfies thirst; food satisfies hunger.', 'L’eau étanche la soif ; la nourriture comble la faim.', 'الماء يروي العطش، والطعام يسدّ الجوع.') },

  { id: 18, type: 'sequence',
    text: t3('What comes next?\n1, 4, 9, 16, 25, __', 'Quel nombre vient ensuite ?\n1, 4, 9, 16, 25, __', 'ما الرقم التالي؟\n1، 4، 9، 16، 25، __'),
    options: [t3('30','30','30'), t3('36','36','36'), t3('40','40','40'), t3('49','49','49')],
    answer: 1,
    explanation: t3('Perfect squares: 1², 2², 3², 4², 5², 6² = 36.', 'Carrés parfaits : 1², 2², 3², 4², 5², 6² = 36.', 'مربعات كاملة: 1²، 2²، 3²، 4²، 5²، 6² = 36.') },

  { id: 19, type: 'logic',
    text: t3('A shopkeeper buys an item for 80 DZD and sells it for 100 DZD. What is the profit percentage?', 'Un commerçant achète un article 80 DZD et le revend 100 DZD. Quel est le pourcentage de bénéfice ?', 'اشترى تاجر سلعة بـ 80 دج وباعها بـ 100 دج. ما نسبة الربح؟'),
    options: [t3('20%','20 %','20%'), t3('25%','25 %','25%'), t3('80%','80 %','80%'), t3('100%','100 %','100%')],
    answer: 1,
    explanation: t3('Profit = 20, Cost = 80. Profit% = (20/80) × 100 = 25%.', 'Bénéfice = 20, Coût = 80. % = (20/80) × 100 = 25 %.', 'الربح = 20، التكلفة = 80. النسبة = (20/80) × 100 = 25%.') },
];
