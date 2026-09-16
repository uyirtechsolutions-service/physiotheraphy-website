import type { StaticImageData } from "next/image";
import {
  contactImage,
  whyUsImage,
  servicesImage,
  rehabExerciseImage,
  careTeamImage,
  neurologicalRehabilitationImage,
  orthopedicRehabilitationImage,
  painManagementImage,
  serviceLogoPain,
  serviceLogoOrthopedic,
  serviceLogoNeurological,
  serviceLogoGeriatric,
  serviceLogoWomensHealth,
  serviceLogoPregnancy,
  serviceLogoOnline,
} from "./images";

export type Service = {
  id: string;
  title: string;
  description: string;
  items?: string[];
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
  address: "2nd Cross, SRP Nagar, Saibaba Colony, Coimbatore",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=The%20Origin%20Physiotherapy%2C%202nd%20Cross%2C%20SRP%20Nagar%2C%20Saibaba%20Colony%2C%20Coimbatore",
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
      "We help manage and reduce pain related to muscles, joints, spine and other musculoskeletal conditions.",
    items: [
      "Back and neck pain",
      "Knee pain",
      "Shoulder pain",
      "Joint pain and stiffness",
      "Muscle injuries",
      "Sports-related pain",
      "Postural problems",
    ],
    icon: "zap",
    image: painManagementImage,
    logo: serviceLogoPain,
  },
  {
    id: "orthopedic-rehab",
    title: "Orthopedic Rehabilitation",
    description:
      "Our orthopedic rehabilitation programs are designed to restore mobility, strength and function following injuries, surgeries and orthopedic conditions.",
    items: [
      "Post-operative rehabilitation",
      "Fracture rehabilitation",
      "Joint replacement rehabilitation",
      "Ligament and muscle injuries",
      "Arthritis management",
      "Sports injury rehabilitation",
      "Strength and mobility training",
    ],
    icon: "bone",
    image: orthopedicRehabilitationImage,
    logo: serviceLogoOrthopedic,
  },
  {
    id: "neurological-rehab",
    title: "Neurological Rehabilitation",
    description:
      "We provide individualized rehabilitation to improve movement, balance, coordination and functional independence in people with neurological conditions.",
    items: [
      "Stroke",
      "Paralysis",
      "Balance and coordination problems",
      "Neurological weakness",
      "Mobility difficulties",
      "Functional movement limitations",
    ],
    icon: "sparkles",
    image: neurologicalRehabilitationImage,
    logo: serviceLogoNeurological,
  },
  {
    id: "geriatric-rehab",
    title: "Geriatric Rehabilitation",
    description:
      "Our geriatric physiotherapy programs help older adults maintain mobility, strength, balance and independence.",
    items: [
      "Fall prevention",
      "Balance training",
      "Strengthening exercises",
      "Walking and mobility training",
      "Joint stiffness management",
      "Post-operative recovery",
      "Improving independence in daily activities",
    ],
    icon: "users",
    image: careTeamImage,
    logo: serviceLogoGeriatric,
  },
  {
    id: "womens-health",
    title: "Women's Physiotherapy",
    description:
      "Specialized physiotherapy can help women manage physical changes and musculoskeletal problems associated with different stages of life.",
    items: [
      "Pregnancy-related musculoskeletal problems",
      "Back and pelvic pain",
      "Postural changes",
      "Strength and mobility training",
      "Recovery after childbirth",
      "Functional rehabilitation",
    ],
    icon: "heart",
    image: whyUsImage,
    logo: serviceLogoWomensHealth,
  },
  {
    id: "pre-post-pregnancy",
    title: "Pregnancy & Post-Pregnancy Rehabilitation",
    description:
      "Physiotherapy can help women safely manage physical changes during pregnancy and regain strength and function after childbirth.",
    items: [
      "Pregnancy-related back and pelvic pain management",
      "Postural correction",
      "Mobility exercises",
      "Safe strengthening",
      "Breathing and relaxation exercises",
      "Post-pregnancy strengthening",
      "Functional recovery",
    ],
    icon: "baby",
    image: servicesImage,
    logo: serviceLogoPregnancy,
  },
  {
    id: "supportive-care",
    title: "Rehabilitation & Supportive Care",
    description:
      "We provide supportive physiotherapy and rehabilitation focused on maintaining mobility, strength and quality of life for individuals experiencing long-term physical challenges. Treatment is customized according to the person's condition, functional ability and goals.",
    icon: "shield",
    image: rehabExerciseImage,
  },
  {
    id: "online-consultation",
    title: "Online Physiotherapy Consultation",
    description:
      "Get professional physiotherapy guidance from the comfort of your home through online consultation.",
    items: [
      "Exercise guidance",
      "Pain-management advice",
      "Posture assessment",
      "Home exercise programs",
      "Rehabilitation follow-up",
      "Progress monitoring",
    ],
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
  { value: "8", label: "Specialised services" },
];

export const values = [
  {
    title: "Personalized Care",
    description: "Every patient receives an individualized assessment and treatment plan.",
    icon: "user",
  },
  {
    title: "Goal-Oriented Rehabilitation",
    description: "We focus on meaningful functional goals — not just temporary pain relief.",
    icon: "check-circle",
  },
  {
    title: "Evidence-Based Approach",
    description: "Our treatment combines physiotherapy techniques, therapeutic exercises and progressive rehabilitation.",
    icon: "award",
  },
  {
    title: "Patient-Centered Care",
    description: "We work together with you throughout your recovery journey.",
    icon: "heart",
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
