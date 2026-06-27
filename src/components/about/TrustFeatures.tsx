import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BadgeIndianRupee,
  ShieldCheck,
  Handshake,
  Car,
  FileCheck,
} from "lucide-react";

const items = [
  {
    Icon: BadgeIndianRupee,
    title: "Transparent Pricing",
    desc: "No hidden charges. The price you see is what you pay.",
  },
  {
    Icon: ShieldCheck,
    title: "Verified Used Cars",
    desc: "Multi-point inspection on every car before it's listed.",
  },
  {
    Icon: Handshake,
    title: "Loan Assistance",
    desc: "Trusted bank and NBFC connections for hassle-free finance.",
  },
  {
    Icon: Car,
    title: "Insurance Support",
    desc: "Comprehensive or third-party insurance arranged before you drive.",
  },
  {
    Icon: FileCheck,
    title: "RC Transfer Support",
    desc: "We handle all paperwork and RC transfer end-to-end.",
  },
];

export default function TrustFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="bg-surface py-16 px-6 border-y border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-red-light border border-red/20 text-red font-display font-bold text-xs tracking-[0.18em] uppercase px-3 py-1 rounded-full inline-block">
            WHY CUSTOMERS TRUST US
          </span>
          <h2 className="font-display font-extrabold text-3xl text-text-heading mt-3">
            Everything You Need for a Smooth Car Deal
          </h2>
          <p className="text-text-body mt-3">
            From transparent pricing to paperwork — we handle every step.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {items.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border shadow-card p-6 text-center hover:shadow-card-hover hover:border-red/20 transition duration-300 group"
            >
              <div className="mx-auto mb-4 w-13 h-13 rounded-xl bg-red-light flex items-center justify-center group-hover:bg-red/15 transition" style={{ width: "3.25rem", height: "3.25rem" }}>
                <Icon size={22} className="text-red" />
              </div>
              <h3 className="font-display font-bold text-sm text-text-heading mt-1">
                {title}
              </h3>
              <p className="text-text-muted text-xs mt-2 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
