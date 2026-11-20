import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: { absolute: "Book a Physiotherapy Appointment | The Origin Coimbatore" },
  description:
    "Book a physiotherapy appointment at The Origin, Saibaba Colony, Coimbatore. Choose your service and time online. Call us if you need help.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Physiotherapy Appointment | The Origin Coimbatore",
    description:
      "Book a physiotherapy appointment at The Origin, Saibaba Colony, Coimbatore. Choose your service and time online. Call us if you need help.",
    url: "/book",
    siteName: "The Origin Physiotherapy & Rehabilitation",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Origin Physiotherapy & Rehabilitation in Saibaba Colony, Coimbatore",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function BookPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Book Appointment", href: "/book" }]} />
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
          <div className="mt-2">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
