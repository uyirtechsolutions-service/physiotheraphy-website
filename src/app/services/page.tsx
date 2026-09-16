import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import ServiceCard from "@/components/ServiceCard";
import { servicesImage } from "@/lib/images";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our physiotherapy and rehabilitation services.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-50 text-brand-800">
        <Image
          src={servicesImage}
          alt="A range of physiotherapy treatments and rehabilitation equipment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-50/40" />
        <div className="relative z-10 mx-auto flex min-h-[320px] w-full max-w-[1400px] items-center px-6 py-10 sm:px-12 lg:px-[max(8rem,calc((100vw-1400px)/2+2rem))] lg:py-6">
          <div className="max-w-3xl animate-fade-up">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our services</p>
          <h1 className="mt-2 max-w-2xl text-4xl leading-[0.98] tracking-tight text-brand-800 sm:text-6xl">
            Treatments designed around you
          </h1>
          <span className="mt-3 block h-0.5 w-14 bg-brand-700" />
          <p className="mt-3 max-w-2xl text-base leading-7 text-brand-700 sm:text-lg">
            Every session is delivered by a licensed physiotherapist and tailored to your recovery goals.
          </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, index) => (
            <div
              key={s.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard service={s} />
            </div>
          ))}
        </div>

        {/* Detailed services */}
        <div className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">What we treat</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A closer look at our services
            </h2>
            <p className="mt-3 text-slate-600">
              From pain relief to post-surgical recovery, here&apos;s how each program can help you.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.id}
                className="flex flex-col rounded-xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold text-brand-800">{s.title}</h3>
                </div>
                <p className="mt-4 leading-7 text-slate-600">{s.description}</p>
                {s.items && s.items.length > 0 && (
                  <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 animate-fade-up rounded-xl border border-brand-200 bg-brand-100/45 p-8 text-center [animation-delay:400ms]">
          <h2 className="text-2xl tracking-tight text-brand-800">Not sure which treatment you need?</h2>
          <p className="mt-2 text-sm text-brand-700">
            Book a consultation and we&apos;ll assess your condition and recommend the right plan.
          </p>
          <Link
            href="/book"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-800 px-6 py-3 text-sm font-semibold text-brand-50 transition-colors hover:bg-brand-700"
          >
            <Icon name="calendar" className="h-4 w-4" />
            Book a consultation
          </Link>
        </div>
      </section>
    </>
  );
}
