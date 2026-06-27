import { MapPin, Clock } from "lucide-react";
import { MAP_EMBED_URL, BUSINESS_ADDRESS, BUSINESS_NAME } from "@/config/business";

export default function ShowroomMap() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="p-6 pb-0 flex items-center">
        <span className="w-1 h-6 bg-red rounded-full inline-block mr-3" />
        <h3 className="font-display font-bold text-xl text-text-heading mb-5 mt-0">
          Find Our Showroom
        </h3>
      </div>

      <div className="mx-6 rounded-xl overflow-hidden border border-border h-[280px] sm:h-[360px] group">
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "grayscale(0.15)",
            transition: "filter 500ms",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${BUSINESS_NAME} Showroom Location`}
          className="w-full h-full group-hover:[filter:grayscale(0)]"
        />
      </div>

      <div className="p-6 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-light flex items-center justify-center flex-shrink-0">
            <MapPin size={16} className="text-red" />
          </div>
          <div>
            <p className="text-text-muted text-[10px] uppercase tracking-wide font-body">
              Address
            </p>
            <p className="text-text-heading text-sm font-semibold mt-0.5 leading-snug">
              {BUSINESS_ADDRESS}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-light flex items-center justify-center flex-shrink-0">
            <Clock size={16} className="text-red" />
          </div>
          <div>
            <p className="text-text-muted text-[10px] uppercase tracking-wide">
              Opening Hours
            </p>
            <p className="text-text-heading text-sm font-semibold mt-0.5">
              Mon – Sat: 10:00 AM – 8:00 PM
            </p>
            <p className="text-text-body text-xs mt-0.5">
              Sunday: 11:00 AM – 6:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
