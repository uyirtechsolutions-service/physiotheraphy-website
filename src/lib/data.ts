import type { StaticImageData } from "next/image";
import {
  aboutStoryImage,
  aboutClinicImage,
  contactImage,
  whyUsImage,
  servicesImage,
  rehabExerciseImage,
  careTeamImage,
  homeVisitImage,
  neurologicalRehabilitationImage,
  orthopedicRehabilitationImage,
  painManagementImage,
  serviceLogoPain,
  serviceLogoOrthopedic,
  serviceLogoNeurological,
  serviceLogoGeriatric,
  serviceLogoWomensHealth,
  serviceLogoPregnancy,
  serviceLogoPelvicFloor,
  serviceLogoOnline,
} from "./images";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: StaticImageData;
  logo?: StaticImageData;
};

export type Therapist = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: number;
  rating: number;
  initials: string;
};

export const clinic = {
  name: "The Origin",
  tagline: "Physiotherapy & Rehabilitation",
  phone: "+91 81228 86662",
  whatsapp: "918122886662",
  email: "theorigin.physios@gmail.com",
  address: "Saibaba Colony, Coimbatore, Tamil Nadu, India",
  mapsUrl: "https://maps.google.com/maps?q=11.0253336%2C76.9444102&z=17&hl=en",
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
};

export const services: Service[] = [
  {
    id: "pain-management",
    title: "Pain Management",
    description:
      "Targeted relief for chronic and acute pain through manual therapy, modalities and therapeutic exercise.",
    icon: "zap",
    image: painManagementImage,
    logo: serviceLogoPain,
  },
  {
    id: "orthopedic-rehab",
    title: "Orthopedic Rehabilitation",
    description:
      "Recovery for fractures, joint replacements and musculoskeletal injuries to restore strength and mobility.",
    icon: "bone",
    image: orthopedicRehabilitationImage,
    logo: serviceLogoOrthopedic,
  },
  {
    id: "neurological-rehab",
    title: "Neurological Rehabilitation",
    description:
      "Specialized therapy for stroke, Parkinson's and spinal cord injuries to rebuild function and independence.",
    icon: "sparkles",
    image: neurologicalRehabilitationImage,
    logo: serviceLogoNeurological,
  },
  {
    id: "geriatric-rehab",
    title: "Geriatric Rehabilitation",
    description:
      "Gentle, safe programs for older adults to improve balance, prevent falls and maintain independence.",
    icon: "users",
    image: careTeamImage,
    logo: serviceLogoGeriatric,
  },
  {
    id: "womens-health",
    title: "Women's Health",
    description:
      "Holistic physiotherapy for women at every stage of life, from adolescence to menopause.",
    icon: "heart",
    image: whyUsImage,
    logo: serviceLogoWomensHealth,
  },
  {
    id: "pre-post-pregnancy",
    title: "Pre & Post Pregnancy Rehabilitation",
    description:
      "Supportive care through pregnancy and post-partum to manage pain, restore core strength and aid recovery.",
    icon: "baby",
    image: servicesImage,
    logo: serviceLogoPregnancy,
  },
  {
    id: "pelvic-floor",
    title: "Pelvic Floor Rehabilitation",
    description:
      "Specialized treatment for pelvic floor dysfunction, incontinence and post-natal recovery.",
    icon: "activity",
    image: careTeamImage,
    logo: serviceLogoPelvicFloor,
  },
  {
    id: "pulmonary-rehab",
    title: "Pulmonary Rehabilitation",
    description:
      "Breathing exercises and conditioning to improve lung function and endurance for respiratory conditions.",
    icon: "lungs",
    image: rehabExerciseImage,
  },
  {
    id: "home-visit",
    title: "Home Visit",
    description:
      "Convenient physiotherapy in the comfort of your home, ideal for limited mobility or busy schedules.",
    icon: "home",
    image: homeVisitImage,
  },
  {
    id: "online-consultation",
    title: "Online Consultation",
    description:
      "Video consultations and guided exercise programs with a physiotherapist from anywhere.",
    icon: "video",
    image: contactImage,
    logo: serviceLogoOnline,
  },
];

export const therapists: Therapist[] = [
  {
    id: "jayashree",
    name: "Dr. Jayashree PT",
    title: "Physiotherapist",
    specialty: "Women's Health & Pelvic Floor",
    experience: 10,
    rating: 4.9,
    initials: "JS",
  },
  {
    id: "udhayakumar",
    name: "Dr. Udhayakumar PT",
    title: "Physiotherapist",
    specialty: "Orthopedic & Neurological Rehab",
    experience: 12,
    rating: 4.8,
    initials: "UK",
  },
];

export const timeSlots = [
  "09:00 AM",
  "09:45 AM",
  "10:30 AM",
  "11:15 AM",
  "12:00 PM",
  "01:00 PM",
  "01:45 PM",
  "02:30 PM",
  "03:15 PM",
  "04:00 PM",
  "04:45 PM",
  "05:30 PM",
  "06:15 PM",
  "07:00 PM",
  "07:45 PM",
];

export const testimonials = [
  {
    name: "Marcus Rivera",
    role: "Amateur Footballer",
    rating: 5,
    text: "After my ACL surgery I thought I'd never play again. Six months with the team and I'm back on the pitch, stronger than ever.",
  },
  {
    name: "Priya Shah",
    role: "Office Worker",
    rating: 5,
    text: "The manual therapy sessions completely resolved my chronic back pain. I can finally sleep through the night without discomfort.",
  },
  {
    name: "Elena Volkov",
    role: "Post-Surgery Patient",
    rating: 5,
    text: "Professional, caring and truly personalized. Every single session felt tailored to my recovery goals.",
  },
  {
    name: "David Turner",
    role: "Parent",
    rating: 5,
    text: "They treated my son's sports injury with so much patience and expertise. The progress was remarkable. Highly recommend.",
  },
];

export const stats = [
  { value: "12+", label: "Years of experience" },
  { value: "5,000+", label: "Patients treated" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "10", label: "Specialised services" },
];

export const values = [
  {
    title: "Personalized Care",
    description: "Every treatment plan is tailored to your body, your goals and your lifestyle — never one-size-fits-all.",
    icon: "user",
  },
  {
    title: "Evidence-Based Practice",
    description: "We combine the latest clinical research with hands-on experience to deliver proven results.",
    icon: "award",
  },
  {
    title: "Compassionate Team",
    description: "Our therapists listen first, then treat. You'll always feel heard, respected and supported.",
    icon: "heart",
  },
  {
    title: "Long-Term Results",
    description: "We don't just relieve symptoms — we fix the root cause and teach you how to stay pain-free.",
    icon: "shield",
  },
];

export const faqs = [
  {
    q: "Do I need a doctor's referral to book an appointment?",
    a: "No referral is required. You can book directly online or via WhatsApp, and our physiotherapist will assess your condition at your first visit.",
  },
  {
    q: "What should I wear to my appointment?",
    a: "Wear loose, comfortable clothing that allows free movement. We also provide changing facilities at the clinic if needed.",
  },
  {
    q: "Do you offer home visits and online consultations?",
    a: "Yes. We provide home visits for patients with limited mobility and video consultations for anyone who can't travel to the clinic.",
  },
  {
    q: "Will the treatment be painful?",
    a: "Physiotherapy is designed to relieve pain, not cause it. We always work within your comfort level and adjust techniques accordingly.",
  },
];
