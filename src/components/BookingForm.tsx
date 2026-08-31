"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addBooking, clearService, selectServiceId, type Booking } from "@/lib/store";
import { clinic, services, therapists, timeSlots } from "@/lib/data";
import type { Service, Therapist } from "@/lib/data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", notes: "" };

function generateDays(count: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  let d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  while (days.length < count) {
    if (d.getDay() !== 0) days.push(new Date(d));
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  }
  return days;
}

function formatFullDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function dayLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

function dayNum(d: Date): number {
  return d.getDate();
}

function dayMonth(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short" });
}

function makeReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return `PC-${out}`;
}

export default function BookingForm() {
  const dispatch = useAppDispatch();
  const preselectedServiceId = useAppSelector(selectServiceId);
  const initialServiceId = services.some((s) => s.id === preselectedServiceId)
    ? preselectedServiceId
    : null;

  const [step, setStep] = useState(initialServiceId ? 2 : 1);
  const [serviceId, setServiceId] = useState<string | null>(initialServiceId);
  const [therapistId, setTherapistId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [days, setDays] = useState<Date[]>([]);
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
    // Populate available dates on the client only (keeps server and client
    // markup identical and avoids a hydration mismatch).
    const id = requestAnimationFrame(() => setDays(generateDays(14)));
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll the step content to top whenever the step changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const service = services.find((s) => s.id === serviceId) ?? null;
  const therapist = therapists.find((t) => t.id === therapistId) ?? null;

  function updateField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function stepError(s: number): string | null {
    if (s === 1 && !serviceId) return "Please select a service to continue.";
    if (s === 2 && !therapistId) return "Please choose a therapist to continue.";
    if (s === 3 && (!date || !time)) return "Please select both a date and a time.";
    if (s === 4) {
      const errs: Record<string, string> = {};
      if (!form.name.trim()) errs.name = "Full name is required";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Enter a valid email address";
      if (!/^[+\d][\d\s().-]{6,}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number";
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
    setStep((s) => Math.min(5, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function confirm() {
    if (!service || !therapist || !date || !time) {
      showToast("error", "Please complete all steps before confirming.");
      return;
    }
    const booking: Booking = {
      reference: makeReference(),
      service,
      therapist,
      date: formatFullDate(date),
      time,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
    };
    dispatch(addBooking(booking));
    setConfirmed(booking);
    dispatch(clearService());
    showToast("success", "Appointment confirmed successfully!");
  }

  function reset() {
    setConfirmed(null);
    setStep(1);
    setServiceId(null);
    setTherapistId(null);
    setDate(null);
    setTime(null);
    setForm(EMPTY_FORM);
    setErrors({});
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
        <div ref={contentRef} className="h-[350px] overflow-y-auto px-6 py-6 sm:px-8">
          {step === 1 && <StepOne value={serviceId} onSelect={setServiceId} />}
          {step === 2 && <StepTwo value={therapistId} onSelect={setTherapistId} />}
          {step === 3 && (
            <StepThree
              days={days}
              selectedDate={date}
              selectedTime={time}
              onSelectDate={setDate}
              onSelectTime={setTime}
            />
          )}
          {step === 4 && <StepFour form={form} errors={errors} onChange={updateField} />}
          {step === 5 && (
            <Review service={service} therapist={therapist} date={date} time={time} form={form} />
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
            {step < 5 ? (
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
        <Summary service={service} therapist={therapist} date={date} time={time} />
      </div>
        </div>
      )}
    </>
  );
}

function StepIndicator({ step }: { step: number }) {
  const labels = ["Service", "Therapist", "Schedule", "Details", "Confirm"];
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
  value,
  onSelect,
}: {
  value: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Choose your therapist</h2>
      <p className="mt-1 text-sm text-slate-500">Our licensed physiotherapists are here to help.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {therapists.map((t) => {
          const selected = value === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`cursor-pointer rounded-2xl border p-5 text-left transition-all ${
                selected
                  ? "border-brand-600 bg-brand-50 ring-2 ring-brand-100"
                  : "border-slate-200 bg-white hover:border-brand-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                    selected ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.title}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{t.specialty}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Icon name="star" className="h-4 w-4 text-amber-400" />
                <span className="font-semibold text-slate-900">{t.rating.toFixed(1)}</span>
                <span className="text-slate-400">·</span>
                <span>{t.experience} yrs exp</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepThree({
  days,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: {
  days: Date[];
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (d: Date) => void;
  onSelectTime: (t: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Pick a date &amp; time</h2>
      <p className="mt-1 text-sm text-slate-500">Choose a convenient appointment slot.</p>

      <p className="mt-6 text-sm font-semibold text-slate-700">Date</p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {days.map((d) => {
          const selected = selectedDate?.toDateString() === d.toDateString();
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => onSelectDate(d)}
              className={`flex min-w-[64px] cursor-pointer flex-col items-center rounded-xl border px-3 py-2.5 transition-all ${
                selected
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-300"
              }`}
            >
              <span className={`text-xs ${selected ? "text-brand-100" : "text-slate-400"}`}>
                {dayLabel(d)}
              </span>
              <span className="text-lg font-bold leading-tight">{dayNum(d)}</span>
              <span className={`text-xs ${selected ? "text-brand-100" : "text-slate-400"}`}>
                {dayMonth(d)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm font-semibold text-slate-700">Time</p>
      {selectedDate ? (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {timeSlots.map((t) => {
            const selected = selectedTime === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onSelectTime(t)}
                className={`cursor-pointer rounded-xl border px-2 py-2.5 text-sm font-medium transition-all ${
                  selected
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-300"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          Select a date to view available times.
        </p>
      )}
    </div>
  );
}

function StepFour({
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
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
          <input
            type="tel"
            className={input}
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Notes <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            rows={3}
            className={input}
            placeholder="Describe your symptoms or anything we should know..."
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function Review({
  service,
  therapist,
  date,
  time,
  form,
}: {
  service: Service | null;
  therapist: Therapist | null;
  date: Date | null;
  time: string | null;
  form: FormState;
}) {
  const rows = [
    { label: "Service", value: service ? service.title : "—" },
    { label: "Therapist", value: therapist?.name ?? "—" },
    { label: "Date", value: date ? formatFullDate(date) : "—" },
    { label: "Time", value: time ?? "—" },
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
  therapist,
  date,
  time,
}: {
  service: Service | null;
  therapist: Therapist | null;
  date: Date | null;
  time: string | null;
}) {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-24">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Your booking</h3>
      <div className="mt-4 space-y-4 text-sm">
        <SummaryRow label="Service" value={service ? service.title : "Not selected"} />
        <SummaryRow label="Therapist" value={therapist?.name ?? "Not selected"} />
        <SummaryRow label="Date" value={date ? formatFullDate(date) : "Not selected"} />
        <SummaryRow label="Time" value={time ?? "Not selected"} />
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
      <h2 className="mt-6 text-2xl font-bold text-slate-900">Appointment confirmed!</h2>
      <p className="mt-2 text-slate-600">
        Thank you, {booking.name}. A confirmation email has been sent to {booking.email}.
      </p>

      <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-left">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Booking reference
          </p>
          <p className="rounded-lg bg-white px-3 py-1 text-sm font-bold tracking-wider text-brand-700">
            {booking.reference}
          </p>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <ConfirmationRow label="Service" value={booking.service.title} />
          <ConfirmationRow label="Therapist" value={booking.therapist.name} />
          <ConfirmationRow label="Date" value={booking.date} />
          <ConfirmationRow label="Time" value={booking.time} />
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
