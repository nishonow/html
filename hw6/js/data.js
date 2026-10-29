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
    ru: ["Акушерство и гинекология", "Ведение беременности, гинекологические консультации и поддержка доулы."],
    ky: ["Акушердик жана гинекология", "Кош бойлуулукту көзөмөлдөө, гинеколог консультациясы жана доуланын колдоосу."],
    en: ["Obstetrics & gynecology", "Pregnancy care, gynecology consultations and doula support."],
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
    ru: ["УЗИ и ЭКГ", "Ультразвуковое исследование органов и электрокардиография на месте."],
    ky: ["УЗИ жана ЭКГ", "Органдарды ультраүн менен изилдөө жана электрокардиография ушул жерде."],
    en: ["Ultrasound & ECG", "Ultrasound of internal organs and electrocardiography on site."],
  },
  {
    id: "lab",
    icon: "flask",
    audience: { ru: "Дети и взрослые", ky: "Балдар жана чоңдор", en: "Children and adults" },
    ru: ["Лаборатория", "Анализы с понедельника по пятницу, 08:00–12:00."],
    ky: ["Лаборатория", "Анализдер дүйшөмбүдөн жумага чейин, 08:00–12:00."],
    en: ["Laboratory", "Lab tests Monday to Friday, 08:00–12:00."],
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
    icon: "user",
    ru: ["Индивидуальная", "Плановые осмотры в течение года, приоритетная запись и врач, который знает вашу историю."],
    ky: ["Жеке", "Жыл бою пландуу текшерүүлөр, артыкчылыктуу жазылуу жана тарыхыңызды билген дарыгер."],
    en: ["Individual", "Scheduled check-ups through the year, priority booking and a doctor who knows your history."],
  },
  {
    icon: "users",
    ru: ["Семейная", "Одна программа для родителей и детей: педиатр, семейный врач и выезды на дом."],
    ky: ["Үй-бүлөлүк", "Ата-эне жана балдар үчүн бир программа: педиатр, үй-бүлөлүк дарыгер жана үйгө чакыруу."],
    en: ["Family", "One plan for parents and children: pediatrician, family doctor and home visits."],
  },
  {
    icon: "building",
    ru: ["Корпоративная", "Для компаний: медосмотры при приёме на работу, ежегодные обследования и один счёт."],
    ky: ["Корпоративдик", "Компаниялар үчүн: жумушка кабыл алуудагы медкароо, жыл сайын текшерүү жана бир эсеп."],
    en: ["Corporate", "For companies: pre-employment check-ups, annual screenings and one invoice."],
  },
];

const ODOCTOR_IMG = "https://thumbor.odoctor.kg/";

const DOCTORS = [
  {
    services: ["pediatrics", "hematology"],
    name: { ru: "Лукас Рафаэль Мейер-Ландольт", ky: "Лукас Рафаэль Мейер-Ландольт", en: "Lukas Rafael Meier-Landolt" },
    role: { ru: "Детский гематолог-онколог, педиатр", ky: "Балдар гематолог-онкологу, педиатр", en: "Pediatric hematologist-oncologist, pediatrician" },
    years: 12,
    photo: ODOCTOR_IMG + "vW1aaKoFf8z9B_6mfEo_KqBW1zo=/200x200/smart/filters:ffr()/media/doctors/lukas-rafael-1784532631.png?_v=2",
  },
  {
    services: ["pediatrics"],
    name: { ru: "Нэнси Яу", ky: "Нэнси Яу", en: "Nancy Yau" },
    role: { ru: "Педиатр", ky: "Педиатр", en: "Pediatrician" },
    years: 17,
    photo: ODOCTOR_IMG + "yQgNvFSPjPJsFBAbQt2S3k5BHi0=/200x200/smart/filters:ffr()/media/doctors/nensi-yau.webp?_v=2",
  },
  {
    services: ["pediatrics"],
    name: { ru: "Джонатан Уильямс", ky: "Джонатан Уильямс", en: "Jonathan Williams" },
    role: { ru: "Главный врач, педиатр", ky: "Башкы дарыгер, педиатр", en: "Chief doctor, pediatrician" },
    rating: 10, reviews: 6,
    photo: ODOCTOR_IMG + "bBwAbhdglcFjRfB5RqBif0Q3k-s=/200x200/smart/filters:ffr()/media/doctors/jonathan-williams.webp?_v=2",
  },
  {
    services: ["pediatrics", "family"],
    name: { ru: "Ирина Пак", ky: "Ирина Пак", en: "Irina Pak" },
    role: { ru: "Педиатр, терапевт", ky: "Педиатр, терапевт", en: "Pediatrician, therapist" },
    years: 16, rating: 9.5, reviews: 24,
    photo: ODOCTOR_IMG + "3gPmo7ZixAhNnhV7GQleNSMcUh0=/200x200/smart/filters:ffr()/media/doctors/pak-irina.webp?_v=2",
  },
  {
    services: ["pulmonology", "family"],
    name: { ru: "Насыйкат Дононбаева", ky: "Насыйкат Дононбаева", en: "Nasyikat Dononbaeva" },
    role: { ru: "Пульмонолог, терапевт, высшая категория", ky: "Пульмонолог, терапевт, жогорку категория", en: "Pulmonologist, therapist, highest category" },
    years: 13, rating: 9.5, reviews: 2,
    photo: ODOCTOR_IMG + "3qquSzqx1PS_CWFUQSnsZR6_LpE=/200x200/smart/filters:ffr()/media/doctors/dononbaeva-nasyykat-1784270254.png?_v=2",
  },
  {
    services: ["obgyn"],
    name: { ru: "Сымбат Садырбаева", ky: "Сымбат Садырбаева", en: "Symbat Sadyrbaeva" },
    role: { ru: "Акушер-гинеколог", ky: "Акушер-гинеколог", en: "Obstetrician-gynecologist" },
    years: 6, rating: 9, reviews: 2,
    photo: ODOCTOR_IMG + "-cOCo0aOFwq0ZBH4uo7Bt7Tb208=/200x200/smart/filters:ffr()/media/doctors/sadyrbaeva-symbat.webp?_v=2",
  },
  {
    services: ["obgyn"],
    name: { ru: "Махабат Алиева", ky: "Махабат Алиева", en: "Makhabat Alieva" },
    role: { ru: "Директор, доула", ky: "Директор, доула", en: "Director, doula" },
    years: 24, rating: 10, reviews: 1,
    photo: ODOCTOR_IMG + "E0hNaS6zzbxv_kl_Qi8UErYxZl4=/200x200/smart/filters:ffr()/media/doctors/aliyeva-makhabat.webp?_v=2",
  },
  {
    services: ["pediatrics"],
    name: { ru: "Набат Гасымова", ky: "Набат Гасымова", en: "Nabat Gasymova" },
    role: { ru: "Детский анестезиолог-реаниматолог, педиатр", ky: "Балдар анестезиолог-реаниматологу, педиатр", en: "Pediatric anesthesiologist, pediatrician" },
    years: 4, rating: 10, reviews: 1,
    photo: ODOCTOR_IMG + "NHP26YuioZ7CBmw1TNVf3WFP5Tk=/200x200/smart/filters:ffr()/media/doctors/gasimova-nabat.webp?_v=2",
  },
  {
    services: ["physio"],
    name: { ru: "Мэдисон Смит", ky: "Мэдисон Смит", en: "Madison Smith" },
    role: { ru: "Физиотерапевт", ky: "Физиотерапевт", en: "Physical therapist" },
  },
  {
    services: ["ultrasound"],
    name: { ru: "Наргиза Исламова", ky: "Наргиза Исламова", en: "Nargiza Islamova" },
    role: { ru: "Врач УЗИ", ky: "УЗИ дарыгери", en: "Ultrasound" },
  },
];

const LUKAS = DOCTORS[0];

const NEWS = [
  {
    id: "new-hematologist",
    date: "2026-10-20",
    image: LUKAS.photo,
    ru: ["В команде детский гематолог-онколог", "К нам присоединился Лукас Рафаэль Мейер-Ландольт, стаж 12 лет. Консультирует детей с заболеваниями крови и онкологией."],
    ky: ["Командада балдар гематолог-онкологу", "Бизге 12 жылдык тажрыйбасы бар Лукас Рафаэль Мейер-Ландольт кошулду. Кан оорулары жана онкологиясы бар балдарга консультация берет."],
    en: ["A pediatric hematologist-oncologist joins the team", "Lukas Rafael Meier-Landolt, with 12 years of experience, now consults children with blood disorders and cancer."],
  },
  {
    id: "lab-hours",
    date: "2026-10-10",
    icon: "flask",
    ru: ["Лаборатория на месте", "Анализы можно сдать прямо в клинике с понедельника по пятницу, 08:00–12:00."],
    ky: ["Лаборатория ушул жерде", "Анализдерди клиниканын өзүндө дүйшөмбүдөн жумага чейин, 08:00–12:00 тапшырсаңыз болот."],
    en: ["On-site laboratory", "Lab tests can be taken right at the clinic, Monday to Friday, 08:00–12:00."],
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
  showEvery: "session",
  delay: 1200,
  image: LUKAS.photo,
  ru: ["Новый врач в MercyMed", "Детский гематолог-онколог Лукас Рафаэль Мейер-Ландольт, стаж 12 лет. Консультации для детей с заболеваниями крови.", "Записаться к врачу", "Здравствуйте! Хочу записаться на приём к врачу: Лукас Рафаэль Мейер-Ландольт."],
  ky: ["MercyMed'де жаңы дарыгер", "Балдар гематолог-онкологу Лукас Рафаэль Мейер-Ландольт, 12 жылдык тажрыйба. Кан оорулары бар балдар үчүн консультациялар.", "Дарыгерге жазылуу", "Саламатсызбы! Дарыгерге кабыл алууга жазылгым келет: Лукас Рафаэль Мейер-Ландольт."],
  en: ["New doctor at MercyMed", "Pediatric hematologist-oncologist Lukas Rafael Meier-Landolt, 12 years of experience. Consultations for children with blood disorders.", "Book this doctor", "Hello! I would like to book an appointment with Lukas Rafael Meier-Landolt."],
};

const DEFAULT_DATA = { clinic: CLINIC, services: SERVICES, plans: PLANS, doctors: DOCTORS, news: NEWS, promo: PROMO };
