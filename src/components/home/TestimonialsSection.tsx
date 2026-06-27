import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ravi Kumar",
    location: "Madhapur, Hyderabad",
    text: "Bought a Hyundai Creta from AS Cars and the experience was seamless. The car was exactly as described — no surprises. Got a great EMI deal too!",
    rating: 5,
    initials: "RK",
    carBought: "Hyundai Creta 2021",
  },
  {
    name: "Priya Sharma",
    location: "Gachibowli, Hyderabad",
    text: "Sold my old Swift in just 2 days! Fair price, zero paperwork hassle. The team at Hitech City was incredibly professional and transparent.",
    rating: 5,
    initials: "PS",
    carBought: "Sold Maruti Swift",
  },
  {
    name: "Mohammed Farhan",
    location: "Kondapur, Hyderabad",
    text: "Was looking for a reliable family car under budget. AS Cars team helped me find the perfect Innova Crysta. Thorough inspection report gave me full confidence.",
    rating: 5,
    initials: "MF",
    carBought: "Toyota Innova 2021",
  },
  {
    name: "Damerax Cloud Solutions",
    location: "Hyderabad",
    text: "At AS Cars they take time, till you get the perfect car as per your requirements. Service is great, as they treat every customer as their first customer. Take your time, do not get tempted for cheap cars somewhere.",
    rating: 5,
    initials: "DC",
    carBought: "Google Review",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-light text-red text-xs font-display font-bold tracking-[0.18em] px-3 py-1 rounded-full uppercase mb-4">
            Testimonials
          </span>
          <h2 className="font-display font-extrabold text-4xl text-text-heading">
            What Our Customers Say
          </h2>
          <p className="text-text-body mt-3">
            Real stories from real buyers across Hyderabad.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-2xl border border-border p-7 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-warning fill-warning" />
                  ))}
                </div>
                <span className="text-red/30 text-4xl font-display leading-none">
                  &ldquo;
                </span>
                <p className="text-text-body text-sm leading-relaxed mt-1 italic">
                  {t.text}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-red text-white font-display font-bold text-sm flex items-center justify-center shrink-0">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-sm text-text-heading truncate">
                    {t.name}
                  </div>
                  <div className="text-text-muted text-xs mt-0.5 truncate">
                    {t.location}
                  </div>
                </div>
                <span className="ml-auto bg-red-light text-red text-[10px] font-display font-semibold px-2 py-0.5 rounded-md whitespace-nowrap">
                  {t.carBought}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
