import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, CheckCircle } from "lucide-react";
import { BUSINESS_NAME } from "@/config/business";

const values = [
  "No hidden costs — price shown is price paid",
  "Every car inspected before listing",
  "Finance, insurance, and RC transfer support",
  "No-pressure buying experience",
];

export default function OurStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-red-light border border-red/20 text-red font-display font-bold text-xs tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-5 inline-block">
            OUR STORY
          </span>
          <h2 className="font-display font-extrabold text-3xl text-text-heading mt-2">
            Born to Make Car Buying Simple in Hyderabad
          </h2>
          <div className="text-text-body text-base leading-relaxed mt-4 space-y-4">
            <p>
              {BUSINESS_NAME} was started with one goal: to make buying a reliable
              used car in Hyderabad easy, transparent, and stress-free. We saw too
              many buyers getting stuck with overpriced or poorly-maintained cars
              sold through complicated middlemen chains.
            </p>
            <p>
              We believe every budget buyer deserves a quality vehicle. Every car
              we list goes through a thorough multi-point inspection and is priced
              fairly — no hidden costs, no pressure tactics.
            </p>
            <p>
              Whether you're buying your first car or upgrading the family vehicle,
              our team at Hitech City is here to guide you from browsing to driving
              away happy.
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {values.map((v) => (
              <li
                key={v}
                className="flex items-center gap-3 text-text-body text-sm"
              >
                <CheckCircle size={16} className="text-success flex-shrink-0" />
                {v}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-surface border border-border"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Building2 size={48} className="text-red/30" />
            <span className="text-text-muted text-sm">Showroom Photo</span>
            <span className="text-text-muted text-xs">Hitech City, Hyderabad</span>
          </div>
          <div className="absolute top-4 left-4 bg-red text-white text-xs font-display font-bold px-3 py-1.5 rounded-lg">
            Hitech City Showroom
          </div>
        </motion.div>
      </div>
    </section>
  );
}
