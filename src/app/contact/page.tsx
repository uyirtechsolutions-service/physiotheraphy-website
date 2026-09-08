import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative overflow-hidden bg-brand-50 text-brand-800">
        <Image
          src={contactImage}
          alt="A friendly physiotherapy team ready to help you"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-50/40" />
        <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-[1400px] items-center px-6 py-16 sm:px-12 lg:px-[max(8rem,calc((100vw-1400px)/2+2rem))] lg:py-8">
          <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/50 bg-brand-50/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-800">
            <Icon name="message-circle" className="h-4 w-4 text-brand-700" />
            Get in touch
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[0.98] tracking-tight text-brand-800 sm:text-6xl">
            We&apos;re here to help
          </h1>
          <span className="mt-5 block h-0.5 w-14 bg-brand-700" />
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-700 sm:text-lg">
            Questions about a treatment, insurance or booking? Reach out and our team will get back
            to you within one business day.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-800 px-6 py-3.5 text-sm font-semibold text-brand-50 shadow-lg transition-all hover:bg-brand-700"
            >
              <Icon name="phone" className="h-4 w-4" />
              {clinic.phone}
            </a>
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-500/70 px-6 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, index) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-800 transition-colors group-hover:bg-brand-800 group-hover:text-brand-50">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-brand-800">{c.title}</h2>
                <div className="mt-2 space-y-1">
                  {c.lines.map((line) => (
                    <p key={line} className="text-sm text-brand-700">
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
                className="group animate-fade-up rounded-xl border border-brand-200 bg-brand-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.title}
                className="group animate-fade-up rounded-xl border border-brand-200 bg-brand-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-brand-100/35 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Send a message</p>
            <h2 className="mt-3 text-3xl tracking-tight text-brand-800">
              How can we help?
            </h2>
            <p className="mt-4 text-brand-700">
              Fill in the form and our team will respond within one business day.
            </p>
            <div className="mt-8 rounded-xl border border-brand-200 bg-brand-50 p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6 animate-fade-up [animation-delay:200ms]">
            <div className="rounded-xl bg-brand-800 p-7 text-brand-50">
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

            <div className="rounded-xl border border-brand-200 bg-brand-50 p-7">
              <h3 className="text-lg font-semibold text-brand-800">Clinic hours</h3>
              <ul className="mt-4 space-y-3">
                {clinic.hours.map((h) => (
                  <li key={h.days} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-brand-700">{h.days}</span>
                    <span
                      className={`font-semibold ${h.time === "Closed" ? "text-red-500" : "text-brand-700"}`}
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-brand-200 bg-brand-50 p-7">
              <h3 className="text-lg font-semibold text-brand-800">Why patients choose us</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Personalised treatment plans",
                  "Experienced, licensed therapists",
                  "Modern, welcoming clinic",
                  "Convenient online booking",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-700">
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
          <h2 className="mt-3 text-3xl tracking-tight text-brand-800 sm:text-4xl">
            Find us on the map
          </h2>
          <p className="mt-4 text-brand-700">{clinic.address}</p>
        </div>
        <div className="mt-10 animate-fade-up">
          <Map />
        </div>
      </section>
    </>
  );
}
