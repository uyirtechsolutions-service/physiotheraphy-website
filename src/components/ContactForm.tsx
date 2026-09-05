"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Enter a valid email address";
    if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        console.error("Failed to send contact message");
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
    } finally {
      setLoading(false);
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">Message sent!</h3>
        <p className="mt-2 text-sm text-slate-600">
          Thanks, {form.name}. We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
        <input
          className={input}
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
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
          onChange={(e) => update("email", e.target.value)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
        <textarea
          rows={4}
          className={input}
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>Sending...</>
        ) : (
          <>
            Send Message
            <Icon name="arrow-right" className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
