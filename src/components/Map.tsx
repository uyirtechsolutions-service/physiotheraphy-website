export default function Map() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <iframe
        title="Clinic location — Saibaba Colony, Coimbatore"
        src="https://maps.google.com/maps?q=11.0253336%2C76.9444102&z=17&hl=en&output=embed"
        className="h-[400px] w-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}