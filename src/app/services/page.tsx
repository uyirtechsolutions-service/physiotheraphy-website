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
      <section className="relative flex min-h-[420px] items-center overflow-hidden">
        <Image
          src={servicesImage}
          alt="A range of physiotherapy treatments and rehabilitation equipment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-900/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">Our services</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Treatments designed around you
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            Every session is delivered by a licensed physiotherapist and tailored to your recovery goals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-slate-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">Not sure which treatment you need?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Book a consultation and we&apos;ll assess your condition and recommend the right plan.
          </p>
          <Link
            href="/book"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Icon name="calendar" className="h-4 w-4" />
            Book a consultation
          </Link>
        </div>
      </section>
    </>
  );
}
