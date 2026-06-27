import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Star, Banknote, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-dark w-full">
      {/* Hero family image — right side, desktop only */}
      <div className="absolute inset-y-0 right-0 w-[62%] hidden lg:block">
        <img
          src="/hero-family.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-right"
        />
        {/* Thin dark fade on left edge only — keeps image clear */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0d0d0d 0%, rgba(13,13,13,0.45) 18%, rgba(13,13,13,0.05) 38%, transparent 55%)",
          }}
        />
      </div>

      {/* Mobile — full portrait image with bottom gradient for text */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src="/hero-family-mobile.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.82) 0%, rgba(13,13,13,0.5) 30%, rgba(13,13,13,0.1) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Left text protection gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-transparent"
        style={{ width: "50%" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 flex items-start lg:items-center min-h-screen pt-16 lg:pt-0">
        <div className="max-w-xl w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-red/15 border border-red/30 text-red-muted text-xs font-display font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full"
          >
            <MapPin size={12} className="text-red-muted" />
            Hitech City, Hyderabad
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl leading-[1.08] text-white mt-4"
          >
            Drive Home Your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #F59090, #ffffff)",
              }}
            >
              Dream Car.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-white/65 text-sm sm:text-lg leading-relaxed max-w-md"
          >
            100+ verified pre-owned cars in Hyderabad. Transparent pricing, easy
            finance, and budget-friendly deals — trusted by 500+ happy families.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/cars"
              className="bg-red text-white font-display font-semibold px-7 py-3.5 rounded-xl shadow-red-glow hover:bg-red-dark hover:scale-[1.02] transition-all duration-150"
            >
              Browse Cars →
            </Link>
            <Link
              to="/sell-car"
              className="border border-white/30 text-white font-display font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Sell My Car
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <span className="flex items-center gap-2 text-white/55 text-sm">
              <ShieldCheck size={15} className="text-success" />
              100% Verified Cars
            </span>
            <span className="flex items-center gap-2 text-white/55 text-sm">
              <Star size={15} className="text-warning" />
              5★ Customer Rating
            </span>
            <span className="flex items-center gap-2 text-white/55 text-sm">
              <Banknote size={15} className="text-red-muted" />
              Easy EMI Options
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/30 text-xs tracking-widest mb-2 font-display">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
