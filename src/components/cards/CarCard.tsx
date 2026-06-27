import { Link } from "@tanstack/react-router";
import { Gauge, Fuel, Settings, Heart, ShieldCheck } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatKm, formatPrice } from "@/data/cars";

interface Props {
  car: Car;
  variant?: "default" | "compact";
}

const tagColor = (tag: Car["tag"]) => {
  if (tag === "New Arrival") return "bg-dark";
  if (tag === "Best Value") return "bg-success";
  return "bg-red"; // Hot Deal default
};

export default function CarCard({ car }: Props) {
  return (
    <Link
      to="/cars/$slug"
      params={{ slug: car.slug }}
      className="group block bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <img
          src={car.images[0]}
          alt={car.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {car.tag && (
          <span
            className={`absolute top-3 left-3 ${tagColor(
              car.tag
            )} text-white text-[10px] font-display font-bold tracking-wider px-2.5 py-1 rounded-md uppercase`}
          >
            {car.tag}
          </span>
        )}
        <button
          type="button"
          aria-label="Save to wishlist"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-text-muted hover:text-red transition-colors"
        >
          <Heart size={15} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex gap-2">
          <span className="bg-red-light text-red text-[11px] font-semibold px-2 py-0.5 rounded-md font-display">
            {car.brand}
          </span>
          <span className="bg-surface text-text-muted text-[11px] px-2 py-0.5 rounded-md">
            {car.year}
          </span>
        </div>

        <h3 className="mt-2 font-display font-bold text-base text-text-heading leading-tight truncate">
          {car.name}
        </h3>

        <div className="mt-2.5 flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Gauge size={13} />
            {formatKm(car.km)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={13} />
            {car.fuel}
          </span>
          <span className="flex items-center gap-1">
            <Settings size={13} />
            {car.transmission}
          </span>
        </div>

        <div className="mt-3 border-t border-border" />

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            {car.offerPrice ? (
              <>
                <div className="font-display font-bold text-xl text-text-heading leading-none">
                  {formatPrice(car.offerPrice)}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="line-through text-text-muted text-xs">{formatPrice(car.price)}</span>
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {Math.round(((car.price - car.offerPrice) / car.price) * 100)}% OFF
                  </span>
                </div>
              </>
            ) : (
              <div className="font-display font-bold text-xl text-text-heading leading-none">
                {formatPrice(car.price)}
              </div>
            )}
          </div>
          <span className="shrink-0 bg-red text-white text-xs font-display font-semibold px-3.5 py-2 rounded-lg group-hover:bg-red-dark transition-colors">
            View Car →
          </span>
        </div>

        {car.isVerified && (
          <div className="mt-2.5 flex items-center gap-1 text-success text-[11px] font-semibold">
            <ShieldCheck size={12} />
            AS Cars Verified
          </div>
        )}
      </div>
    </Link>
  );
}
