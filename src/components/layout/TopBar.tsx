import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden sm:block bg-dark text-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-white/60">
            <MapPin size={12} className="text-red" />
            Hitech City, Hyderabad
          </span>
          <a
            href="tel:+919392583393"
            className="flex items-center gap-1.5 text-white hover:text-red transition-colors"
          >
            <Phone size={12} className="text-red" />
            +91 93925 83393
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white/60">
            <Clock size={12} className="text-red" />
            Mon–Sat: 9AM–7PM
          </span>
          <span className="text-white/20">·</span>
          <a
            href="https://wa.me/919392583393"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25D366] hover:underline"
          >
            <MessageCircle size={12} />
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
