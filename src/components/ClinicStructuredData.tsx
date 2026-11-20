import { clinic } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const clinicStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#clinic`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: clinic.phone,
  email: clinic.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address,
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],
};

export default function ClinicStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(clinicStructuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
