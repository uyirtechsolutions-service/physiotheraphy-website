import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import Map from "@/components/Map";
import Faq from "@/components/Faq";
import ServiceCard from "@/components/ServiceCard";
import { heroImage, whyUsImage, servicesImage } from "@/lib/images";
import { clinic, services, stats, testimonials, values } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesSection />
      <WhyUs />
      <HowItWorks />
      <FaqSection />
      <Testimonials />
      <CTA />
      <LocationSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden">
      <Image
        src={heroImage}
        alt="Physiotherapy rehabilitation session"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-900/40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            <Icon name="check-circle" className="h-4 w-4 text-brand-300" />
            {clinic.tagline}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Recover. Strengthen. <span className="text-brand-300">Perform.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-brand-100">
            Expert care. Personalised recovery. Stronger you, every day.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50"
            >
              <Icon name="calendar" className="h-5 w-5" />
              Book an appointment
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore services
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="h-4 w-4 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-brand-100">
              <span className="font-semibold text-white">4.9/5</span> rated by 800+ patients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-xl ring-1 ring-slate-100 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 text-center sm:p-8">
            <p className="text-3xl font-extrabold text-brand-600 sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our services</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Specialised Services
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Comprehensive, evidence-based physiotherapy and rehabilitation for every stage of life.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View all services
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const expectations = [
    "A thorough assessment of your condition and medical history",
    "A clear diagnosis and explanation of what&apos;s causing your pain",
    "A personalized treatment plan with realistic milestones",
    "Home exercises and advice to accelerate your recovery",
  ];
  return (
    <section className="relative overflow-hidden py-20 text-white">
      <Image
        src={whyUsImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-950/90" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">Why The Origin</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Care that puts your recovery first
            </h2>
            <p className="mt-4 text-brand-100">
              We treat the whole person, not just the injury. Every plan is built around you — your goals,
              your lifestyle and your pace.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800 text-brand-200">
                    <Icon name={v.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-brand-200">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            
            <div className="rounded-3xl bg-brand-900 p-8 ring-1 ring-brand-800">
              <h3 className="text-lg font-semibold">What to expect on your first visit</h3>
              <ul className="mt-6 space-y-4">
                {expectations.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="check-circle" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                    <span className="text-sm text-brand-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "calendar", title: "Book online", text: "Choose a service, therapist and a time that suits you in under a minute." },
    { icon: "user", title: "Get assessed", text: "Meet your therapist for a thorough assessment and a personalized plan." },
    { icon: "activity", title: "Recover & thrive", text: "Follow your plan with ongoing support until you're back to your best." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">How it works</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Three simple steps
        </h2>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
              Step {i + 1}
            </span>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon name={step.icon} className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-slate-600">Everything you need to know before your visit.</p>
        </div>
        <div className="mt-10">
          <Faq />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Testimonials</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What our patients say
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-slate-200 bg-white p-8">
              <Icon name="quote" className="h-8 w-8 text-brand-200" />
              <blockquote className="mt-4 text-slate-700">{t.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4 text-amber-400" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl px-6 py-20 text-center text-white sm:px-16">
        <Image
          src={servicesImage}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700/95 to-brand-900/95" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start your recovery?</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Book your appointment online in minutes, or call us and we&apos;ll find the right therapist for
            you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Book an appointment
            </Link>
            <a
              href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Icon name="phone" className="h-4 w-4" />
              {clinic.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Find us</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Visit our clinic
        </h2>
        <p className="mt-3 text-slate-600">📍 {clinic.address}</p>
      </div>
      <div className="mt-8">
        <Map />
      </div>
    </section>
  );
}
