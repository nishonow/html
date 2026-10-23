const CLINIC = {
  name: "MercyMed",
  phone: "+996 770 231 813",
  phoneRaw: "996770231813",
  whatsapp: "996770231813",
  email: "medicalcenter@mercymed.kg",
  instagram: "mercymed.kg",
  address: "Isakeeva St. 18/15, block 3, Ala-Too residential complex, Bishkek",
  mapQuery: "MercyMed Isakeeva 18 Bishkek",
  portalUrl: "#",
};

const SERVICES = [
  { icon: "baby", title: "General Pediatrics", text: "Check-ups, vaccinations and sick visits for newborns to teens, with pediatricians trained in the USA and Kyrgyzstan." },
  { icon: "home", title: "Family Medicine", text: "One clinic for the whole family: adult therapy, chronic conditions, referrals and preventive care." },
  { icon: "drop", title: "Pediatric Oncology & Hematology", text: "Consultations with a pediatric hematologist-oncologist for children with blood disorders and cancer, coordinated with specialised hospitals." },
  { icon: "lungs", title: "Pulmonology", text: "Diagnosis and treatment of asthma, bronchitis and other lung conditions in adults." },
  { icon: "wave", title: "Ultrasound Diagnostics", text: "Ultrasound of internal organs for children and adults, with results explained on the same day." },
  { icon: "pulse", title: "ECG & Laboratory", text: "Electrocardiography and lab tests on site (lab open Mon–Fri 08:00–12:00), so you get answers without going to several places." },
  { icon: "hand", title: "Physical Therapy", text: "Rehabilitation and physiotherapy for children and adults, led by a highest-category specialist." },
  { icon: "heart", title: "Women's Health & Doula", text: "Obstetrics-gynecology consultations and doula support before, during and after birth." },
  { icon: "chat", title: "Psychology", text: "Support for children, parents and families from a psychologist who works alongside our doctors." },
  { icon: "car", title: "Home Visits", text: "A doctor comes to you when your child is too unwell to travel." },
];

const DOCTORS = [
  { name: "Lukas Rafael Meier-Landolt", role: "Pediatric Hematologist, Oncologist & Pediatrician", years: 12, tags: ["Hematology", "Oncology", "Pediatrics"], photo: "" },
  { name: "Nancy Yau", role: "Pediatrician (USA)", years: 17, tags: ["Pediatrics", "English"], photo: "" },
  { name: "Jonathan Williams", role: "Pediatrician", years: null, tags: ["Pediatrics"], photo: "" },
  { name: "Irina Pak", role: "Pediatrician & Therapist", years: 16, tags: ["Pediatrics", "Adults"], photo: "" },
  { name: "Nasyikat Dononbaeva", role: "Pulmonologist & Therapist, highest category", years: 13, tags: ["Pulmonology", "Adults"], photo: "" },
  { name: "Symbat Sadyrbaeva", role: "Obstetrician-Gynecologist", years: 6, tags: ["Women's health"], photo: "" },
  { name: "Makhabat Alieva", role: "Physiotherapist", years: 24, tags: ["Rehabilitation"], photo: "" },
  { name: "Nabat Gasymova", role: "Pediatric Anesthesiologist & Pediatrician", years: 4, tags: ["Pediatrics", "Intensive care"], photo: "" },
];

const PLANS = [
  { name: "Individual", text: "Year-round care for one person: scheduled check-ups, priority booking and a doctor who knows your history." },
  { name: "Family", text: "One plan for parents and children, covering pediatric visits, family medicine and home visits.", featured: true },
  { name: "Corporate", text: "Plans for companies and their employees' families: pre-employment check-ups, annual screenings and one invoice." },
];

const INSTAGRAM = Array.from({ length: 6 }, (_, i) => ({ url: `https://instagram.com/${CLINIC.instagram}`, image: "", alt: `MercyMed Instagram post ${i + 1}` }));
