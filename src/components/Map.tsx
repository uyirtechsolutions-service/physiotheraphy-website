import { clinic } from "@/lib/data";

// A searchable place query (business + full address) instead of bare
// coordinates, so Google Maps can resolve the place and its info card.
const embedQuery = encodeURIComponent(`${clinic.name} ${clinic.tagline}, ${clinic.address}`);

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // The official Maps Embed API reliably renders the place marker and loads its
  // info card (name, address, rating, directions) when clicked. Without a key
  // we fall back to the classic query-based embed so the map still renders.
  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${embedQuery}`
    : `https://maps.google.com/maps?q=${embedQuery}&z=17&hl=en&output=embed`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <iframe
        title={`Clinic location — ${clinic.address}`}
        src={src}
        className="h-[400px] w-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}