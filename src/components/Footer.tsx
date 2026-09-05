"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import { aboutClinicImage } from "@/lib/images";
import { clinic, services } from "@/lib/data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book Appointment" },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to book a physiotherapy appointment."
  )}`;

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      <Image
        src={aboutClinicImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 to-brand-950/95" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Icon name="activity" className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold text-white">{clinic.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-brand-200">
              {clinic.tagline}. Move better. Feel better. Live better.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
              </a>
              <a
                href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`}
                aria-label="Call us"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
              >
                <Icon name="phone" className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${clinic.email}`}
                aria-label="Email us"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
              >
                <Icon name="mail" className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-brand-200 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href="/services" className="text-brand-200 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{clinic.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${clinic.email}`} className="hover:text-white">
                  {clinic.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-900 pt-6 text-sm text-brand-300 sm:flex-row">
          <p>© {year} {clinic.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Move Better. Feel Better. Live Better.
            <Icon name="heart" className="h-4 w-4 text-brand-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
