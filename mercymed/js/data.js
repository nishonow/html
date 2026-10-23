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
  { icon: "brain", title: "Pediatric Neurology & Epileptology", text: "Diagnosis and long-term follow-up of seizures, developmental delays and other neurological conditions in children." },
  { icon: "drop", title: "Pediatric Oncology & Hematology", text: "Consultations and supportive care for children with blood disorders and cancer, coordinated with specialised hospitals." },
  { icon: "wave", title: "Ultrasound Diagnostics", text: "Ultrasound of internal organs for children and adults, with results explained on the same day." },
  { icon: "pulse", title: "ECG & Diagnostics", text: "Electrocardiography and basic diagnostics, so you get answers without going to several places." },
  { icon: "hand", title: "Physical Therapy", text: "Rehabilitation and physiotherapy for children and adults, led by a highest-category specialist." },
  { icon: "heart", title: "Women's Health & Doula", text: "Obstetrics-gynecology consultations and doula support before, during and after birth." },
  { icon: "chat", title: "Psychology", text: "Support for children, parents and families from a psychologist who works alongside our doctors." },
  { icon: "car", title: "Home Visits", text: "A doctor comes to you when your child is too unwell to travel." },
];

const DOCTORS = [
  { name: "Nancy Yau", role: "Pediatrician (USA)", years: 17, tags: ["Pediatrics", "English"], photo: "" },
  { name: "Irina Pak", role: "Pediatrician & Therapist", years: 16, tags: ["Pediatrics", "Adults"], photo: "" },
  { name: "Aiza Upaeva", role: "Pediatric Neurologist, Epileptologist", years: 10, tags: ["Neurology", "Epilepsy"], photo: "" },
  { name: "Makhabat Alieva", role: "Physiotherapist, highest category", years: 24, tags: ["Rehabilitation"], photo: "" },
  { name: "Sanzharbek Zheenbekov", role: "Ultrasound Doctor", years: 7, tags: ["Ultrasound"], photo: "" },
  { name: "Nabat Gasymova", role: "Pediatric Anesthesiologist & Pediatrician", years: 4, tags: ["Pediatrics", "Intensive care"], photo: "" },
];

const PLANS = [
  { name: "Individual", text: "Year-round care for one person: scheduled check-ups, priority booking and a doctor who knows your history." },
  { name: "Family", text: "One plan for parents and children, covering pediatric visits, family medicine and home visits.", featured: true },
  { name: "Corporate", text: "Plans for companies and their employees' families: pre-employment check-ups, annual screenings and one invoice." },
];

const INSTAGRAM = Array.from({ length: 6 }, (_, i) => ({ url: `https://instagram.com/${CLINIC.instagram}`, image: "", alt: `MercyMed Instagram post ${i + 1}` }));
