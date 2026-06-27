import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle,
  IndianRupee,
  Clock,
  Users,
  Star,
} from "lucide-react";

export default function SellHeroSection() {
  const scrollToForm = () => {
    document.getElementById("sell-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-dark relative overflow-hidden py-16 px-6 min-h-[380px]">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 w-1/2 pointer-events-none"
        style={{
          right: "-100px",
          background:
            "linear-gradient(135deg, transparent 40%, rgba(228,25,25,0.12) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="bg-red/15 border border-red/25 text-red-muted text-xs font-display font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-5">
            <TrendingUp size={12} />
            GET BEST PRICE FOR YOUR CAR
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1]">
            Sell Your Car. <br />
            <span className="text-red">Get Paid Today.</span>
          </h1>
          <p className="mt-4 text-white/60 text-base leading-relaxed max-w-md">
            Free instant valuation. Zero paperwork. Same-day payment. Trusted by 500+ Hyderabad
            car owners.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {["Free Valuation", "Same-Day Payment", "Any Brand Accepted"].map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 bg-white/10 border border-white/15 text-white/70 text-xs font-body px-3 py-1.5 rounded-full"
              >
                <CheckCircle size={12} className="text-success" />
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={scrollToForm}
            className="mt-8 bg-red text-white font-display font-bold px-7 py-3.5 rounded-xl shadow-red-glow hover:bg-red-dark hover:scale-[1.02] transition"
          >
            Get My Car Valued →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-2 rounded-2xl border border-white/10 p-7 w-full max-w-xs"
        >
          <div className="text-white/40 text-[10px] font-display tracking-widest uppercase mb-6">
            Quick Stats
          </div>
          <div className="space-y-5">
            {[
              { Icon: IndianRupee, label: "Avg. Selling Price", value: "₹6.5L" },
              { Icon: Clock, label: "Time to Sell", value: "< 48 hrs" },
              { Icon: Users, label: "Cars Sold", value: "500+" },
              { Icon: Star, label: "Seller Rating", value: "4.9 / 5" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-white/60 text-sm font-body">
                  <Icon size={20} className="text-red" />
                  {label}
                </span>
                <span className="font-display font-bold text-xl text-white">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
