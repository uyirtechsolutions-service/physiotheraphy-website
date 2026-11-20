import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "./providers";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Physiotherapy in Saibaba Colony, Coimbatore | The Origin",
    template: "%s | The Origin",
  },
  description:
    "Expert physiotherapy and rehabilitation in Saibaba Colony, Coimbatore. Book appointments for pain management, orthopedic, neurological and women's health care.",
  openGraph: {
    title: "Physiotherapy in Saibaba Colony, Coimbatore | The Origin",
    description:
      "Expert physiotherapy and rehabilitation in Saibaba Colony, Coimbatore. Book appointments for pain management, orthopedic, neurological and women's health care.",
    url: "/",
    siteName: SITE_NAME,
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-50 text-brand-800">
        <Providers>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 pb-24 lg:pb-0">{children}</main>
          <Footer />
          <FloatingWidgets />
        </Providers>
      </body>
    </html>
  );
}
