import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: "10+",
    label: "Cars Available Weekly",
    desc: "Fresh inventory added every week",
  },
  {
    value: "500+",
    label: "Happy Customers",
    desc: "Buyers and sellers who trust AS Cars",
  },
  {
    value: "2 Days",
    label: "Avg. Loan Approval",
    desc: "Quick finance via partner banks",
  },
  {
    value: "4.9★",
    label: "Google Rating",
    desc: "Consistently rated by our customers",
  },
];

export default function BusinessHighlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-dark py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-red/15 border border-red/25 text-red-muted font-display font-bold text-xs tracking-[0.18em] uppercase px-3 py-1 rounded-full inline-block mb-4">
            OUR TRACK RECORD
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white">
            Numbers That Speak for Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="bg-dark-2 rounded-2xl border border-white/[0.08] p-7 text-center hover:border-red/30 transition group"
            >
              <p className="font-display font-extrabold text-4xl sm:text-5xl text-red mt-2">
                {s.value}
              </p>
              <p className="font-display font-bold text-base text-white mt-2">
                {s.label}
              </p>
              <p className="text-white/45 text-xs mt-1 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
