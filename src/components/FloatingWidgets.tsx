"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { clinic } from "@/lib/data";

export default function FloatingWidgets() {
  const message = encodeURIComponent(
    "Hi, I'd like to book a physiotherapy appointment at The Origin."
  );
  const waHref = `https://wa.me/${clinic.whatsapp}?text=${message}`;

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:right-5 lg:bottom-5">
      {/* WhatsApp widget */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-3"
      >
        <span className="pointer-events-none hidden translate-x-2 rounded-xl bg-slate-900/90 px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 hover:scale-110">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
          <Icon name="whatsapp" className="relative h-7 w-7" />
        </span>
      </a>

      {/* Appointment widget */}
      <Link
        href="/book"
        aria-label="Book an appointment"
        className="group hidden items-center gap-3 lg:flex"
      >
        <span className="pointer-events-none hidden translate-x-2 rounded-xl bg-slate-900/90 px-3 py-2 text-sm font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Book Appointment
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:bg-brand-700">
          <Icon name="calendar" className="h-6 w-6" />
        </span>
      </Link>
    </div>
  );
}
