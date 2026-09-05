"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { clinic } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-brand-800 text-brand-50">
        <div className="mx-auto flex min-h-10 max-w-[1400px] flex-wrap items-center justify-between gap-x-5 gap-y-1 px-4 py-2 text-xs sm:px-8 lg:px-12">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="phone" className="h-3.5 w-3.5 text-brand-200" />
              <a href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {clinic.phone}
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-3.5 w-3.5 text-brand-200" />
              Mon – Sat: 9:00 AM – 8:00 PM
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="map-pin" className="h-3.5 w-3.5 text-brand-200" />
            {clinic.address}
          </span>
        </div>
      </div>

      <header className="border-b border-brand-200/70 bg-brand-50/95 backdrop-blur">
        <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-brand-50 shadow-sm ring-4 ring-brand-200/50">
              <Icon name="activity" className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-2xl tracking-wide text-brand-800">{clinic.name}</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-brand-600">
                {clinic.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-1 py-2 text-sm font-medium transition-colors ${
                    active ? "text-brand-700" : "text-brand-800/70 hover:text-brand-800"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 md:flex">
           
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-md bg-brand-800 px-6 py-3 text-sm font-semibold text-brand-50 transition-all hover:bg-brand-700"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-700 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Icon name={open ? "x" : "menu"} className="h-6 w-6" />
          </button>
        </nav>

        {open && (
          <div className="border-t border-brand-200 bg-brand-50 px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-brand-50 text-brand-700"
                      : "text-brand-700/75 hover:bg-brand-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Icon name="calendar" className="h-4 w-4" />
                Book Appointment
              </Link>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 px-5 py-2.5 text-sm font-semibold text-[#16a34a]"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
