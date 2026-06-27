import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Building2, CheckCircle, Car, Users, Star, Clock } from "lucide-react";
import { BUSINESS_NAME } from "@/config/business";

const chips = [
  "500+ Happy Customers",
  "Hitech City Showroom",
  "5★ Rated on Google",
];

const stats = [
  { Icon: Car, label: "Cars Sold", value: "500+" },
  { Icon: Users, label: "Happy Customers", value: "500+" },
  { Icon: Star, label: "Google Rating", value: "4.9 ★" },
  { Icon: Clock, label: "Years in Business", value: "4+" },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-dark min-h-[360px] py-16 px-6">
      <div
        className="absolute top-0 bottom-0 w-[45%] pointer-events-none z-0"
        style={{
          right: "-80px",
          background:
            "linear-gradient(135deg, transparent 40%, rgba(228,25,25,0.10) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl flex-1"
        >
          <span className="inline-flex items-center gap-2 bg-red/15 border border-red/25 text-red-muted text-xs font-display font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-5">
            <Building2 size={12} />
            ABOUT AS CARS
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1]">
            Hyderabad's Most <span className="text-red">Trusted</span> Used Car Dealer
          </h1>
          <p className="mt-4 text-white/60 text-base leading-relaxed max-w-md">
            {BUSINESS_NAME} was built to make buying and selling used cars in Hyderabad
            simple, transparent, and stress-free. Based in Hitech City since 2020.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {chips.map((c) => (
              <span
                key={c}
                className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] text-white/70 text-xs font-body px-3 py-1.5 rounded-full"
              >
                <CheckCircle size={12} className="text-success" />
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cars"
              className="bg-red text-white font-display font-bold px-7 py-3.5 rounded-xl shadow-red-glow hover:bg-red-dark transition"
            >
              Browse Cars →
            </Link>
            <Link
              to="/contact"
              className="border border-white/25 text-white font-display font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-dark-2 rounded-2xl border border-white/10 p-7 max-w-xs w-full"
        >
          <p className="text-white/35 text-[10px] font-display tracking-widest uppercase mb-6">
            OUR NUMBERS
          </p>
          <div className="space-y-5">
            {stats.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-red" />
                  <span className="text-white/55 text-sm font-body">{label}</span>
                </div>
                <span className="font-display font-bold text-2xl text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
