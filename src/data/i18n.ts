import type { Lang } from '../lib/types';

/**
 * Bilingual copy for the whole prototype.
 *
 * Arabic is written as real Arabic (not a transliteration of the English
 * layout): Latin brand words such as WhatsApp are localised rather than left
 * inline, so the bidi algorithm never has to reorder a mixed run. Where a
 * Latin token is unavoidable the UI wraps it in `.ltr`.
 */
type Dict = Record<string, { en: string; ar: string }>;

export const strings: Dict = {
  /* ------------------------------- chrome ------------------------------- */
  'brand.name': { en: 'GLOBAL MEDAL', ar: 'جلوبال ميدال' },
  'brand.since': { en: 'Kuwait · Since 1980', ar: 'الكويت · منذ ١٩٨٠' },
  'brand.assistant': { en: 'Smart Awards & Gifts Assistant', ar: 'المرشد الذكي للجوائز والهدايا' },
  'chrome.conceptBadge': { en: 'Concept prototype', ar: 'نموذج تجريبي' },
  'chrome.restart': { en: 'Start again', ar: 'ابدأ من جديد' },
  'chrome.expertShort': { en: 'Talk to an expert', ar: 'تحدّث مع مختص' },
  'chrome.notSure': { en: 'Not sure what to choose?', ar: 'غير متأكد من الاختيار؟' },
  'chrome.back': { en: 'Back', ar: 'رجوع' },
  'chrome.continue': { en: 'Continue', ar: 'متابعة' },
  'chrome.skip': { en: 'Skip this step', ar: 'تخطّي هذه الخطوة' },
  'chrome.close': { en: 'Close', ar: 'إغلاق' },
  'chrome.stepOf': { en: 'Step {a} of {b}', ar: 'الخطوة {a} من {b}' },
  'chrome.selectToContinue': { en: 'Select an option to continue', ar: 'اختر خياراً للمتابعة' },
  'chrome.optional': { en: 'Optional', ar: 'اختياري' },
  'chrome.kd': { en: 'KD', ar: 'د.ك' },
  'chrome.perItem': { en: 'per item', ar: 'للقطعة' },
  'chrome.demoNotice': {
    en: 'Prototype — demonstration catalogue data. Prices and availability are not live.',
    ar: 'نموذج تجريبي — بيانات كتالوج للعرض فقط. الأسعار والتوفر غير مباشرة.',
  },

  /* ------------------------------- landing ------------------------------ */
  'landing.eyebrow': { en: 'A new guided experience', ar: 'تجربة إرشادية جديدة' },
  'landing.title': {
    en: 'Find the right award for your occasion.',
    ar: 'اعثر على الجائزة المناسبة لمناسبتك.',
  },
  'landing.subtitle': {
    en: 'Tell us what you need. We’ll help you find the right award, medal or gift from Global Medal.',
    ar: 'أخبرنا بما تحتاجه، ونساعدك في الوصول إلى الجائزة أو الميدالية أو الهدية المناسبة من جلوبال ميدال.',
  },
  'landing.support': {
    en: 'From sports events to corporate recognition, academic achievements and special occasions.',
    ar: 'من الفعاليات الرياضية إلى التكريم المؤسسي والإنجازات الأكاديمية والمناسبات الخاصة.',
  },
  'landing.cta': { en: 'Find my award', ar: 'اعثر على جائزتي' },
  'landing.ctaSecondary': { en: 'Browse products', ar: 'تصفّح المنتجات' },
  'landing.demoCta': { en: 'Play demo scenario', ar: 'تشغيل السيناريو التجريبي' },
  'landing.demoHint': {
    en: 'Pre-fills a corporate recognition request for 50 awards.',
    ar: 'يعبّئ مسبقاً طلب تكريم مؤسسي لعدد ٥٠ جائزة.',
  },
  'landing.pillar1.title': { en: 'First trophy store in Kuwait', ar: 'أول متجر كؤوس في الكويت' },
  'landing.pillar1.body': {
    en: 'A family-owned business established in 1980, with a showroom in Hawally.',
    ar: 'مؤسسة عائلية تأسست عام ١٩٨٠، ولها معرض في حولي.',
  },
  'landing.pillar2.title': { en: 'In-house customisation', ar: 'تخصيص داخل المصنع' },
  'landing.pillar2.body': {
    en: 'Engraving, printing and logo work handled by the Global Medal team.',
    ar: 'النقش والطباعة وتنفيذ الشعارات على يد فريق جلوبال ميدال.',
  },
  'landing.pillar3.title': { en: 'Built for bulk orders', ar: 'مهيّأ للطلبات الكبيرة' },
  'landing.pillar3.body': {
    en: 'Schools, sports clubs, cultural organisations and corporate ceremonies.',
    ar: 'المدارس والأندية الرياضية والجهات الثقافية وحفلات الشركات.',
  },
  'landing.rangeTitle': { en: 'The range you’ll be matched from', ar: 'المجموعات التي سيتم الترشيح منها' },
  'landing.howTitle': { en: 'How it works', ar: 'كيف تعمل التجربة' },
  'landing.how1': { en: 'Answer six short questions', ar: 'أجب عن ست أسئلة قصيرة' },
  'landing.how1b': {
    en: 'Occasion, recipients, quantity, budget, style and customisation.',
    ar: 'المناسبة، المكرّمون، الكمية، الميزانية، الطراز، والتخصيص.',
  },
  'landing.how2': { en: 'Get three matched options', ar: 'احصل على ثلاثة خيارات مرشّحة' },
  'landing.how2b': {
    en: 'A best match, a best value option and a premium choice — with the reason for each.',
    ar: 'الخيار الأنسب، والأفضل قيمة، والخيار الفاخر — مع سبب الترشيح لكل منها.',
  },
  'landing.how3': { en: 'Send a complete request', ar: 'أرسل طلباً مكتملاً' },
  'landing.how3b': {
    en: 'Your requirements arrive with the Global Medal team already structured.',
    ar: 'تصل متطلباتك إلى فريق جلوبال ميدال منظّمة وجاهزة للمراجعة.',
  },
  'landing.footnote': {
    en: 'This is a concept prototype built for Global Medal. It complements the existing online store — it does not replace it. No order is placed here.',
    ar: 'هذا نموذج تجريبي مُعدّ لجلوبال ميدال، ومكمّل للمتجر الإلكتروني الحالي ولا يحل محله. لا يتم تنفيذ أي طلب من خلاله.',
  },

  /* ------------------------------ questions ----------------------------- */
  'q.occasion.title': { en: 'What are you celebrating?', ar: 'ما المناسبة التي تحتفلون بها؟' },
  'q.occasion.hint': {
    en: 'This shapes everything that follows — pick the closest fit.',
    ar: 'هذا الاختيار يحدد بقية الترشيحات، فاختر الأقرب لحالتك.',
  },
  'q.recipients.title': { en: 'Who are you recognising?', ar: 'من الذين ستُكرّمهم؟' },
  'q.recipients.hint': { en: 'Choose one or more.', ar: 'يمكنك اختيار أكثر من فئة.' },
  'q.scale.title': { en: 'How many, and at what budget?', ar: 'كم العدد، وبأي ميزانية؟' },
  'q.scale.hint': {
    en: 'Quantity and budget together decide which formats make sense.',
    ar: 'الكمية والميزانية معاً تحددان الأشكال المناسبة لطلبك.',
  },
  'q.quantity.label': { en: 'How many awards do you need?', ar: 'كم عدد الجوائز التي تحتاجها؟' },
  'q.quantity.exact': { en: 'Or enter an exact quantity', ar: 'أو أدخل الكمية بدقة' },
  'q.quantity.placeholder': { en: 'e.g. 50', ar: 'مثال: ٥٠' },
  'q.quantity.bulkNote': {
    en: 'Perfect — we can help you find options suitable for bulk orders.',
    ar: 'ممتاز — يمكننا مساعدتك في إيجاد خيارات مناسبة للطلبات الكبيرة.',
  },
  'q.quantity.hugeNote': {
    en: 'That’s a very large run. The Global Medal team will confirm lead time and production capacity for this quantity.',
    ar: 'هذه كمية كبيرة جداً. سيؤكد فريق جلوبال ميدال مدة التنفيذ والطاقة الإنتاجية لهذه الكمية.',
  },
  'q.quantity.invalid': {
    en: 'Please enter a quantity between 1 and 100,000.',
    ar: 'يرجى إدخال كمية بين ١ و ١٠٠٬٠٠٠.',
  },
  'q.budget.label': { en: 'Approximate budget per item', ar: 'الميزانية التقريبية للقطعة الواحدة' },
  'q.style.title': { en: 'What style fits your event?', ar: 'أي طراز يناسب مناسبتك؟' },
  'q.style.hint': {
    en: 'There is no wrong answer here — it only tilts the shortlist.',
    ar: 'لا يوجد اختيار خاطئ هنا، فهو يوجّه الترشيحات فقط.',
  },
  'q.custom.title': { en: 'Would you like to personalise it?', ar: 'هل ترغب بتخصيص الجائزة؟' },
  'q.custom.hint': {
    en: 'Global Medal handles engraving, printing and logo work in house.',
    ar: 'ينفّذ فريق جلوبال ميدال أعمال النقش والطباعة والشعارات داخلياً.',
  },
  'q.custom.upload': { en: 'Upload your logo', ar: 'ارفع شعارك' },
  'q.custom.uploadHint': {
    en: 'PNG, JPG or SVG. Simulated in this prototype — nothing is uploaded.',
    ar: 'صيغ الصور المعتادة. الرفع محاكاة في هذا النموذج ولا يتم إرسال أي ملف.',
  },
  'q.custom.uploaded': { en: 'Logo attached', ar: 'تم إرفاق الشعار' },
  'q.custom.remove': { en: 'Remove', ar: 'إزالة' },
  'q.timeline.title': { en: 'When do you need it?', ar: 'متى تحتاجها؟' },
  'q.timeline.hint': {
    en: 'Standard customised orders usually take a few business days.',
    ar: 'الطلبات المخصصة القياسية تستغرق عادةً عدة أيام عمل.',
  },
  'q.timeline.urgentNote': {
    en: 'Urgent requests may require availability confirmation. Global Medal’s team can confirm current stock and production options.',
    ar: 'الطلبات العاجلة قد تتطلب تأكيد التوفر. يستطيع فريق جلوبال ميدال تأكيد المخزون الحالي وخيارات الإنتاج.',
  },

  /* ------------------------------ occasions ----------------------------- */
  'occasion.sports.title': { en: 'Sports event', ar: 'فعالية رياضية' },
  'occasion.sports.body': { en: 'Tournaments, leagues, sports days and finals.', ar: 'بطولات ودوريات وأيام رياضية ونهائيات.' },
  'occasion.corporate.title': { en: 'Corporate recognition', ar: 'تكريم مؤسسي' },
  'occasion.corporate.body': { en: 'Recognise employees, teams and achievements.', ar: 'تكريم الموظفين والفرق والإنجازات.' },
  'occasion.academic.title': { en: 'Academic achievement', ar: 'إنجاز أكاديمي' },
  'occasion.academic.body': { en: 'Graduations, honour rolls and school ceremonies.', ar: 'حفلات التخرج والتفوق والمناسبات المدرسية.' },
  'occasion.gift.title': { en: 'Corporate gift', ar: 'هدية مؤسسية' },
  'occasion.gift.body': { en: 'Client gifts, partnerships and seasonal gifting.', ar: 'هدايا العملاء والشراكات والمناسبات الموسمية.' },
  'occasion.vip.title': { en: 'VIP / special recognition', ar: 'تكريم كبار الشخصيات' },
  'occasion.vip.body': { en: 'Guests of honour, delegations and dignitaries.', ar: 'ضيوف الشرف والوفود وكبار الزوار.' },
  'occasion.ceremony.title': { en: 'Event / ceremony', ar: 'حفل أو مناسبة' },
  'occasion.ceremony.body': { en: 'Award nights, openings and annual gatherings.', ar: 'حفلات الجوائز والافتتاحات واللقاءات السنوية.' },
  'occasion.personal.title': { en: 'Personal occasion', ar: 'مناسبة شخصية' },
  'occasion.personal.body': { en: 'A gift or keepsake for someone you value.', ar: 'هدية أو تذكار لشخص عزيز.' },

  /* ------------------------------ recipients ---------------------------- */
  'recipient.employees': { en: 'Employees', ar: 'الموظفون' },
  'recipient.athletes': { en: 'Athletes', ar: 'الرياضيون' },
  'recipient.students': { en: 'Students', ar: 'الطلبة' },
  'recipient.executives': { en: 'Executives', ar: 'القيادات التنفيذية' },
  'recipient.teams': { en: 'Teams', ar: 'الفرق' },
  'recipient.guests': { en: 'Guests', ar: 'الضيوف' },
  'recipient.clients': { en: 'Clients', ar: 'العملاء' },
  'recipient.other': { en: 'Other', ar: 'فئة أخرى' },

  /* -------------------------------- bands ------------------------------- */
  'qty.1-10': { en: '1–10', ar: '١٠ – ١' },
  'qty.11-25': { en: '11–25', ar: '٢٥ – ١١' },
  'qty.26-50': { en: '26–50', ar: '٥٠ – ٢٦' },
  'qty.51-100': { en: '51–100', ar: '١٠٠ – ٥١' },
  'qty.100+': { en: '100+', ar: 'أكثر من ١٠٠' },

  'budget.under5': { en: 'Under 5 KD', ar: 'أقل من ٥ د.ك' },
  'budget.5-10': { en: '5–10 KD', ar: '٥ – ١٠ د.ك' },
  'budget.10-20': { en: '10–20 KD', ar: '١٠ – ٢٠ د.ك' },
  'budget.20-50': { en: '20–50 KD', ar: '٢٠ – ٥٠ د.ك' },
  'budget.50+': { en: '50+ KD', ar: 'أكثر من ٥٠ د.ك' },
  'budget.unsure': { en: 'I’m not sure', ar: 'لست متأكداً' },

  'style.classic': { en: 'Classic', ar: 'كلاسيكي' },
  'style.classic.body': { en: 'Traditional cups, laurels and formal shapes.', ar: 'كؤوس تقليدية وأكاليل وأشكال رسمية.' },
  'style.modern': { en: 'Modern', ar: 'عصري' },
  'style.modern.body': { en: 'Clean geometry and contemporary finishes.', ar: 'خطوط هندسية نظيفة وتشطيبات معاصرة.' },
  'style.premium': { en: 'Premium', ar: 'راقٍ' },
  'style.premium.body': { en: 'Weightier pieces with a considered presentation.', ar: 'قطع أثقل بحضور مدروس.' },
  'style.luxury': { en: 'Luxury', ar: 'فاخر' },
  'style.luxury.body': { en: 'Crystal and heritage pieces for the top award.', ar: 'قطع كريستالية وتراثية للجائزة الأعلى.' },
  'style.minimal': { en: 'Minimal', ar: 'بسيط' },
  'style.minimal.body': { en: 'Quiet forms, nothing decorative.', ar: 'أشكال هادئة بلا زخرفة.' },
  'style.sporty': { en: 'Sporty', ar: 'رياضي' },
  'style.sporty.body': { en: 'Built for the podium and the team photo.', ar: 'مصمم لمنصة التتويج وصورة الفريق.' },
  'style.unsure': { en: 'I’m not sure', ar: 'لست متأكداً' },
  'style.unsure.body': { en: 'Show me a spread and I’ll decide.', ar: 'اعرض لي خيارات متنوعة وسأقرر.' },

  'custom.engraving': { en: 'Engraving', ar: 'نقش' },
  'custom.logo': { en: 'Company / school logo', ar: 'شعار الشركة أو المدرسة' },
  'custom.text': { en: 'Custom text', ar: 'نص مخصص' },
  'custom.design': { en: 'Custom design', ar: 'تصميم مخصص' },
  'custom.ribbon': { en: 'Ribbon / colour', ar: 'شريط أو لون' },
  'custom.unsure': { en: 'I’m not sure yet', ar: 'لم أقرر بعد' },

  'timeline.flexible': { en: 'Flexible', ar: 'مرن' },
  'timeline.flexible.body': { en: 'No fixed date yet.', ar: 'لا يوجد موعد محدد بعد.' },
  'timeline.weeks': { en: 'Within 1–2 weeks', ar: 'خلال أسبوع إلى أسبوعين' },
  'timeline.weeks.body': { en: 'The usual window for customised orders.', ar: 'المدة المعتادة للطلبات المخصصة.' },
  'timeline.days': { en: 'Within a few days', ar: 'خلال أيام قليلة' },
  'timeline.days.body': { en: 'Tight, but often workable.', ar: 'وقت ضيق لكنه ممكن غالباً.' },
  'timeline.urgent': { en: 'Urgent / same day', ar: 'عاجل / نفس اليوم' },
  'timeline.urgent.body': { en: 'Subject to availability confirmation.', ar: 'يخضع لتأكيد التوفر.' },

  /* ----------------------------- thinking ------------------------------- */
  'thinking.title': { en: 'Finding the best matches for you…', ar: 'نبحث عن أنسب الخيارات لك…' },
  'thinking.step1': { en: 'Reading your occasion and recipients', ar: 'قراءة المناسبة والفئة المُكرّمة' },
  'thinking.step2': { en: 'Filtering the catalogue by quantity and budget', ar: 'تصفية الكتالوج حسب الكمية والميزانية' },
  'thinking.step3': { en: 'Checking customisation options', ar: 'مراجعة خيارات التخصيص' },

  /* --------------------------- recommendations -------------------------- */
  'rec.title': { en: 'Your recommended options', ar: 'الخيارات المرشّحة لك' },
  'rec.subtitle': {
    en: 'Three options matched to your answers, with the reason for each.',
    ar: 'ثلاثة خيارات مبنية على إجاباتك، مع سبب الترشيح لكل خيار.',
  },
  'rec.badge.best': { en: 'Best match', ar: 'الأنسب' },
  'rec.badge.value': { en: 'Best value', ar: 'الأفضل قيمة' },
  'rec.badge.premium': { en: 'Premium choice', ar: 'الخيار الفاخر' },
  'rec.badge.alt': { en: 'Another strong match', ar: 'خيار قوي آخر' },
  'rec.why': { en: 'Why it matches', ar: 'سبب الترشيح' },
  'rec.viewDetails': { en: 'View details', ar: 'عرض التفاصيل' },
  'rec.choose': { en: 'Choose this', ar: 'اختر هذا' },
  'rec.editAnswers': { en: 'Edit my answers', ar: 'تعديل إجاباتي' },
  'rec.alsoTitle': { en: 'Also worth considering', ar: 'خيارات أخرى تستحق النظر' },
  'rec.empty.title': {
    en: 'We couldn’t find a perfect match yet.',
    ar: 'لم نجد خياراً مطابقاً تماماً حتى الآن.',
  },
  'rec.empty.body': {
    en: 'Your combination is outside what this demonstration catalogue covers — but the Global Medal team can help you find the right option.',
    ar: 'تركيبة طلبك خارج ما يغطيه كتالوج العرض هذا، لكن فريق جلوبال ميدال يستطيع مساعدتك في إيجاد الخيار المناسب.',
  },
  'rec.empty.cta': { en: 'Request expert help', ar: 'اطلب مساعدة مختص' },
  'rec.urgentNote': {
    en: 'You selected an urgent timeline — availability for these options would need to be confirmed by the Global Medal team.',
    ar: 'اخترت جدولاً زمنياً عاجلاً — يحتاج توفر هذه الخيارات إلى تأكيد من فريق جلوبال ميدال.',
  },

  'reason.occasion': { en: 'Suited to {v}', ar: 'مناسبة لـ {v}' },
  'reason.recipients': { en: 'Commonly chosen for {v}', ar: 'خيار شائع لـ {v}' },
  'reason.budget': { en: 'Fits your budget of {v}', ar: 'ضمن ميزانيتك {v}' },
  'reason.underBudget': { en: 'Comfortably under your budget', ar: 'أقل من ميزانيتك بمريح' },
  'reason.bulk': { en: 'Suitable for bulk orders ({v} pieces)', ar: 'مناسبة للطلبات الكبيرة ({v} قطعة)' },
  'reason.smallRun': { en: 'Designed for small, individually presented runs', ar: 'مصممة للكميات الصغيرة التي تُقدَّم فردياً' },
  'reason.style': { en: 'Matches a {v} style', ar: 'تتوافق مع الطراز {v}' },
  'reason.logo': { en: 'Supports logo customisation', ar: 'تدعم إضافة الشعار' },
  'reason.engraving': { en: 'Supports engraving and custom text', ar: 'تدعم النقش والنص المخصص' },
  'reason.ribbon': { en: 'Ribbon colours listed in the catalogue', ar: 'ألوان الشريط مدرجة في الكتالوج' },

  /* ------------------------------ product ------------------------------- */
  'product.category': { en: 'Category', ar: 'الفئة' },
  'product.price': { en: 'Price', ar: 'السعر' },
  'product.from': { en: 'From', ar: 'ابتداءً من' },
  'product.options': { en: 'Product options', ar: 'خيارات المنتج' },
  'product.metal': { en: 'Medal colour', ar: 'لون الميدالية' },
  'product.ribbon': { en: 'Ribbon', ar: 'الشريط' },
  'product.customization': { en: 'Customisation', ar: 'التخصيص' },
  'product.engravingText': { en: 'Engraving / printed text', ar: 'نص النقش أو الطباعة' },
  'product.engravingPlaceholder': { en: 'e.g. EMPLOYEE OF THE YEAR', ar: 'مثال: موظف العام' },
  'product.quantity': { en: 'Quantity', ar: 'الكمية' },
  'product.sale': { en: 'Reduced', ar: 'مخفّض' },
  'product.was': { en: 'Was', ar: 'كان' },
  'product.notCustomizable': {
    en: 'This item is supplied as a finished piece. The Global Medal team can confirm whether any personalisation is possible for it.',
    ar: 'تُورَّد هذه القطعة جاهزة. يستطيع فريق جلوبال ميدال تأكيد ما إذا كان أي تخصيص ممكناً لها.',
  },
  'product.optionsUnverified': {
    en: 'Colour and finish options for this piece are confirmed with the Global Medal team when your request is reviewed.',
    ar: 'يتم تأكيد خيارات اللون والتشطيب لهذه القطعة مع فريق جلوبال ميدال عند مراجعة طلبك.',
  },
  'product.supportsBoth': {
    en: 'Global Medal provides in-house engraving and logo customisation for this range.',
    ar: 'يوفّر جلوبال ميدال النقش وتنفيذ الشعارات داخلياً لهذه المجموعة.',
  },
  'product.preview': { en: 'Your personalisation', ar: 'التخصيص الخاص بك' },
  'product.previewDisclaimer': { en: 'Preview for illustration only.', ar: 'المعاينة للتوضيح فقط.' },
  'product.previewEmpty': {
    en: 'Add engraving text or a logo to see it here.',
    ar: 'أضف نص النقش أو الشعار لتظهر المعاينة هنا.',
  },
  'product.selectThis': { en: 'Use this product', ar: 'اعتمد هذا المنتج' },
  'product.estTotal': { en: 'Indicative total', ar: 'الإجمالي التقريبي' },
  'product.estNote': {
    en: 'Indicative only, before customisation. Global Medal confirms final pricing.',
    ar: 'تقديري فقط قبل التخصيص. يعتمد جلوبال ميدال السعر النهائي.',
  },

  'category.medals': { en: 'Medals', ar: 'ميداليات' },
  'category.trophies': { en: 'Trophies', ar: 'كؤوس' },
  'category.crystal': { en: 'Crystal awards', ar: 'جوائز كريستال' },
  'category.plaques': { en: 'Wooden plaques', ar: 'دروع خشبية' },
  'category.bobbleheads': { en: 'Bobble heads', ar: 'مجسمات متحركة' },
  'category.vip': { en: 'VIP gifts', ar: 'هدايا كبار الشخصيات' },
  'category.replica': { en: 'World-renowned trophies', ar: 'كؤوس عالمية شهيرة' },

  'metal.gold': { en: 'Gold', ar: 'ذهبي' },
  'metal.silver': { en: 'Silver', ar: 'فضي' },
  'metal.bronze': { en: 'Bronze', ar: 'برونزي' },

  'ribbon.blue': { en: 'Blue', ar: 'أزرق' },
  'ribbon.black': { en: 'Black', ar: 'أسود' },
  'ribbon.red': { en: 'Red', ar: 'أحمر' },
  'ribbon.white': { en: 'White', ar: 'أبيض' },
  'ribbon.orange': { en: 'Orange', ar: 'برتقالي' },
  'ribbon.green': { en: 'Green', ar: 'أخضر' },
  'ribbon.kuwaitFlag': { en: 'Kuwait flag', ar: 'علم الكويت' },

  /* ------------------------------ summary ------------------------------- */
  'summary.title': { en: 'Your award request', ar: 'طلب الجائزة الخاص بك' },
  'summary.subtitle': {
    en: 'Review everything before it goes to the Global Medal team.',
    ar: 'راجع التفاصيل قبل إرسالها إلى فريق جلوبال ميدال.',
  },
  'summary.occasion': { en: 'Occasion', ar: 'المناسبة' },
  'summary.recipients': { en: 'Recipients', ar: 'المُكرّمون' },
  'summary.quantity': { en: 'Quantity', ar: 'الكمية' },
  'summary.budget': { en: 'Budget', ar: 'الميزانية' },
  'summary.style': { en: 'Style', ar: 'الطراز' },
  'summary.customization': { en: 'Customisation', ar: 'التخصيص' },
  'summary.product': { en: 'Selected product', ar: 'المنتج المختار' },
  'summary.timeline': { en: 'Timeline', ar: 'الجدول الزمني' },
  'summary.engraving': { en: 'Engraving text', ar: 'نص النقش' },
  'summary.edit': { en: 'Edit request', ar: 'تعديل الطلب' },
  'summary.none': { en: 'Not specified', ar: 'غير محدد' },

  /* ------------------------------ contact ------------------------------- */
  'contact.title': { en: 'How should we reach you?', ar: 'كيف نتواصل معك؟' },
  'contact.subtitle': {
    en: 'Four fields. Nothing is sent anywhere in this prototype.',
    ar: 'أربعة حقول فقط. لا يتم إرسال أي بيانات في هذا النموذج.',
  },
  'contact.name': { en: 'Name', ar: 'الاسم' },
  'contact.org': { en: 'Company / organisation', ar: 'الجهة أو الشركة' },
  'contact.phone': { en: 'Phone', ar: 'رقم الهاتف' },
  'contact.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'contact.preferred': { en: 'Preferred contact', ar: 'وسيلة التواصل المفضلة' },
  'contact.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'contact.phoneOpt': { en: 'Phone call', ar: 'اتصال هاتفي' },
  'contact.emailOpt': { en: 'Email', ar: 'بريد إلكتروني' },
  'contact.notes': { en: 'Additional notes', ar: 'ملاحظات إضافية' },
  'contact.notesPlaceholder': {
    en: 'Anything else the team should know.',
    ar: 'أي تفاصيل أخرى يحتاج الفريق معرفتها.',
  },
  'contact.review': { en: 'Review my request', ar: 'مراجعة طلبي' },
  'contact.err.name': { en: 'Please enter your name.', ar: 'يرجى إدخال الاسم.' },
  'contact.err.phone': {
    en: 'Enter a valid phone number (at least 8 digits).',
    ar: 'أدخل رقم هاتف صحيحاً (٨ أرقام على الأقل).',
  },
  'contact.err.email': { en: 'Enter a valid email address.', ar: 'أدخل بريداً إلكترونياً صحيحاً.' },
  'contact.optionalNote': { en: 'Optional but helpful', ar: 'اختياري لكنه مفيد' },

  /* ----------------------------- whatsapp ------------------------------- */
  'wa.title': { en: 'Continue with Global Medal', ar: 'أكمل مع جلوبال ميدال' },
  'wa.ready': { en: 'Your request is ready.', ar: 'طلبك جاهز.' },
  'wa.subtitle': {
    en: 'This is how a structured request could arrive in the team’s existing WhatsApp workflow.',
    ar: 'هكذا يمكن أن يصل الطلب منظّماً إلى سير عمل الفريق الحالي على واتساب.',
  },
  'wa.cta': { en: 'Continue on WhatsApp', ar: 'المتابعة عبر واتساب' },
  'wa.copy': { en: 'Copy message', ar: 'نسخ الرسالة' },
  'wa.copied': { en: 'Copied', ar: 'تم النسخ' },
  'wa.disclaimer': {
    en: 'Demonstration only — no message is sent from this prototype.',
    ar: 'للعرض فقط — لا يتم إرسال أي رسالة من هذا النموذج.',
  },
  'wa.msgGreeting': { en: 'Hello Global Medal 👋', ar: 'مرحباً جلوبال ميدال 👋' },
  'wa.msgIntro': {
    en: 'I’d like to request {qty} awards for a {occasion} event.',
    ar: 'أرغب بطلب {qty} جائزة لمناسبة {occasion}.',
  },

  /* ------------------------------ success ------------------------------- */
  'success.title': { en: 'Your request is ready.', ar: 'طلبك جاهز.' },
  'success.body': {
    en: 'Global Medal can now review your requirements and confirm product availability, customisation details and production options.',
    ar: 'يستطيع جلوبال ميدال الآن مراجعة متطلباتك وتأكيد توفر المنتج وتفاصيل التخصيص وخيارات الإنتاج.',
  },
  'success.prototypeNote': {
    en: 'This is a concept prototype. No request was actually sent and no order was placed.',
    ar: 'هذا نموذج تجريبي. لم يتم إرسال أي طلب فعلي ولم يتم تنفيذ أي طلبية.',
  },
  'success.restart': { en: 'Start again', ar: 'ابدأ من جديد' },
  'success.browse': { en: 'Browse Global Medal', ar: 'تصفّح جلوبال ميدال' },
  'success.valueTitle': { en: 'What this could change', ar: 'ما الذي يمكن أن يتغير' },
  'success.v1': { en: 'Easier product discovery for first-time buyers', ar: 'اكتشاف أسهل للمنتجات لدى العملاء الجدد' },
  'success.v2': { en: 'Better-qualified, more structured inquiries', ar: 'استفسارات أوضح وأكثر تنظيماً' },
  'success.v3': { en: 'Customisation details captured up front', ar: 'جمع تفاصيل التخصيص من البداية' },
  'success.v4': { en: 'A smoother path from website to WhatsApp', ar: 'انتقال أسلس من الموقع إلى واتساب' },
  'success.v5': { en: 'Less back-and-forth on bulk orders', ar: 'مراسلات أقل في الطلبات الكبيرة' },
  'success.v6': { en: 'A more personal experience for the customer', ar: 'تجربة أكثر خصوصية للعميل' },
  'success.valueNote': {
    en: 'Potential benefits of the concept — not measured results.',
    ar: 'فوائد محتملة للفكرة، وليست نتائج مقاسة.',
  },

  /* ------------------------------- expert ------------------------------- */
  'expert.title': { en: 'Talk to an expert', ar: 'تحدّث مع مختص' },
  'expert.body': {
    en: 'Global Medal is not only an online store. Their team designs and decorates awards, and can advise on the right format, finish and lead time for your event.',
    ar: 'جلوبال ميدال ليس متجراً إلكترونياً فحسب؛ فريقهم يصمم الجوائز ويزخرفها، ويستطيع إرشادك إلى الشكل والتشطيب والمدة المناسبة لمناسبتك.',
  },
  'expert.point1': { en: 'In-house engraving, printing and logo work', ar: 'النقش والطباعة وتنفيذ الشعارات داخلياً' },
  'expert.point2': { en: 'Showroom in Hawally, Kuwait', ar: 'معرض في حولي، الكويت' },
  'expert.point3': { en: 'Experience with bulk ceremonies since 1980', ar: 'خبرة في حفلات التكريم الكبيرة منذ ١٩٨٠' },
  'expert.cta': { en: 'Send my details to the team', ar: 'أرسل بياناتي للفريق' },
  'expert.back': { en: 'Back to the assistant', ar: 'العودة إلى المرشد' },
  'expert.disclaimer': {
    en: 'Demonstration only — this prototype does not contact anyone.',
    ar: 'للعرض فقط — هذا النموذج لا يتواصل مع أحد.',
  },

  /* ------------------------------- catalog ------------------------------ */
  'catalog.title': { en: 'The Global Medal range', ar: 'مجموعات جلوبال ميدال' },
  'catalog.subtitle': {
    en: 'The demonstration catalogue this assistant matches from.',
    ar: 'كتالوج العرض الذي يعتمد عليه المرشد في الترشيح.',
  },
  'catalog.all': { en: 'All', ar: 'الكل' },
  'catalog.back': { en: 'Back to the assistant', ar: 'العودة إلى المرشد' },
  'catalog.count': { en: '{n} products', ar: '{n} منتجاً' },
};

export function makeT(lang: Lang) {
  return (key: string, vars?: Record<string, string>): string => {
    const entry = strings[key];
    let out = entry ? entry[lang] : key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        out = out.replace(`{${k}}`, v);
      }
    }
    return out;
  };
}

export type T = ReturnType<typeof makeT>;

/** Arabic-Indic digits for Arabic mode, so numbers match the surrounding script. */
export function num(value: number | string, lang: Lang): string {
  const s = String(value);
  if (lang === 'en') return s;
  const map: Record<string, string> = {
    '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
    '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
  };
  return s.replace(/[0-9]/g, (d) => map[d]);
}
