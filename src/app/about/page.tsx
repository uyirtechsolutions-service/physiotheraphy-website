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
      <section className="relative overflow-hidden bg-brand-50 text-brand-800">
        <Image
          src={aboutClinicImage}
          alt="Our physiotherapy clinic and care environment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-50/15" />
        <div className="relative z-10 mx-auto flex min-h-[480px] w-full max-w-[1400px] items-center px-6 py-16 sm:px-12 lg:px-[max(8rem,calc((100vw-1400px)/2+2rem))] lg:py-8">
          <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/50 bg-brand-50/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-800">
            <Icon name="award" className="h-4 w-4 text-brand-700" />
            {clinic.tagline}
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[0.98] tracking-tight text-brand-800 sm:text-6xl">
            Helping you move, feel and live better
          </h1>
          <span className="mt-5 block h-0.5 w-14 bg-brand-700" />
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-700 sm:text-lg">
            {clinic.name} has been providing expert, compassionate physiotherapy care for over a
            decade — combining clinical excellence with genuine human connection.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-800 px-6 py-3.5 text-sm font-semibold text-brand-50 shadow-lg transition-all hover:bg-brand-700"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Book an appointment
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-500/70 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
            >
              <Icon name="message-circle" className="h-4 w-4" />
              Talk to us
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative animate-fade-up">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
              <Image
                src={aboutStoryImage}
                alt="A therapist working with a patient during a physiotherapy session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-100 sm:block">
              <p className="text-4xl text-brand-800">12+</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Years of trusted care</p>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:150ms]">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our story</p>
            <h2 className="mt-3 text-3xl tracking-tight text-brand-800 sm:text-4xl">
              Recovery is personal. So are we.
            </h2>
            <p className="mt-5 leading-7 text-brand-700">
              We started {clinic.name} with a simple belief: recovery should be personal,
              evidence-based and empowering. Over the years we&apos;ve grown into a team of
              specialists, but that belief has never changed.
            </p>
            <p className="mt-4 leading-7 text-brand-700">
              Today we help thousands of patients each year — from elite athletes to grandparents —
              regain their strength, confidence and independence.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-6 text-brand-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-100/35 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">What we stand for</p>
            <h2 className="mt-3 text-3xl tracking-tight text-brand-800 sm:text-4xl">
              The values behind every treatment
            </h2>
            <p className="mt-4 text-brand-700">
              These principles shape how we care for you, from your first assessment to full recovery.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, index) => (
              <div
                key={v.title}
                className="group animate-fade-up rounded-xl border border-brand-200 bg-brand-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-800 transition-colors group-hover:bg-brand-800 group-hover:text-brand-50">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-800">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-700">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-brand-800 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, index) => (
            <div
              key={s.label}
              className="animate-fade-up text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
          {therapists.map((t, index) => (
            <div
              key={t.id}
              className="group animate-fade-up flex flex-col items-start gap-6 rounded-xl border border-brand-200 bg-brand-50 p-7 shadow-sm transition-all duration-300 hover:border-brand-400 hover:shadow-xl sm:flex-row sm:items-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-2xl font-bold text-brand-800 shadow-lg">
                {t.initials}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-brand-800">{t.name}</h3>
                <p className="text-sm font-medium text-brand-600">{t.title}</p>
                <p className="mt-1 text-sm text-brand-700">{t.specialty}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-1 text-sm font-semibold text-brand-700">
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
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-800 hover:text-brand-50"
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
        <div className="relative animate-fade-up overflow-hidden rounded-xl px-6 py-16 text-center text-brand-50 sm:px-16">
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
