"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import { clinic } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/services", label: "Services", icon: "activity" },
  { href: "/book", label: "Book", icon: "calendar" },
  { href: "/about", label: "About", icon: "users" },
  { href: "/contact", label: "Contact", icon: "message-circle" },
];

export default function Navbar() {
  const pathname = usePathname();

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
          <Link href="/" className="flex items-center gap-2.5">
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

          <div className="hidden items-center gap-7 lg:flex">
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

          <div className="hidden items-center gap-4 lg:flex">
           
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-md bg-brand-800 px-6 py-3 text-sm font-semibold text-brand-50 transition-all hover:bg-brand-700"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>

        </nav>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-200/80 bg-brand-50/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(36,54,43,0.12)] backdrop-blur-lg lg:hidden"
      >
        <div className="mx-auto grid h-[4.5rem] max-w-lg grid-cols-5 items-end px-2">
          {mobileLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname === link.href;
            const isBooking = link.href === "/book";

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`group flex h-full flex-col items-center justify-end gap-1 pb-2 text-[10px] font-semibold transition-colors ${
                  isBooking ? "text-brand-800" : active ? "text-brand-600" : "text-brand-500/75"
                }`}
              >
                <span
                  className={`flex items-center justify-center transition-all ${
                    isBooking
                      ? "-mt-8 h-14 w-14 rounded-full border-4 border-brand-50 bg-brand-gold text-brand-950 shadow-lg shadow-brand-800/20 group-hover:-translate-y-0.5"
                      : "h-7 w-10 rounded-full group-hover:bg-brand-100"
                  }`}
                >
                  <Icon name={link.icon} className={isBooking ? "h-6 w-6" : "h-5 w-5"} />
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
