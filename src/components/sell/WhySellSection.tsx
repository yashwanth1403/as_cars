import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  IndianRupee,
  Clock,
  FileText,
  ShieldCheck,
  Home,
  Star,
} from "lucide-react";

const CARDS = [
  { Icon: IndianRupee, title: "Best Market Price", desc: "We benchmark against 50+ data points to give you the highest possible offer." },
  { Icon: Clock, title: "48-Hour Sale", desc: "From enquiry to payment in under 48 hours. One of the fastest in Hyderabad." },
  { Icon: FileText, title: "Zero Paperwork", desc: "We handle the RC transfer, NOC, insurance cancellation — everything." },
  { Icon: ShieldCheck, title: "No Hidden Charges", desc: "The price we quote is what you get. No deductions, no last-minute surprises." },
  { Icon: Home, title: "Doorstep Service", desc: "Our team comes to your home or office for inspection. You don't move." },
  { Icon: Star, title: "500+ Happy Sellers", desc: "Rated 4.9★ on Google by real customers who sold their cars with us." },
];

export default function WhySellSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="bg-dark py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-red/15 border border-red/25 text-red-muted text-xs font-display font-bold tracking-[0.18em] rounded-full px-3 py-1 mb-4 inline-block">
            WHY CHOOSE AS CARS
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white">
            The Smarter Way to Sell in Hyderabad
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-dark-2 rounded-2xl border border-white/10 p-6 hover:border-red/30 transition duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-red/15 flex items-center justify-center mb-4 group-hover:bg-red/25 transition">
                <c.Icon size={20} className="text-red-muted" />
              </div>
              <h3 className="font-display font-bold text-base text-white mt-1">{c.title}</h3>
              <p className="text-white/50 text-sm mt-2 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
