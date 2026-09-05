import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import Map from "@/components/Map";
import Faq from "@/components/Faq";
import ServiceCard from "@/components/ServiceCard";
import StatsExp from "@/components/StatsExp";
import { homeReferenceImage, aboutUsImage, servicesImage } from "@/lib/images";
import { clinic, services, testimonials, values } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <StatsExp/>
      <ServicesSection />
      <WhyUs />
      
      <Testimonials />
      <FaqSection />
      <CTA />
      <LocationSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-50 text-brand-800">
      <Image
        src={homeReferenceImage}
        alt="The Origin Physiotherapy clinic"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-brand-50/5" />
      <div className="relative min-h-[680px] lg:min-h-[520px]">
        <div className="relative flex min-h-[680px] items-center px-6 py-16 sm:px-12 lg:min-h-[520px] lg:px-[max(4rem,calc((100vw-1400px)/2+4rem))] lg:py-8">
          <div className="relative z-10 max-w-[540px] animate-fade-up">
            <span className="inline-flex items-center gap-3 rounded-full border border-brand-700/50 bg-brand-50/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-brand-50">
                <Icon name="user" className="h-4 w-4 text-brand-50" />
              </span>
              {clinic.tagline}
            </span>
            <h1 className="mt-5 text-6xl leading-[0.94] tracking-tight text-brand-800 sm:text-7xl lg:text-[4.25rem]">
              Recover.
              <br />
              <span className="text-brand-800">Strengthen.</span>
              <br />
              Perform.
            </h1>
            <span className="mt-5 block h-0.5 w-14 bg-brand-700" />
            <p className="mt-4 max-w-lg text-base leading-7 text-brand-700 sm:text-lg">
              Expert care. Personalised recovery.
              <br />
              Stronger you, every day.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-800 px-6 py-3.5 text-sm font-semibold text-brand-50 shadow-lg transition-colors hover:bg-brand-700"
              >
                <Icon name="calendar" className="h-5 w-5" />
                Book an appointment
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-brand-500/70 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
              >
                Explore services
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-5 w-5 text-[#c89b2c]" />
                ))}
              </div>
              <p className="text-sm text-brand-700">
                <span className="mr-2 text-lg font-bold text-brand-800">4.9/5</span> rated by 100+ patients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const benefits = [
    { icon: "user", title: "Expert Therapists", text: "Highly qualified and experienced professionals." },
    { icon: "heart", title: "Personalised Care", text: "Tailored treatment plans just for you." },
    { icon: "shield", title: "Advanced Techniques", text: "Evidence-based therapies for faster recovery." },
    { icon: "arrow-right", title: "Proven Results", text: "Helping you move better, feel better, live better." },
  ];

  return (
    <section className="relative z-10 mx-auto -mt-24 max-w-[1400px] px-4 sm:px-8 lg:-mt-6 lg:px-12">
      <div className="grid overflow-hidden rounded-xl bg-brand-50/95 shadow-xl ring-1 ring-brand-100 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div key={benefit.title} className={`flex items-center gap-4 px-6 py-6 lg:px-7 lg:py-5 ${index > 0 ? "border-t border-brand-200/70 sm:border-l sm:border-t-0" : ""}`}>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
              <Icon name={benefit.icon} className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-base font-bold text-brand-800">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-700">{benefit.text}</p>
            </div>
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
  return (
    <section className="relative isolate overflow-hidden py-24 text-brand-800 sm:py-28">
      <Image
        src={aboutUsImage}
        alt="The Origin Physiotherapy clinic"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Why choose The Origin</p>
          <h2 className="mt-3 max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl">
            A more personal path to recovery
          </h2>
          {/* <p className="mt-5 max-w-2xl text-base leading-7 text-brand-700 sm:text-lg">
            From your first assessment to your final session, your care is shaped around the way you move,
            live and want to feel.
          </p> */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-brand-200/80 bg-brand-50/95 p-5 shadow-lg shadow-brand-900/10 backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-800 text-brand-50">
                  <Icon name={v.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm leading-6 text-brand-700">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// function HowItWorks() {
//   const steps = [
//     { icon: "calendar", title: "Book online", text: "Choose a service and a date that suits you in under a minute." },
//     { icon: "user", title: "Get assessed", text: "Meet your therapist for a thorough assessment and a personalized plan." },
//     { icon: "activity", title: "Recover & thrive", text: "Follow your plan with ongoing support until you're back to your best." },
//   ];
//   return (
//     <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
//       <div className="text-center">
//         <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">How it works</p>
//         <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
//           Three simple steps
//         </h2>
//       </div>
//       <div className="mt-12 grid gap-8 md:grid-cols-3">
//         {steps.map((step, i) => (
//           <div key={step.title} className="relative rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
//             <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-800 px-3 py-1 text-xs font-bold text-brand-50">
//               Step {i + 1}
//             </span>
//             <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
//               <Icon name={step.icon} className="h-7 w-7" />
//             </span>
//             <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
//             <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

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
    <section className="bg-brand-800 py-20 text-brand-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">Testimonials</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-50 sm:text-4xl">
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
                    <Icon key={i} name="star" className="h-4 w-4 text-brand-gold" />
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
