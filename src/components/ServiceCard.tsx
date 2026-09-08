"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { useAppDispatch } from "@/lib/hooks";
import { selectService } from "@/lib/store";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  const dispatch = useAppDispatch();

  return (
    <Link
      href="/book"
      onClick={() => dispatch(selectService(service.id))}
      className="group relative flex aspect-[3/2] flex-col justify-end overflow-hidden rounded-xl border border-brand-200 bg-brand-900 transition-all duration-300 hover:border-brand-300 hover:shadow-lg sm:aspect-square"
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/55 to-brand-950/10 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-brand-600/0 transition-colors duration-300 group-hover:bg-brand-600/40" />

      {service.logo ? (
        <span className="absolute left-4 top-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-lg ring-2 ring-white/80">
          <Image
            src={service.logo}
            alt=""
            width={56}
            height={56}
            className="h-full w-full scale-[2.2] object-contain"
          />
        </span>
      ) : (
        <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
      )}

      <div className="relative p-3 sm:p-4">
        <h2 className="text-base font-semibold leading-snug text-white">{service.title}</h2>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-brand-100">
          {service.description}
        </p>
        <span className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-md bg-brand-200 px-3 py-2 text-xs font-semibold text-brand-800 shadow-sm transition-colors duration-300 group-hover:bg-brand-50 group-hover:text-brand-700 sm:mt-4 sm:px-4 sm:py-2.5">
          Book Appointment
          <Icon name="chevron-right" className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
