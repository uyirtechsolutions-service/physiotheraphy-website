"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { clinic } from "@/lib/data";

const links = [
  { href: "/book", label: "Book" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-brand-950 text-brand-100">
        <div className="mx-auto flex min-h-10 max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-1 px-4 py-1 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="phone" className="h-3.5 w-3.5 text-brand-400" />
              <a href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {clinic.phone}
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-3.5 w-3.5 text-brand-400" />
              Mon – Sat: 9:00 AM – 8:00 PM
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="map-pin" className="h-3.5 w-3.5 text-brand-400" />
            {clinic.address}
          </span>
        </div>
      </div>

      <header className="border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
              <Icon name="activity" className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-slate-900">{clinic.name}</span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-brand-600">
                {clinic.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-brand-700" : "text-slate-600 hover:text-slate-900"
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

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#25D366] transition-colors hover:bg-[#25D366]/10"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Icon name={open ? "x" : "menu"} className="h-6 w-6" />
          </button>
        </nav>

        {open && (
          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-50"
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
