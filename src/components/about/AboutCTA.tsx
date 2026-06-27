import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/config/business";

export default function AboutCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-red py-16 px-6"
    >
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/[0.08] blur-2xl pointer-events-none" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
          Ready to Find Your Perfect Car in Hyderabad?
        </h2>
        <p className="mt-4 text-white/75 text-base leading-relaxed">
          Browse our verified inventory, visit our Hitech City showroom, or chat
          with our team on WhatsApp. We're here 7 days a week.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/cars"
            className="bg-white text-red font-display font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 shadow-lg transition"
          >
            Browse Cars →
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white/40 text-white font-display font-semibold px-7 py-3.5 rounded-xl hover:bg-white/15 transition"
          >
            Contact Us
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-display font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 justify-center hover:bg-[#1EA855] transition"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
