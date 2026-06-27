import { motion } from "framer-motion";
import { ShieldCheck, Banknote, FileText, IndianRupee } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ShieldCheck,
    title: "200-Point Inspection",
    desc: "Every car goes through our rigorous multi-point quality check before listing.",
  },
  {
    icon: Banknote,
    title: "Easy Finance",
    desc: "Get approved for a car loan in 24 hours. Competitive rates, minimal paperwork.",
  },
  {
    icon: FileText,
    title: "Verified History",
    desc: "Full ownership history, insurance records, and accident-free certification.",
  },
  {
    icon: IndianRupee,
    title: "Budget Friendly",
    desc: "Cars across every budget starting ₹2L. No hidden costs, transparent pricing always.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-red/20 text-red-muted text-xs font-display font-bold tracking-[0.18em] px-3 py-1 rounded-full uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display font-extrabold text-4xl text-white">
            The AS Cars Difference
          </h2>
          <p className="text-white/55 mt-3 max-w-md mx-auto">
            We make buying a used car as simple, safe, and satisfying as possible.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group bg-dark-2 rounded-2xl border border-white/10 p-7 hover:border-red/40 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-red/20 flex items-center justify-center mb-5 group-hover:bg-red/35 transition-colors">
                  <Icon size={22} className="text-red-muted" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mt-4">
                  {f.title}
                </h3>
                <p className="text-white/55 text-sm mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
