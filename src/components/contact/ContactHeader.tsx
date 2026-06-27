import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Phone, MessageCircle, Clock } from "lucide-react";
import { PHONE_E164, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/config/business";

export default function ContactHeader() {
  return (
    <section className="bg-dark py-10 px-6">
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-2 text-white/40 text-xs font-body mb-3">
          <Link to="/" className="hover:text-white/70 transition">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-white/70">Contact</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Get In Touch
        </h1>
        <p className="mt-2 text-white/55 text-base max-w-xl">
          Reach us by phone, WhatsApp, or visit our Hitech City showroom. We're
          available 7 days a week.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`tel:${PHONE_E164}`}
            className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] text-white/70 text-xs px-3 py-1.5 rounded-full hover:bg-white/15 transition"
          >
            <Phone size={12} className="text-red" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] text-white/70 text-xs px-3 py-1.5 rounded-full hover:bg-white/15 transition"
          >
            <MessageCircle size={12} className="text-[#25D366]" />
            WhatsApp
          </a>
          <span className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] text-white/70 text-xs px-3 py-1.5 rounded-full">
            <Clock size={12} className="text-red" />
            Mon–Sat 10AM–8PM
          </span>
        </div>
      </motion.div>
    </section>
  );
}
