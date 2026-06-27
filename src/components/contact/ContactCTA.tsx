import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneCall, MessageCircle } from "lucide-react";
import { PHONE_E164, WHATSAPP_NUMBER } from "@/config/business";

export default function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-dark py-16 px-6"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-red/[0.08] blur-3xl pointer-events-none" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <span className="bg-red/15 border border-red/25 text-red-muted text-xs font-display font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full inline-block mb-5">
          LET'S TALK
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Looking for the Best Used Car Deals in Hyderabad?
        </h2>
        <p className="mt-4 text-white/55 text-base">
          Call us, chat on WhatsApp, or visit our Hitech City showroom for a test
          drive. Available 7 days a week.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${PHONE_E164}`}
            className="bg-white text-text-heading font-display font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 shadow-lg transition"
          >
            <PhoneCall size={18} className="text-red" />
            Call Now
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-display font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1EA855] transition"
          >
            <MessageCircle size={18} />
            WhatsApp Now
          </a>
        </div>

        <p className="mt-6 text-white/35 text-xs font-body">
          Mon–Sat: 10AM–8PM · Sunday: 11AM–6PM · Hitech City, Hyderabad
        </p>
      </motion.div>
    </section>
  );
}
