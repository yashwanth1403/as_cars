import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneCall, MessageCircle, MapPin } from "lucide-react";
import {
  PHONE_E164,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  MAPS_URL,
} from "@/config/business";

export default function ContactCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const cards = [
    {
      key: "phone",
      href: `tel:${PHONE_E164}`,
      target: undefined,
      cls: "bg-white border border-border shadow-card hover:shadow-card-hover hover:border-red/20 hover:-translate-y-0.5",
      iconWrap: "bg-red-light",
      icon: <PhoneCall size={22} className="text-red" />,
      label: <span className="text-text-muted text-xs font-body uppercase tracking-wider">Call Us</span>,
      value: <span className="font-display font-bold text-xl text-text-heading mt-0.5">{PHONE_DISPLAY}</span>,
      sub: null,
      action: <span className="text-red text-sm font-display font-semibold mt-3">Call Now →</span>,
    },
    {
      key: "whatsapp",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I'm%20looking%20for%20a%20used%20car.`,
      target: "_blank",
      cls: "bg-[#25D366] shadow-card hover:scale-[1.02] hover:shadow-lg",
      iconWrap: "bg-white/20",
      icon: <MessageCircle size={22} className="text-white" />,
      label: <span className="text-white/70 text-xs uppercase tracking-wider">WhatsApp</span>,
      value: <span className="font-display font-bold text-xl text-white mt-0.5">Chat With Us</span>,
      sub: <span className="text-white/60 text-sm mt-0.5">Usually replies in 5 mins</span>,
      action: <span className="text-white font-display font-semibold text-sm mt-3">Open WhatsApp →</span>,
    },
    {
      key: "location",
      href: MAPS_URL,
      target: "_blank",
      cls: "bg-white border border-border shadow-card hover:shadow-card-hover hover:border-red/20 hover:-translate-y-0.5",
      iconWrap: "bg-red-light",
      icon: <MapPin size={22} className="text-red" />,
      label: <span className="text-text-muted text-xs uppercase tracking-wider">Visit Showroom</span>,
      value: <span className="font-display font-bold text-lg text-text-heading mt-0.5">Hitech City, Hyderabad</span>,
      sub: <span className="text-text-muted text-xs mt-1 leading-relaxed">Gopal Nagar, Hafeezpet Rd, near Masjid-e-Ghousia, 500085</span>,
      action: <span className="text-red text-sm font-display font-semibold mt-3">Get Directions →</span>,
    },
  ];

  return (
    <section ref={ref} className="bg-white py-10 px-6 border-b border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <motion.a
            key={c.key}
            href={c.href}
            target={c.target}
            rel={c.target ? "noopener noreferrer" : undefined}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className={`flex flex-col items-start gap-4 rounded-2xl p-7 transition duration-300 ${c.cls}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.iconWrap}`}>
              {c.icon}
            </div>
            <div className="flex flex-col">
              {c.label}
              {c.value}
              {c.sub}
              {c.action}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
