import { motion } from "framer-motion";
import { Car, ShieldCheck, Star, Banknote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Car, value: "500+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "100%", label: "Verified Cars" },
  { icon: Star, value: "4.9★", label: "Google Rating" },
  { icon: Banknote, value: "Easy", label: "Finance Available" },
];

export default function TrustBarSection() {
  return (
    <section className="bg-dark py-5 border-y border-white/10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6"
      >
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-3 flex-1 min-w-[180px]">
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <span className="w-10 h-10 rounded-full bg-red/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-red-muted" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-display font-bold text-xl text-white">
                    {stat.value}
                  </span>
                  <span className="text-white/50 text-xs">{stat.label}</span>
                </div>
              </motion.div>
              {i < STATS.length - 1 && (
                <span className="hidden lg:block w-px h-8 bg-white/10 ml-auto" />
              )}
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
