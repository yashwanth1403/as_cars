import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, IndianRupee, Banknote } from "lucide-react";

const STEPS = [
  {
    Icon: ClipboardList,
    title: "Fill the Form",
    desc: "Share your car's details — brand, model, year, and condition in under 2 minutes.",
  },
  {
    Icon: IndianRupee,
    title: "Get Free Valuation",
    desc: "Our experts evaluate your car and give you the best market price. No obligation.",
  },
  {
    Icon: Banknote,
    title: "Get Paid Instantly",
    desc: "Accept the offer and receive payment on the same day. We handle all paperwork.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="bg-surface py-16 px-6 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-red-light border border-red/20 text-red text-xs font-display font-bold tracking-[0.18em] rounded-full px-3 py-1 mb-4 inline-block">
            HOW IT WORKS
          </span>
          <h2 className="font-display font-extrabold text-3xl text-text-heading">
            Sell Your Car in 3 Simple Steps
          </h2>
          <p className="text-text-body mt-3">
            No hidden fees. No stress. Just a smooth, fast car sale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          <div
            aria-hidden
            className="absolute top-10 left-[20%] right-[20%] h-px border-t-2 border-dashed border-red/25 hidden sm:block pointer-events-none"
          />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-white rounded-2xl border border-border shadow-card p-7 text-center hover:shadow-card-hover hover:border-red/20 transition duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-red text-white font-display font-extrabold text-xl flex items-center justify-center mx-auto mb-5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="bg-red-light rounded-xl w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <s.Icon size={24} className="text-red" />
              </div>
              <h3 className="font-display font-bold text-lg text-text-heading mt-1">
                {s.title}
              </h3>
              <p className="text-text-body text-sm mt-2 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
