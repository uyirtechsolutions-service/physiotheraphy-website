"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addBooking, clearService, selectServiceId, type Booking } from "@/lib/store";
import { clinic, services } from "@/lib/data";
import type { Service } from "@/lib/data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", notes: "" };

function makeReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return `PC-${out}`;
}

/* -------------------------------------------------------------------------- */
/*  Calendar helpers                                                          */
/* -------------------------------------------------------------------------- */

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function startDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay(); // 0 = Sun
}

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

function isToday(d: Date, ref?: Date): boolean {
  return isSameDay(d, ref ?? new Date());
}

function isPast(d: Date, ref?: Date): boolean {
  const today = ref ?? new Date();
  const norm = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const normToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return norm < normToday;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatFullDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BookingForm() {
  const dispatch = useAppDispatch();
  const preselectedServiceId = useAppSelector(selectServiceId);
  const initialServiceId = services.some((s) => s.id === preselectedServiceId)
    ? preselectedServiceId
    : null;

  const [step, setStep] = useState(initialServiceId ? 2 : 1);
  const [serviceId, setServiceId] = useState<string | null>(initialServiceId);
  const [date, setDate] = useState<Date | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calendarMonth, setCalendarMonth] = useState<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [clientNow, setClientNow] = useState<Date | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [toast, setToast] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(type: "error" | "success", message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ type, message });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    // Hydrate client-only date to avoid server/client mismatch
    setClientNow(new Date());
  }, []);

  // Scroll the step content to top whenever the step changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const service = services.find((s) => s.id === serviceId) ?? null;

  function handleMonthChange(dir: -1 | 1) {
    setCalendarMonth((prev) => {
      const d = new Date(prev.year, prev.month + dir, 1);
      // Prevent navigating to past months
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      if (d < currentMonthStart) return prev;
      // Limit to 12 months out
      const max = new Date(now.getFullYear(), now.getMonth() + 12, 1);
      if (d > max) return prev;
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function stepError(s: number): string | null {
    if (s === 1 && !serviceId) return "Please select a service to continue.";
    if (s === 2 && !date) return "Please select a date.";
    if (s === 3) {
      const errs: Record<string, string> = {};
      if (!form.name.trim()) errs.name = "Full name is required";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Enter a valid email address";
      if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = "Enter a valid Indian mobile number";
      setErrors(errs);
      if (Object.keys(errs).length > 0) return "Please complete the required details correctly.";
    }
    return null;
  }

  function next() {
    const err = stepError(step);
    if (err) {
      showToast("error", err);
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function confirm() {
    if (!service || !date) {
      showToast("error", "Please complete all steps before confirming.");
      return;
    }
    const booking: Booking = {
      reference: makeReference(),
      service,
      date: formatFullDate(date),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
    };
    
    // Send booking confirmation emails
    try {
      const response = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          service: booking.service.title,
          date: booking.date,
          notes: booking.notes,
          reference: booking.reference,
        }),
      });
      
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        showToast("error", result?.error ?? "We could not complete the booking. Please try again.");
        return;
      }

      const result = (await response.json().catch(() => null)) as { warning?: string } | null;
      if (result?.warning) {
        showToast("error", result.warning);
      }
    } catch (error) {
      console.error("Error sending booking emails:", error);
      showToast("error", "We could not complete the booking. Please try again.");
      return;
    }
    
    dispatch(addBooking(booking));
    setConfirmed(booking);
    dispatch(clearService());
    showToast("success", "Appointment request received successfully!");
  }

  function reset() {
    setConfirmed(null);
    setStep(1);
    setServiceId(null);
    setDate(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setCalendarMonth({ year: new Date().getFullYear(), month: new Date().getMonth() });
    dispatch(clearService());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Toast toast={toast} />
      {confirmed ? (
        <Confirmation booking={confirmed} onReset={reset} />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="self-start rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Stepper — normal flow, scrolls away with the page */}
        <div className="border-b border-slate-100 px-6 py-4 sm:px-8">
          <StepIndicator step={step} />
        </div>

        {/* Step content */}
        <div ref={contentRef} className="h-[340px] overflow-y-auto px-6 py-4 sm:px-8">
          {step === 1 && <StepOne value={serviceId} onSelect={setServiceId} />}
          {step === 2 && (
            <StepTwo
              calendarMonth={calendarMonth}
              selectedDate={date}
              clientNow={clientNow}
              onSelectDate={setDate}
              onMonthChange={handleMonthChange}
            />
          )}
          {step === 3 && <StepThree form={form} errors={errors} onChange={updateField} />}
          {step === 4 && (
            <Review service={service} date={date} form={form} />
          )}
        </div>

        {/* Navigation — always visible below the scrollable content */}
        <div className="border-t border-slate-100 px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Icon name="chevron-left" className="h-4 w-4" />
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                Continue
                <Icon name="chevron-right" className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={confirm}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
              >
                <Icon name="check" className="h-4 w-4" />
                Confirm booking
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ProcessCard />
        <Summary service={service} date={date} />
      </div>
        </div>
      )}
    </>
  );
}

function StepIndicator({ step }: { step: number }) {
  const labels = ["Service", "Schedule", "Details", "Confirm"];
  return (
    <div className="flex items-start">
      {labels.map((label, i) => {
        const num = i + 1;
        const done = num < step;
        const active = num === step;
        const last = i === labels.length - 1;
        return (
          <div
            key={label}
            className={last ? "flex flex-col items-center" : "flex flex-1 flex-col items-center"}
          >
            <div className="flex w-full items-center">
              <span
                className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  done || active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-200 text-slate-500"
                } ${active ? "ring-4 ring-brand-100" : ""}`}
              >
                {done ? <Icon name="check" className="h-3.5 w-3.5" /> : num}
              </span>
              {!last && (
                <span
                  className={`-ml-0.5 h-0.5 flex-1 rounded-full transition-colors ${
                    done ? "bg-brand-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-1.5 text-[11px] font-medium ${
                active ? "text-brand-700" : done ? "text-slate-700" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StepOne({
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Choose a service</h2>
      <p className="mt-1 text-sm text-slate-500">Select the treatment you need.</p>
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const selected = value === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                selected
                  ? "border-brand-600 bg-brand-50 ring-2 ring-brand-100"
                  : "border-slate-200 bg-white hover:border-brand-300"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  selected ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600"
                }`}
              >
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-slate-900">{s.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTwo({
  calendarMonth,
  selectedDate,
  clientNow,
  onSelectDate,
  onMonthChange,
}: {
  calendarMonth: { year: number; month: number };
  selectedDate: Date | null;
  clientNow: Date | null;
  onSelectDate: (d: Date) => void;
  onMonthChange: (dir: -1 | 1) => void;
}) {
  const { year, month } = calendarMonth;
  const totalDays = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);

  const isPrevDisabled =
    new Date(year, month, 1) <= new Date(clientNow?.getFullYear() ?? 2024, clientNow?.getMonth() ?? 0, 1);

  // Build grid cells: leading blanks + day numbers
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i += 1) cells.push(null);
  for (let d = 1; d <= totalDays; d += 1) cells.push(d);

  const today = clientNow ?? new Date();

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Pick a date</h2>
      <p className="mt-1 text-sm text-slate-500">Choose a convenient appointment date.</p>

      {/* Month navigation */}
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          disabled={isPrevDisabled}
          onClick={() => onMonthChange(-1)}
          className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors ${
            isPrevDisabled
              ? "cursor-not-allowed text-slate-300"
              : "text-slate-600 hover:bg-slate-100"
          }`}
          aria-label="Previous month"
        >
          <Icon name="chevron-left" className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-slate-800">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => onMonthChange(1)}
          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100"
          aria-label="Next month"
        >
          <Icon name="chevron-right" className="h-4 w-4" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="mt-3 grid grid-cols-7">
        {DAY_HEADERS.map((h) => (
          <span
            key={h}
            className="py-0.5 text-center text-xs font-medium uppercase tracking-wide text-slate-400"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="mt-0.5 grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} />;
          }

          const cellDate = new Date(year, month, day);
          const disabled = cellDate.getDay() === 0 || isPast(cellDate, today);
          const selected = selectedDate ? isSameDay(cellDate, selectedDate) : false;
          const todayClass = isToday(cellDate, today);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(cellDate)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                selected
                  ? "bg-brand-600 text-white"
                  : disabled
                    ? "cursor-not-allowed text-slate-300"
                    : todayClass
                      ? "text-brand-700 ring-1 ring-brand-300 hover:bg-brand-50"
                      : "text-slate-700 hover:bg-brand-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepThree({
  form,
  errors,
  onChange,
}: {
  form: FormState;
  errors: Record<string, string>;
  onChange: (field: keyof FormState, value: string) => void;
}) {
  const input =
    "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Your details</h2>
      <p className="mt-1 text-sm text-slate-500">Tell us who to book the appointment for.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
          <input
            className={input}
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className={input}
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
          <input
            type="tel"
            className={input}
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Notes <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            rows={1}
            className={`${input} resize-none`}
            placeholder="Describe your symptoms or anything we should know..."
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Review({
  service,
  date,
  form,
}: {
  service: Service | null;
  date: Date | null;
  form: FormState;
}) {
  const rows = [
    { label: "Service", value: service ? service.title : "—" },
    { label: "Date", value: date ? formatFullDate(date) : "—" },
    { label: "Patient", value: form.name || "—" },
    { label: "Contact", value: [form.email, form.phone].filter(Boolean).join(" · ") || "—" },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Review your booking</h2>
      <p className="mt-1 text-sm text-slate-500">Please confirm the details below.</p>
      <dl className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 px-4 py-3">
            <dt className="text-sm text-slate-500">{r.label}</dt>
            <dd className="text-right text-sm font-medium text-slate-900">{r.value}</dd>
          </div>
        ))}
      </dl>
      {form.notes && (
        <p className="mt-4 text-sm text-slate-600">
          <span className="font-medium">Notes:</span> {form.notes}
        </p>
      )}
    </div>
  );
}

function ProcessCard() {
 
  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-200">
        Appointment Details
      </h3>
      {/* <p className="mt-1 text-lg font-bold leading-tight">Details &amp; Process</p> */}
     
    </div>
  );
}

function Summary({
  service,
  date,
}: {
  service: Service | null;
  date: Date | null;
}) {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-24">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Your booking</h3>
      <div className="mt-4 space-y-4 text-sm">
        <SummaryRow label="Service" value={service ? service.title : "Not selected"} />
        <SummaryRow label="Date" value={date ? formatFullDate(date) : "Not selected"} />
      </div>
      <p className="mt-6 flex items-start gap-2 text-xs text-slate-500">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
        Free cancellation up to 24 hours before your appointment.
      </p>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 font-medium text-slate-800">{value}</p>
    </div>
  );
}

function Confirmation({ booking, onReset }: { booking: Booking; onReset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
        <Icon name="check" className="h-8 w-8" />
      </span>
      <h2 className="mt-6 text-2xl font-bold text-slate-900">Appointment Received successfully</h2>
      <p className="mt-2 text-slate-600">
        Thank you, {booking.name}. We&apos;ve received your appointment request. Our team will call you at {booking.phone} shortly to confirm your booking. You will also receive an email from us with your appointment details.
      </p>

      <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left">
        <dl className="space-y-3 text-sm">
          <ConfirmationRow label="Service" value={booking.service.title} />
          <ConfirmationRow label="Date" value={booking.date} />
          <ConfirmationRow label="Location" value={clinic.address} />
        </dl>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Icon name="calendar" className="h-4 w-4" />
          Book another appointment
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ConfirmationRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value}</dd>
    </div>
  );
}

function Toast({
  toast,
}: {
  toast: { type: "error" | "success"; message: string } | null;
}) {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <div
        role="status"
        className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-2xl ${
          isError ? "bg-red-600" : "bg-brand-600"
        }`}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">
          <Icon name={isError ? "x" : "check"} className="h-4 w-4" />
        </span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
