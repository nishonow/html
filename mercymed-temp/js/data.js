const CLINIC = {
  phone: "+996 770 231 813",
  whatsapp: "996770231813",
  email: "medicalcenter@mercymed.kg",
  instagram: "mercymed.kg",
  gis: "https://2gis.kg/bishkek/firm/70000001080819179",
  address: { ru: "ул. Исакеева, 18/15, ЖК «Ала-Тоо»", ky: "Исакеев көч., 18/15, «Ала-Тоо» ТЖК", en: "Isakeeva St. 18/15, Ala-Too complex" },
  addressFull: { ru: "ул. Исакеева, 18/15, блок 3\nЖК «Ала-Тоо», Бишкек", ky: "Исакеев көч., 18/15, 3-блок\n«Ала-Тоо» ТЖК, Бишкек", en: "Isakeeva St. 18/15, block 3\nAla-Too residential complex, Bishkek" },
  hours: { ru: "Открываемся в 09:00", ky: "Саат 09:00дө ачылабыз", en: "Open from 09:00" },
  hoursFull: { ru: "Клиника открывается в 09:00\nЛаборатория: пн–пт 08:00–12:00", ky: "Клиника саат 09:00дө ачылат\nЛаборатория: дш–жм 08:00–12:00", en: "Clinic opens at 09:00\nLaboratory: Mon–Fri 08:00–12:00" },
  price: { ru: "от 1 750 сом", ky: "1 750 сомдон", en: "from 1,750 som" },
};


const SERVICES = [
  {
    id: "pediatrics",
    icon: "baby",
    audience: { ru: "Дети 0–18 лет", ky: "0–18 жаштагы балдар", en: "Children 0–18" },
    price: { ru: "от 1 750 сом", ky: "1 750 сомдон", en: "from 1,750 som" },
    ru: ["Педиатрия", "Осмотры, прививки и лечение детей от рождения до 18 лет."],
    ky: ["Педиатрия", "Төрөлгөндөн 18 жашка чейинки балдарды кароо, эмдөө жана дарылоо."],
    en: ["Pediatrics", "Check-ups, vaccinations and treatment for children from birth to 18."],
  },
  {
    id: "family",
    icon: "users",
    audience: { ru: "Взрослые", ky: "Чоңдор", en: "Adults" },
    price: { ru: "от 1 800 сом", ky: "1 800 сомдон", en: "from 1,800 som" },
    ru: ["Семейная медицина", "Терапевт для взрослых, хронические заболевания и профилактика."],
    ky: ["Үй-бүлөлүк медицина", "Чоңдор үчүн терапевт, өнөкөт оорулар жана алдын алуу."],
    en: ["Family medicine", "Adult therapy, chronic conditions and preventive care."],
  },
  {
    id: "hematology",
    icon: "drop",
    audience: { ru: "Дети", ky: "Балдар", en: "Children" },
    price: { ru: "от 3 500 сом", ky: "3 500 сомдон", en: "from 3,500 som" },
    ru: ["Детская гематология и онкология", "Консультации детского гематолога-онколога, сопровождение вместе со специализированными больницами."],
    ky: ["Балдар гематологиясы жана онкологиясы", "Балдар гематолог-онкологунун консультациясы, адистештирилген ооруканалар менен бирге көзөмөл."],
    en: ["Pediatric hematology & oncology", "Consultations with a pediatric hematologist-oncologist, coordinated with specialised hospitals."],
  },
  {
    id: "pulmonology",
    icon: "lungs",
    audience: { ru: "Взрослые", ky: "Чоңдор", en: "Adults" },
    ru: ["Пульмонология", "Диагностика и лечение астмы, бронхита и других болезней лёгких."],
    ky: ["Пульмонология", "Астма, бронхит жана өпкөнүн башка ооруларын аныктоо жана дарылоо."],
    en: ["Pulmonology", "Diagnosis and treatment of asthma, bronchitis and other lung conditions."],
  },
  {
    id: "obgyn",
    icon: "heart",
    audience: { ru: "Женщины", ky: "Аялдар", en: "Women" },
    ru: ["Акушерство и гинекология", "Ведение беременности, гинекологические консультации и курсы подготовки к родам с сертифицированной доулой."],
    ky: ["Акушердик жана гинекология", "Кош бойлуулукту көзөмөлдөө, гинеколог консультациясы жана тастыкталган доула менен төрөткө даярдоо курстары."],
    en: ["Obstetrics & gynecology", "Pregnancy care, gynecology consultations and birth preparation courses with a certified doula."],
  },
  {
    id: "physio",
    icon: "person",
    audience: { ru: "Дети и взрослые", ky: "Балдар жана чоңдор", en: "Children and adults" },
    price: { ru: "от 2 000 сом", ky: "2 000 сомдон", en: "from 2,000 som" },
    ru: ["Физиотерапия", "Реабилитация для детей и взрослых."],
    ky: ["Физиотерапия", "Балдар жана чоңдор үчүн реабилитация."],
    en: ["Physiotherapy", "Rehabilitation for children and adults."],
  },
  {
    id: "ultrasound",
    icon: "pulse",
    audience: { ru: "Дети и взрослые", ky: "Балдар жана чоңдор", en: "Children and adults" },
    ru: ["УЗИ, ЭКГ и скрининг", "УЗИ, ЭКГ, проверка зрения и аудиометрия на месте."],
    ky: ["УЗИ, ЭКГ жана скрининг", "УЗИ, ЭКГ, көрүүнү текшерүү жана аудиометрия ушул жерде."],
    en: ["Ultrasound, ECG & screening", "Ultrasound, ECG, vision testing and audiometry on site."],
  },
  {
    id: "checkups",
    icon: "shield",
    audience: { ru: "Дети и взрослые", ky: "Балдар жана чоңдор", en: "Children and adults" },
    ru: ["Профилактические осмотры", "Оценка роста и развития, проверка зрения, ЭКГ, скрининг на анемию и диабет, анализы."],
    ky: ["Алдын алуу текшерүүлөрү", "Өсүү жана өнүгүүнү баалоо, көрүүнү текшерүү, ЭКГ, аз кандуулукка жана диабетке скрининг, анализдер."],
    en: ["Preventive check-ups", "Growth and development checks, vision screening, ECG, anemia and diabetes screening, and lab tests."],
  },
  {
    id: "documents",
    icon: "file",
    audience: { ru: "Дети и взрослые", ky: "Балдар жана чоңдор", en: "Children and adults" },
    ru: ["Медицинские справки", "Справки и заключения для школы, перелёта, поездок, работы и страховой."],
    ky: ["Медициналык маалымкаттар", "Мектеп, учуу, саякат, жумуш жана камсыздандыруу үчүн маалымкаттар жана корутундулар."],
    en: ["Medical documents", "Certificates and reports for school, flying, travel, employment and insurance."],
  },
  {
    id: "lab",
    icon: "flask",
    audience: { ru: "Дети и взрослые", ky: "Балдар жана чоңдор", en: "Children and adults" },
    price: { ru: "скидка 30% на все анализы", ky: "бардык анализдерге 30% арзандатуу", en: "30% off all tests" },
    ru: ["Лаборатория", "Лаборатория в клинике вместе с партнёром Express Plus. Анализы с понедельника по пятницу, 08:00–12:00."],
    ky: ["Лаборатория", "Клиникадагы лаборатория, өнөктөшүбүз Express Plus менен. Анализдер дүйшөмбүдөн жумага чейин, 08:00–12:00."],
    en: ["Laboratory", "In-house laboratory with our partner Express Plus. Lab tests Monday to Friday, 08:00–12:00."],
  },
  {
    id: "psychology",
    icon: "chat",
    audience: { ru: "Дети и родители", ky: "Балдар жана ата-энелер", en: "Children and parents" },
    ru: ["Психолог", "Поддержка детей, родителей и всей семьи."],
    ky: ["Психолог", "Балдарга, ата-энелерге жана бүт үй-бүлөгө колдоо."],
    en: ["Psychology", "Support for children, parents and the whole family."],
  },
  {
    id: "home",
    icon: "home",
    audience: { ru: "Дети", ky: "Балдар", en: "Children" },
    ru: ["Выезд на дом", "Врач приедет, если ребёнку тяжело выйти из дома."],
    ky: ["Үйгө чакыруу", "Бала үйдөн чыга албаса, дарыгер өзү келет."],
    en: ["Home visits", "A doctor comes to you when your child is too unwell to travel."],
  },
];

const PLANS = [
  {
    icon: "building",
    ru: ["Компании", "Ежегодные медосмотры сотрудников и справки для трудоустройства — для всей команды сразу."],
    ky: ["Компаниялар", "Кызматкерлерди жыл сайын медициналык кароо жана жумушка орношуу үчүн маалымкаттар — бүт жамаат үчүн."],
    en: ["Companies", "Yearly check-ups for your staff and medical documents for employment, arranged for the whole team."],
  },
  {
    icon: "board",
    ru: ["Школы и вузы", "Осмотры учеников и студентов, справки для школы и предложения для студенческих групп."],
    ky: ["Мектептер жана жогорку окуу жайлар", "Окуучуларды жана студенттерди кароо, мектеп үчүн маалымкаттар жана студенттик топтор үчүн сунуштар."],
    en: ["Schools and universities", "Check-ups for pupils and students, the medical documents schools ask for, and offers for student groups."],
  },
  {
    icon: "globe",
    ru: ["Посольства и международные организации", "Приём на шести языках, заключения и документы для поездок и страховой."],
    ky: ["Элчиликтер жана эл аралык уюмдар", "Алты тилде кабыл алуу, саякат жана камсыздандыруу үчүн корутундулар жана документтер."],
    en: ["Embassies and international organisations", "Care in six languages, with reports and documents for travel and insurance."],
  },
];

const TEAM_IMG = "img/team/";

const DOCTORS = [
  {
    services: ["pediatrics", "hematology"],
    name: { ru: "Лукас Рафаэль Мейер-Ландольт", ky: "Лукас Рафаэль Мейер-Ландольт", en: "Lukas Rafael Meier-Landolt" },
    role: { ru: "Детский гематолог-онколог, педиатр", ky: "Балдар гематолог-онкологу, педиатр", en: "Pediatric hematologist-oncologist, pediatrician" },
    years: 12,
    bio: { ru: "Педиатр из Швейцарии, также консультирует детей с заболеваниями крови и онкологией. Работает в MercyMed больше года, ведёт приём на немецком, французском и английском.", ky: "Швейцариялык педиатр, кан оорулары жана онкологиясы бар балдарга да консультация берет. MercyMed’де бир жылдан ашык иштейт, немис, француз жана англис тилдеринде кабыл алат.", en: "Swiss pediatrician who also sees children with blood disorders and cancer. With MercyMed for over a year, he consults in German, French and English." },
    photo: TEAM_IMG + "lukas.webp",
  },
  {
    services: ["pediatrics"],
    name: { ru: "Нэнси Яу", ky: "Нэнси Яу", en: "Nancy Yau" },
    role: { ru: "Педиатр", ky: "Педиатр", en: "Pediatrician" },
    years: 17,
    bio: { ru: "Педиатр в нашей международной команде. Ведёт приём также на китайском языке.", ky: "Эл аралык командабыздагы педиатр. Кытай тилинде да кабыл алат.", en: "Pediatrician on our international team. She also sees patients in Chinese." },
    photo: TEAM_IMG + "nancy.webp",
  },
  {
    services: ["pediatrics"],
    name: { ru: "Джонатан Уильямс", ky: "Джонатан Уильямс", en: "Jonathan Williams" },
    role: { ru: "Главный врач, педиатр", ky: "Башкы дарыгер, педиатр", en: "Chief doctor, pediatrician" },
    rating: 10, reviews: 6,
    bio: { ru: "Главный врач и педиатр. Больше 10 лет назад вместе с Махабат начал выездные клиники, из которых вырос MercyMed.", ky: "Башкы дарыгер жана педиатр. 10 жылдан ашык мурун Махабат менен бирге көчмө клиникаларды баштаган, MercyMed ошолордон өсүп чыккан.", en: "Chief doctor and pediatrician. Over 10 years ago he and Makhabat started the mobile clinics that MercyMed grew out of." },
    photo: TEAM_IMG + "jonathan.webp",
  },
  {
    services: ["pediatrics", "family"],
    name: { ru: "Ирина Пак", ky: "Ирина Пак", en: "Irina Pak" },
    role: { ru: "Педиатр, терапевт", ky: "Педиатр, терапевт", en: "Pediatrician, therapist" },
    years: 16, rating: 9.5, reviews: 24,
    bio: { ru: "Педиатр и семейный врач из Кыргызстана, принимает детей и взрослых. Давно работает в нашей команде.", ky: "Кыргызстандык педиатр жана үй-бүлөлүк дарыгер, балдарды жана чоңдорду кабыл алат. Командабызда көптөн бери иштейт.", en: "Pediatrician and family doctor from Kyrgyzstan who sees both children and adults. A long-standing member of our team." },
    photo: TEAM_IMG + "irina.webp",
  },
  {
    services: ["pulmonology", "family"],
    name: { ru: "Насыйкат Дононбаева", ky: "Насыйкат Дононбаева", en: "Nasyikat Dononbaeva" },
    role: { ru: "Пульмонолог, терапевт, высшая категория", ky: "Пульмонолог, терапевт, жогорку категория", en: "Pulmonologist, therapist, highest category" },
    years: 13, rating: 9.5, reviews: 2,
    bio: { ru: "Терапевт и пульмонолог из Кыргызстана, лечит взрослых с болезнями лёгких. Давно работает в нашей команде.", ky: "Кыргызстандык терапевт жана пульмонолог, өпкө оорулары бар чоңдорду дарылайт. Командабызда көптөн бери иштейт.", en: "Internal medicine doctor and pulmonologist from Kyrgyzstan, caring for adults with lung conditions. A long-standing member of our team." },
    photo: TEAM_IMG + "nasyikat.webp",
  },
  {
    services: ["obgyn"],
    name: { ru: "Сымбат Садырбаева", ky: "Сымбат Садырбаева", en: "Symbat Sadyrbaeva" },
    role: { ru: "Акушер-гинеколог", ky: "Акушер-гинеколог", en: "Obstetrician-gynecologist" },
    years: 6, rating: 9, reviews: 2,
    bio: { ru: "Гинеколог из Кыргызстана. Принимает женщин на консультации и ведёт беременность.", ky: "Кыргызстандык гинеколог. Аялдарды консультацияга кабыл алат жана кош бойлуулукту көзөмөлдөйт.", en: "Gynecologist from Kyrgyzstan. She sees women for consultations and pregnancy care." },
    photo: TEAM_IMG + "symbat.webp",
  },
  {
    services: ["obgyn"],
    name: { ru: "Махабат Алиева", ky: "Махабат Алиева", en: "Makhabat Alieva" },
    role: { ru: "Директор, доула", ky: "Директор, доула", en: "Director, doula" },
    years: 24, rating: 10, reviews: 1,
    bio: { ru: "Медсестра, директор и сертифицированная доула. Вместе с Джонатаном начала выездные клиники и проводит курсы подготовки к родам.", ky: "Медайым, директор жана тастыкталган доула. Джонатан менен бирге көчмө клиникаларды баштаган жана төрөткө даярдоо курстарын өткөрөт.", en: "Nurse, director and certified doula. She started the mobile clinics with Jonathan and runs our birth preparation courses." },
    photo: TEAM_IMG + "makhabat.webp",
  },
  {
    services: ["pediatrics"],
    name: { ru: "Набат Гасымова", ky: "Набат Гасымова", en: "Nabat Gasymova" },
    role: { ru: "Детский анестезиолог-реаниматолог, педиатр", ky: "Балдар анестезиолог-реаниматологу, педиатр", en: "Pediatric anesthesiologist, pediatrician" },
    years: 4, rating: 10, reviews: 1,
    bio: { ru: "Педиатр и врач интенсивной терапии из Кыргызстана. Давно работает в нашей команде.", ky: "Кыргызстандык педиатр жана интенсивдүү терапия дарыгери. Командабызда көптөн бери иштейт.", en: "Pediatrician and intensive care doctor from Kyrgyzstan. A long-standing member of our team." },
    photo: TEAM_IMG + "nabat.webp",
  },
  {
    services: ["physio"],
    name: { ru: "Мэдисон Смит", ky: "Мэдисон Смит", en: "Madison Smith" },
    role: { ru: "Физиотерапевт", ky: "Физиотерапевт", en: "Physical therapist" },
    bio: { ru: "Физиотерапевт в нашей международной команде. Помогает пациентам восстановить движение и силу.", ky: "Эл аралык командабыздагы физиотерапевт. Бейтаптарга кыймылды жана күчтү калыбына келтирүүгө жардам берет.", en: "Physical therapist on our international team. She helps patients regain movement and strength." },
    photo: TEAM_IMG + "madison.webp",
  },
  {
    services: ["ultrasound"],
    name: { ru: "Наргиза Исламова", ky: "Наргиза Исламова", en: "Nargiza Islamova" },
    role: { ru: "Врач УЗИ", ky: "УЗИ дарыгери", en: "Ultrasound" },
    bio: { ru: "Врач УЗИ из Кыргызстана. Проводит УЗИ в клинике по направлению врача.", ky: "Кыргызстандык УЗИ дарыгери. Дарыгердин жолдомосу менен клиникада УЗИ жасайт.", en: "Ultrasound specialist from Kyrgyzstan. She does ultrasound scans at the clinic after a doctor’s referral." },
  },
];

const LUKAS = DOCTORS[0];

const NEWS = [
  {
    id: "hematology",
    date: "2026-10-20",
    image: LUKAS.photo,
    ru: ["Детская гематология и онкология в MercyMed", "Лукас Рафаэль Мейер-Ландольт консультирует детей с заболеваниями крови и онкологией — вместе со специализированными больницами."],
    ky: ["MercyMed'де балдар гематологиясы жана онкологиясы", "Лукас Рафаэль Мейер-Ландольт кан оорулары жана онкологиясы бар балдарга адистештирилген ооруканалар менен бирге консультация берет."],
    en: ["Pediatric hematology and oncology at MercyMed", "Lukas Rafael Meier-Landolt consults children with blood disorders and cancer, together with specialised hospitals."],
  },
  {
    id: "lab-discount",
    date: "2026-10-10",
    icon: "flask",
    ru: ["Скидка 30% на все анализы", "Лаборатория в клинике работает вместе с Express Plus: скидка 30% на все анализы. Сдать можно с понедельника по пятницу, 08:00–12:00."],
    ky: ["Бардык анализдерге 30% арзандатуу", "Клиникадагы лаборатория Express Plus менен бирге иштейт: бардык анализдерге 30% арзандатуу. Дүйшөмбүдөн жумага чейин, 08:00–12:00 тапшырсаңыз болот."],
    en: ["30% off all lab tests", "Our in-house laboratory works with Express Plus: 30% off all tests. Open Monday to Friday, 08:00–12:00."],
  },
  {
    id: "whatsapp-booking",
    date: "2026-10-01",
    icon: "chat",
    ru: ["Запись через WhatsApp", "Заполните четыре поля на сайте — WhatsApp откроется с готовым сообщением администратору."],
    ky: ["WhatsApp аркылуу жазылуу", "Сайтта төрт талааны толтуруңуз — WhatsApp администраторго даяр билдирүү менен ачылат."],
    en: ["Book through WhatsApp", "Fill in four fields on the site and WhatsApp opens with a ready message to our administrator."],
  },
];

const PROMO = {
  enabled: true,
  link: "#news/lab-discount",
  ru: ["Скидка 30% на все анализы в лаборатории клиники.", "Подробнее"],
  ky: ["Клиниканын лабораториясында бардык анализдерге 30% арзандатуу.", "Толугураак"],
  en: ["30% off all lab tests at our in-house laboratory.", "Details"],
};

const DEFAULT_DATA = { clinic: CLINIC, services: SERVICES, plans: PLANS, doctors: DOCTORS, news: NEWS, promo: PROMO };
