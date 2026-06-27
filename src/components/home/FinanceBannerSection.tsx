import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function FinanceBannerSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-red py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg"
        >
          <span className="text-white/70 text-xs font-display font-bold tracking-[0.18em] uppercase">
            Easy Car Finance
          </span>
          <h2 className="font-display font-extrabold text-4xl text-white mt-2 leading-tight">
            Own Your Car Starting at
          </h2>
          <div className="flex items-end gap-3 mt-2">
            <span className="font-display font-extrabold text-6xl text-white leading-none">
              ₹6,999
            </span>
            <span className="bg-white/20 text-white text-xs font-display font-semibold px-2 py-0.5 rounded mb-2">
              /month EMI
            </span>
          </div>
          <p className="text-white/80 text-sm mt-4 leading-relaxed">
            Low down payment · Quick approval in 24 hrs · All major banks accepted
          </p>
          <ul className="mt-5 space-y-2">
            {[
              "No prepayment penalty",
              "Loans from ₹1L to ₹50L",
              "Tenure up to 84 months",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 text-white/85 text-sm">
                <CheckCircle size={14} className="text-white shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-7 shadow-card max-w-sm w-full"
        >
          <h3 className="font-display font-bold text-xl text-text-heading">
            Check Your Eligibility
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Takes less than 2 minutes. No documents needed.
          </p>

          {submitted ? (
            <div className="mt-5 bg-success-bg border border-success/20 text-success rounded-lg px-4 py-5 text-sm font-display font-semibold text-center">
              ✓ We&apos;ll call you within 2 hours!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red transition"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red transition"
              />
              <button
                type="submit"
                className="w-full bg-red text-white py-3 rounded-lg font-display font-semibold hover:bg-red-dark transition-colors shadow-red-glow"
              >
                Check Eligibility
              </button>
            </form>
          )}

          <p className="text-text-muted text-[10px] mt-3 text-center">
            By submitting you agree to be contacted by AS Cars.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
