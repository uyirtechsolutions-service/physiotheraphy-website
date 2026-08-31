import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Book a physiotherapy appointment online in minutes.",
};

export default function BookPage() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mt-2">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
