import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const BRANDS: { name: string; logo?: string }[] = [
  { name: "Maruti",     logo: "/carLogos/suzuki.png" },
  { name: "Hyundai",   logo: "/carLogos/Hyundai.png" },
  { name: "Honda",     logo: "/carLogos/Honda.png" },
  { name: "Toyota",    logo: "/carLogos/toyota.png" },
  { name: "Tata",      logo: "/carLogos/Tata.png" },
  { name: "Kia",       logo: "/carLogos/kia.png" },
  { name: "Mahindra",  logo: "/carLogos/Mahindra.png" },
  { name: "Ford",      logo: "/carLogos/ford.png" },
  { name: "Volkswagen", logo: "/carLogos/wolkswagen.png" },
];

export default function BrowseByBrandSection() {
  return (
    <section className="bg-surface py-16 px-6 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-red-light text-red text-xs font-display font-bold tracking-[0.18em] px-3 py-1 rounded-full uppercase mb-4">
            Browse By Brand
          </span>
          <h2 className="font-display font-bold text-3xl text-text-heading">
            Find Your Favourite Brand
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="flex flex-wrap justify-center gap-3"
        >
          {BRANDS.map((brand) => (
            <motion.div
              key={brand.name}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Link
                to="/cars"
                search={{ brand: brand.name }}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white border border-border hover:border-red hover:bg-red-light transition-all duration-200"
              >
                <span className="w-10 h-10 rounded-full bg-red-light flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-white transition-colors">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    <span className="text-red font-display font-bold text-base">
                      {brand.name.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="font-display font-semibold text-base text-text-heading group-hover:text-red transition-colors">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
