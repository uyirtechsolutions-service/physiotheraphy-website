import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import ContactForm from "@/components/ContactForm";
import Map from "@/components/Map";
import { contactImage } from "@/lib/images";
import { clinic } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with our physiotherapy clinic.",
};

export default function ContactPage() {
  const cards = [
    {
      icon: "phone",
      title: "Call us",
      lines: [clinic.phone],
      hint: "Mon–Sat, 9am–8pm",
      href: `tel:${clinic.phone.replace(/[^+\d]/g, "")}`,
    },
    {
      icon: "mail",
      title: "Email us",
      lines: [clinic.email],
      hint: "We reply within a day",
      href: `mailto:${clinic.email}`,
    },
    {
      icon: "map-pin",
      title: "Visit us",
      lines: [clinic.address],
      hint: "Saibaba Colony, Coimbatore",
    },
    {
      icon: "clock",
      title: "Opening hours",
      lines: clinic.hours.map((h) => `${h.days}: ${h.time}`),
      hint: "Closed on Sundays",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[440px] items-center overflow-hidden">
        <Image
          src={contactImage}
          alt="A friendly physiotherapy team ready to help you"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/85 to-brand-900/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            <Icon name="message-circle" className="h-4 w-4 text-brand-300" />
            Get in touch
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            We&apos;re here to <span className="text-brand-300">help</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-100">
            Questions about a treatment, insurance or booking? Reach out and our team will get back
            to you within one business day.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50"
            >
              <Icon name="phone" className="h-4 w-4" />
              {clinic.phone}
            </a>
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">{c.title}</h2>
                <div className="mt-2 space-y-1">
                  {c.lines.map((line) => (
                    <p key={line} className="text-sm text-slate-600">
                      {line}
                    </p>
                  ))}
                </div>
                {c.hint && <p className="mt-3 text-xs font-medium text-brand-600">{c.hint}</p>}
              </>
            );

            return c.href ? (
              <a
                key={c.title}
                href={c.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Send a message</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              How can we help?
            </h2>
            <p className="mt-4 text-slate-600">
              Fill in the form and our team will respond within one business day.
            </p>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-brand-950 p-7 text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                <Icon name="whatsapp" className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Prefer WhatsApp?</h3>
              <p className="mt-2 text-sm leading-6 text-brand-100">
                Chat with us directly for quick questions and appointment support.
              </p>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Start a chat
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-slate-900">Clinic hours</h3>
              <ul className="mt-4 space-y-3">
                {clinic.hours.map((h) => (
                  <li key={h.days} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">{h.days}</span>
                    <span
                      className={`font-semibold ${h.time === "Closed" ? "text-red-500" : "text-brand-700"}`}
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <h3 className="text-lg font-semibold text-slate-900">Why patients choose us</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Personalised treatment plans",
                  "Experienced, licensed therapists",
                  "Modern, welcoming clinic",
                  "Convenient online booking",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Location</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find us on the map
          </h2>
          <p className="mt-4 text-slate-600">📍 {clinic.address}</p>
        </div>
        <div className="mt-10">
          <Map />
        </div>
      </section>
    </>
  );
}
