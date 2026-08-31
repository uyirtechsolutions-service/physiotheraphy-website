export default function Map() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <iframe
        title="Clinic location — Saibaba Colony, Coimbatore"
        src="https://www.google.com/maps?q=Saibaba%20Colony%2C%20Coimbatore%2C%20Tamil%20Nadu&output=embed"
        className="h-[400px] w-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}