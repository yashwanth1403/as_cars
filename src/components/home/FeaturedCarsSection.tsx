import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicCars } from "@/lib/supabase/cars";
import { toPublicCar, applyHotDealTags } from "@/lib/supabase/mappers";
import CarCard from "@/components/cards/CarCard";

export default function FeaturedCarsSection() {
  const { data: rawCars = [], isLoading } = useQuery({
    queryKey: ["public-cars"],
    queryFn: fetchPublicCars,
  });

  const featured = applyHotDealTags(rawCars.map(toPublicCar)).slice(0, 4);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-light text-red text-xs font-display font-bold tracking-[0.18em] px-3 py-1 rounded-full uppercase mb-4">
            Featured Cars
          </span>
          <h2 className="font-display font-extrabold text-4xl text-text-heading">
            Handpicked Just For You
          </h2>
          <p className="text-text-body mt-3 max-w-md mx-auto text-base leading-relaxed">
            Each car is inspected, verified, and priced fairly. No hidden costs.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-surface" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featured.map((car) => (
              <motion.div
                key={car.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/cars"
            className="inline-block border-2 border-red text-red font-display font-semibold px-8 py-3 rounded-xl hover:bg-red hover:text-white transition-colors duration-200"
          >
            View All {rawCars.length}+ Cars →
          </Link>
        </div>
      </div>
    </section>
  );
}
