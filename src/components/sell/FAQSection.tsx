import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How long does it take to sell my car?",
    a: "Most cars are sold within 24–48 hours of receiving the valuation request. Once you accept our offer, payment is processed on the same day.",
  },
  {
    q: "What documents do I need to sell my car?",
    a: "You need the RC book (Registration Certificate), valid insurance, PAN card, Aadhaar card, and any loan NOC if applicable. We guide you through everything.",
  },
  {
    q: "Do you accept all brands and models?",
    a: "Yes! We accept all major brands including Maruti, Hyundai, Honda, Toyota, Tata, Kia, Mahindra, and more. Any condition, any model, any year from 2010 onwards.",
  },
  {
    q: "How is the car valuation done?",
    a: "Our team conducts a thorough inspection covering body condition, engine health, interiors, tyres, and service history. We compare with current market prices to give you the best offer.",
  },
  {
    q: "Is the valuation really free?",
    a: "Yes, 100% free with zero obligation. You can get your car valued and still choose not to sell — no pressure, no charges.",
  },
  {
    q: "How and when do I receive payment?",
    a: "Payment is made via NEFT/RTGS bank transfer on the same day you accept the offer and complete the documentation. Usually within 2–4 hours.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="bg-surface py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-red-light border border-red/20 text-red text-xs font-display font-bold tracking-[0.18em] rounded-full px-3 py-1 mb-4 inline-block">
            FAQ
          </span>
          <h2 className="font-display font-extrabold text-3xl text-text-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const open = openIndex === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-red-light transition text-left"
                >
                  <span className="font-display font-semibold text-base text-text-heading">
                    {f.q}
                  </span>
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-red" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-text-body text-sm leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
