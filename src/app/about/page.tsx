import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { aboutClinicImage, aboutStoryImage, rehabExerciseImage } from "@/lib/images";
import { clinic, therapists, stats, values } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our clinic, our team and our approach to physiotherapy.",
};

const highlights = [
  "One-on-one, personalised treatment plans",
  "Evidence-based, hands-on therapy",
  "Modern, fully equipped clinic",
  "Care for every age & stage of life",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[480px] items-center overflow-hidden">
        <Image
          src={aboutClinicImage}
          alt="Our physiotherapy clinic and care environment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/85 to-brand-900/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            <Icon name="award" className="h-4 w-4 text-brand-300" />
            {clinic.tagline}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Helping you move, feel and <span className="text-brand-300">live better</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-100">
            {clinic.name} has been providing expert, compassionate physiotherapy care for over a
            decade — combining clinical excellence with genuine human connection.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Book an appointment
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Icon name="message-circle" className="h-4 w-4" />
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={aboutStoryImage}
                alt="A therapist working with a patient during a physiotherapy session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-100 sm:block">
              <p className="text-4xl font-extrabold text-brand-600">12+</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Years of trusted care</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our story</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Recovery is personal. So are we.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              We started {clinic.name} with a simple belief: recovery should be personal,
              evidence-based and empowering. Over the years we&apos;ve grown into a team of
              specialists, but that belief has never changed.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Today we help thousands of patients each year — from elite athletes to grandparents —
              regain their strength, confidence and independence.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-6 text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-white to-brand-50/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">What we stand for</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              The values behind every treatment
            </h2>
            <p className="mt-4 text-slate-600">
              These principles shape how we care for you, from your first assessment to full recovery.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-brand-950 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold text-white sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm font-medium text-brand-300">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our team</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Meet our therapists
          </h2>
          <p className="mt-4 text-slate-600">
            Licensed, experienced and genuinely invested in your recovery.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {therapists.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-xl sm:flex-row sm:items-center"
            >
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-bold text-white shadow-lg">
                {t.initials}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">{t.name}</h3>
                <p className="text-sm font-medium text-brand-600">{t.title}</p>
                <p className="mt-1 text-sm text-slate-600">{t.specialty}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-600">
                    <Icon name="star" className="h-3.5 w-3.5" />
                    {t.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-sm font-semibold text-brand-700">
                    <Icon name="award" className="h-3.5 w-3.5" />
                    {t.experience} yrs
                  </span>
                </div>
              </div>
              <Link
                href="/book"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
              >
                Book
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl px-6 py-16 text-center text-white sm:px-16">
          <Image
            src={rehabExerciseImage}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700/95 to-brand-900/95" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start your recovery?</h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-100">
              Book your appointment online in minutes, or call us and we&apos;ll find the right
              therapist for you.
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
    </>
  );
}
