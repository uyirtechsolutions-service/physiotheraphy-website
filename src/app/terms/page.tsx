import type { Metadata } from "next";
import { clinic } from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "Terms and Conditions | The Origin Physiotherapy" },
  description:
    "Read the Terms and Conditions for using The Origin Physiotherapy and Rehabilitation website and services in Coimbatore.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms and Conditions | The Origin Physiotherapy",
    description:
      "Read the Terms and Conditions for using The Origin Physiotherapy and Rehabilitation website and services in Coimbatore.",
    url: "/terms",
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
};

const sectionClass = "mt-10";
const headingClass = "text-xl font-semibold text-brand-800";
const paragraphClass = "mt-3 leading-7 text-slate-700";
const listClass = "mt-3 list-disc space-y-2 pl-6 leading-7 text-slate-700";

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-brand-200 pb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          The Origin Physiotherapy and Rehabilitation
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-800 sm:text-4xl">
          Terms and Conditions
        </h1>
        <p className="mt-3 text-slate-600">Coimbatore, Tamil Nadu, India</p>
        <p className="mt-2 text-sm text-slate-500">Last Updated: 20 November 2026</p>
      </header>

      <div className="mt-8 leading-7 text-slate-700">
        <p>
          Welcome to the official website of The Origin Physiotherapy and Rehabilitation (&ldquo;The
          Origin&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;).
        </p>
        <p className="mt-4">
          By accessing or using this website, you agree to the following Terms and Conditions.
          Please read them carefully before using our website or its services.
        </p>
      </div>

      <section className={sectionClass}>
        <h2 className={headingClass}>1. Use of Website</h2>
        <p className={paragraphClass}>
          This website is intended to provide information about our physiotherapy, rehabilitation
          and wellness services.
        </p>
        <p className={paragraphClass}>By using this website, you agree:</p>
        <ul className={listClass}>
          <li>To use the website only for lawful purposes.</li>
          <li>Not to misuse, damage or disrupt the website.</li>
          <li>Not to submit false, misleading or inaccurate information.</li>
          <li>Not to attempt unauthorised access to our website or its systems.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>2. Medical Disclaimer</h2>
        <p className={paragraphClass}>
          The information provided on this website, including articles, videos, exercise
          demonstrations and educational content, is intended for general informational and
          educational purposes only.
        </p>
        <ul className={listClass}>
          <li>Website content does not constitute medical advice, diagnosis or treatment.</li>
          <li>
            Information available on this website should not replace an individual consultation
            with a qualified healthcare professional.
          </li>
          <li>Exercises demonstrated online may not be suitable for everyone.</li>
          <li>Always seek professional guidance before beginning a new exercise or rehabilitation programme.</li>
          <li>Do not disregard professional medical advice based on information found on this website.</li>
        </ul>
        <p className={paragraphClass}>
          For individual assessment and treatment recommendations, please consult our physiotherapy
          team.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>3. Physiotherapy Services</h2>
        <p className={paragraphClass}>
          The Origin Physiotherapy and Rehabilitation provides physiotherapy and rehabilitation
          services based on individual assessment and clinical requirements.
        </p>
        <p className={paragraphClass}>
          Treatment plans, exercise programmes and rehabilitation approaches may differ depending
          on the patient&rsquo;s condition, medical history, functional ability and treatment goals.
        </p>
        <p className={paragraphClass}>
          We reserve the right to recommend modifications to treatment plans based on clinical
          assessment.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>4. Appointment Booking and Cancellation</h2>
        <ul className={listClass}>
          <li>
            Appointments may be requested through our website, telephone or other available
            communication channels.
          </li>
          <li>An appointment request is not considered confirmed until acknowledged by our clinic.</li>
          <li>Patients are requested to arrive on time for scheduled appointments.</li>
          <li>If you are unable to attend an appointment, please inform the clinic in advance.</li>
          <li>Appointment availability may change depending on clinician schedules and clinic operations.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>5. Payments and Refunds</h2>
        <ul className={listClass}>
          <li>Consultation and treatment charges will be communicated by the clinic.</li>
          <li>Applicable fees may vary depending on the type and duration of treatment.</li>
          <li>
            Any advance payments, package payments or cancellations will be handled according to
            the applicable payment and refund terms communicated by the clinic.
          </li>
          <li>Refund requests will be reviewed individually and in accordance with applicable laws.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>6. Treatment Outcomes</h2>
        <p className={paragraphClass}>Physiotherapy outcomes vary from person to person.</p>
        <p className={paragraphClass}>
          Recovery depends on several factors, including the nature of the condition, severity,
          overall health, consistency with treatment and individual response to rehabilitation.
        </p>
        <p className={paragraphClass}>
          The Origin does not guarantee specific recovery timelines or treatment outcomes.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>7. Patient Responsibilities</h2>
        <p className={paragraphClass}>Patients are responsible for:</p>
        <ul className={listClass}>
          <li>Providing accurate information about their medical history and current health condition.</li>
          <li>Informing the physiotherapist about any changes in symptoms or health status.</li>
          <li>Following appropriate clinical instructions and safety recommendations.</li>
          <li>Communicating any discomfort or concerns during treatment.</li>
          <li>Attending scheduled appointments or informing the clinic of cancellations.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>8. Intellectual Property</h2>
        <p className={paragraphClass}>
          All website content, including text, photographs, graphics, logos, videos, designs and
          other materials, belongs to The Origin Physiotherapy and Rehabilitation or its respective
          content owners, unless otherwise stated.
        </p>
        <p className={paragraphClass}>
          Unauthorised copying, reproduction, distribution or commercial use of website content
          without prior written permission is prohibited.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>9. Third-Party Links</h2>
        <p className={paragraphClass}>
          Our website may contain links to third-party websites or external resources for
          informational purposes.
        </p>
        <p className={paragraphClass}>
          We do not control or take responsibility for the content, privacy practices, accuracy or
          services provided by these external websites.
        </p>
        <p className={paragraphClass}>
          Users are advised to review the terms and privacy policies of third-party websites before
          using them.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>10. Privacy and Personal Information</h2>
        <p className={paragraphClass}>
          We respect the privacy of our patients and website visitors.
        </p>
        <p className={paragraphClass}>
          Any personal information submitted through our website, including contact details,
          appointment requests or health-related information, will be handled in accordance with
          our Privacy Policy and applicable Indian data protection laws.
        </p>
        <p className={paragraphClass}>
          Please refer to our separate Privacy Policy for information about the collection, use,
          storage and protection of personal information.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>11. Limitation of Liability</h2>
        <p className={paragraphClass}>
          We make reasonable efforts to ensure that the information on this website is accurate
          and up to date.
        </p>
        <p className={paragraphClass}>
          However, we do not guarantee that all website content will always be complete, accurate
          or uninterrupted.
        </p>
        <p className={paragraphClass}>
          To the extent permitted by applicable law, The Origin shall not be responsible for losses
          arising from:
        </p>
        <ul className={listClass}>
          <li>
            Reliance on general information published on this website without individual
            professional assessment.
          </li>
          <li>Temporary website interruptions or technical issues.</li>
          <li>Unauthorised use of website content by third parties.</li>
        </ul>
        <p className={paragraphClass}>
          Nothing in these terms excludes or limits any liability or consumer rights that cannot
          lawfully be excluded under applicable Indian law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>12. Changes to Terms and Conditions</h2>
        <p className={paragraphClass}>
          The Origin reserves the right to update or modify these Terms and Conditions whenever
          necessary.
        </p>
        <p className={paragraphClass}>
          Changes will be published on this page with an updated revision date. Continued use of
          the website after changes are published constitutes acceptance of the revised terms, to
          the extent permitted by applicable law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>13. Governing Law and Jurisdiction</h2>
        <p className={paragraphClass}>
          These Terms and Conditions shall be governed by the laws of India.
        </p>
        <p className={paragraphClass}>
          Subject to applicable laws and mandatory consumer protection provisions, courts of
          competent jurisdiction in Coimbatore, Tamil Nadu, shall have jurisdiction over disputes
          arising from the use of this website.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>14. Contact Information</h2>
        <p className={paragraphClass}>
          For questions, clarifications or concerns regarding these Terms and Conditions, please
          contact:
        </p>
        <address className="mt-4 not-italic leading-7 text-slate-700">
          <span className="block font-semibold text-brand-800">
            The Origin Physiotherapy and Rehabilitation
          </span>
          19/9, 2nd Cross, SRP Nagar,
          <br />
          Behind V.V. Vani Vidhyalaya School,
          <br />
          Saibaba Colony, Coimbatore &ndash; 641011,
          <br />
          Tamil Nadu, India.
          <br />
          Email:{" "}
          <a className="text-brand-700 underline" href={`mailto:${clinic.email}`}>
            {clinic.email}
          </a>
          <br />
          Phone:{" "}
          <a className="text-brand-700 underline" href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`}>
            {clinic.phone}
          </a>
        </address>
      </section>

      <p className="mt-10 border-t border-brand-200 pt-6 leading-7 text-slate-700">
        By accessing and using this website, you acknowledge that you have read and understood
        these Terms and Conditions.
      </p>
    </article>
  );
}
