import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Gauge,
  Fuel,
  Settings,
  Users,
  Banknote,
  Car as CarIcon,
  Phone,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import SiteLayout from "@/components/layout/SiteLayout";
import CarCard from "@/components/cards/CarCard";
import { formatKm, formatPrice } from "@/data/cars";
import { fetchPublicCars, fetchCarBySlugOrId } from "@/lib/supabase/cars";
import { toPublicCar, toCarSlug, applyHotDealTags } from "@/lib/supabase/mappers";

export const Route = createFileRoute("/cars/$slug")({
  loader: async ({ params }) => {
    try {
      const raw = await fetchCarBySlugOrId(params.slug);
      if (!raw) return { car: null };
      return { car: toPublicCar(raw) };
    } catch {
      return { car: null };
    }
  },
  head: ({ loaderData }) => {
    const car = loaderData?.car;
    if (!car) {
      return {
        meta: [
          { title: "Car Not Found | AS Cars" },
          { name: "robots", content: "noindex,nofollow" },
        ],
      };
    }
    const slug = toCarSlug(car);
    const displayPrice = car.offerPrice ?? car.price;
    const priceStr =
      displayPrice >= 100000
        ? `₹${(displayPrice / 100000).toFixed(1)}L`
        : `₹${displayPrice.toLocaleString("en-IN")}`;
    const title = `${car.year} ${car.name} — ${priceStr} | AS Cars Hyderabad`;
    const desc = `Buy verified ${car.year} ${car.name} in Hyderabad at ${priceStr}. ${car.km.toLocaleString("en-IN")} km, ${car.fuel}, ${car.transmission}, ${car.owners} owner. Book a test drive at AS Cars Hitech City.`;
    const url = `https://www.ascars.in/cars/${slug}`;
    const image =
      car.images[0] && car.images[0] !== "/placeholder.svg"
        ? car.images[0]
        : "https://www.ascars.in/hero-family.png";

    const vehicleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Vehicle",
      name: `${car.year} ${car.name}`,
      brand: { "@type": "Brand", name: car.brand },
      modelDate: String(car.year),
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: car.km,
        unitCode: "KMT",
      },
      fuelType: car.fuel,
      vehicleTransmission: car.transmission,
      image,
      url,
      offers: {
        "@type": "Offer",
        price: displayPrice,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "AutoDealer", name: "AS Cars", url: "https://www.ascars.in" },
      },
    };

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `${car.name} for sale Hyderabad, buy ${car.brand} Hyderabad, ${car.year} ${car.name} used car, pre-owned ${car.brand} Hitech City`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:type", content: "product" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(vehicleJsonLd) }],
    };
  },
  component: CarDetail,
});

const PHONE = "919392583393";

function deriveBodyType(name: string): string {
  const n = name.toLowerCase();
  if (/(creta|seltos|nexon|xuv|innova|brezza|venue|harrier)/.test(n)) return "SUV";
  if (/(city|amaze|verna|dzire|ciaz)/.test(n)) return "Sedan";
  return "Hatchback";
}

function CarDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  const { data: rawCars = [], isLoading } = useQuery({
    queryKey: ["public-cars"],
    queryFn: fetchPublicCars,
  });

  const allCars = useMemo(() => applyHotDealTags(rawCars.map(toPublicCar)), [rawCars]);
  const car = useMemo(
    () => allCars.find((c) => c.slug === slug || c.id === slug),
    [allCars, slug],
  );

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");

  const similarCars = useMemo(() => {
    if (!car) return [];
    let list = allCars.filter((c) => c.brand === car.brand && c.slug !== car.slug);
    if (list.length < 3) {
      list = [...list, ...allCars.filter((c) => c.slug !== car.slug && !list.includes(c))];
    }
    return list.slice(0, 3);
  }, [car, allCars]);


  if (isLoading) {
    return (
      <SiteLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red border-t-transparent rounded-full animate-spin" />
        </div>
      </SiteLayout>
    );
  }

  if (!car) {
    return (
      <SiteLayout>
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
          <CarIcon size={48} className="text-red mb-4" />
          <h1 className="font-display font-extrabold text-3xl text-text-heading">Car not found</h1>
          <p className="text-text-body mt-2">This car may have been sold or doesn't exist.</p>
          <button
            onClick={() => navigate({ to: "/cars" })}
            className="mt-6 bg-red text-white font-display font-semibold px-6 py-3 rounded-xl hover:bg-red-dark transition-colors"
          >
            Back to Inventory
          </button>
        </section>
      </SiteLayout>
    );
  }

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in a test drive for ${car.name} ${car.year}. Car: ${typeof window !== "undefined" ? window.location.href : `https://www.ascars.in/cars/${toCarSlug(car)}`}`,
  );
  const waLink = `https://wa.me/${PHONE}?text=${waMessage}`;

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-dark py-5 px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <nav className="flex items-center gap-2 text-white/50 text-xs font-body">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link to="/cars" className="hover:text-white transition-colors">Buy Cars</Link>
            <ChevronRight size={10} />
            <span className="text-white/80">{car.name}</span>
          </nav>
          <h1 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-white">
            {car.year} {car.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {car.tag && (
              <span className="bg-red text-white text-[10px] font-display font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                {car.tag}
              </span>
            )}
            {car.isVerified && (
              <span className="bg-success-bg text-success text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                <ShieldCheck size={10} />
                AS Cars Verified
              </span>
            )}
            <span className="bg-white/10 text-white/70 text-[10px] px-2.5 py-1 rounded-md">{car.year}</span>
            <span className="bg-white/10 text-white/70 text-[10px] px-2.5 py-1 rounded-md">{car.fuel}</span>
          </div>
        </motion.div>
      </section>

      {/* Main detail */}
      <section className="bg-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* LEFT */}
          <div>
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-surface">
              <img src={car.images[activeImage]} alt={car.name} className="w-full h-full object-cover" />
              {car.tag && (
                <span className="absolute top-4 left-4 bg-red text-white text-xs font-display font-bold tracking-wider px-3 py-1.5 rounded-lg uppercase">
                  {car.tag}
                </span>
              )}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i === 0 ? car.images.length - 1 : i - 1))}
                    aria-label="Previous image"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-8 bg-black/20 hover:bg-black/35 flex items-center justify-center transition rounded-r-lg"
                  >
                    <ChevronLeft size={22} className="text-white drop-shadow" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i === car.images.length - 1 ? 0 : i + 1))}
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-8 bg-black/20 hover:bg-black/35 flex items-center justify-center transition rounded-l-lg"
                  >
                    <ChevronRight size={22} className="text-white drop-shadow" />
                  </button>
                </>
              )}
            </div>

            {car.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 border-2 transition ${
                      i === activeImage ? "border-red" : "border-transparent hover:border-red/50"
                    }`}
                  >
                    <img src={src} alt="" className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-2 text-text-muted text-xs font-body text-right">
              {activeImage + 1} / {car.images.length}
            </p>

            {/* Mobile price panel */}
            <div className="lg:hidden mt-5 bg-white rounded-2xl border border-border shadow-card p-5">
              <div className="mb-3">
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">{car.brand} · {car.year}</p>
                <h2 className="font-display font-extrabold text-lg text-text-heading leading-tight mt-0.5">{car.name}</h2>
              </div>
              <div className="border-t border-border mb-4" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  {car.offerPrice ? (
                    <>
                      <div className="font-display font-extrabold text-2xl text-text-heading">{formatPrice(car.offerPrice)}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="line-through text-text-muted text-sm">{formatPrice(car.price)}</span>
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {Math.round(((car.price - car.offerPrice) / car.price) * 100)}% OFF
                        </span>
                      </div>
                      <div className="text-success text-xs font-semibold mt-0.5">
                        You save {formatPrice(car.price - car.offerPrice)}
                      </div>
                    </>
                  ) : (
                    <div className="font-display font-extrabold text-2xl text-text-heading">{formatPrice(car.price)}</div>
                  )}
                </div>
                {!car.offerPrice && (
                  <span className="bg-success-bg text-success text-[10px] font-display font-bold px-2 py-0.5 rounded-md shrink-0">Best Price</span>
                )}
              </div>
              {car.financePercent && (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                    <Banknote size={12} />
                    Up to {car.financePercent}% finance available
                  </span>
                </div>
              )}
              <div className="mt-4 space-y-2.5">
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="bg-red text-white w-full py-3 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-dark transition">
                  <CarIcon size={16} />Book a Test Drive
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={`tel:+${PHONE}`}
                    className="border-2 border-border text-text-heading py-2.5 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 hover:border-red hover:text-red transition">
                    <Phone size={15} className="text-red" />Call
                  </a>
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="bg-[#25D366] text-white py-2.5 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1EA855] transition">
                    <svg viewBox="0 0 32 32" className="w-4 h-4 shrink-0" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.563.658 4.972 1.806 7.07L2 30l7.13-1.869A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.07 19.77c-.295.833-1.46 1.525-2.4 1.726-.638.136-1.472.244-4.28-.92-3.593-1.468-5.908-5.118-6.085-5.356-.172-.239-1.437-1.912-1.437-3.648s.905-2.588 1.245-2.943c.295-.304.782-.443 1.25-.443.151 0 .287.008.409.014.358.016.537.037.774.6.295.705 1.012 2.44 1.099 2.617.088.177.176.414.052.657-.117.249-.22.36-.397.564-.177.204-.345.36-.522.58-.162.196-.346.405-.14.762.205.35.913 1.503 1.958 2.433 1.344 1.2 2.438 1.578 2.836 1.735.295.117.644.088.856-.138.268-.29.6-.769.938-1.244.24-.337.544-.38.864-.26.326.112 2.052.968 2.404 1.144.352.177.587.264.673.41.085.147.085.849-.21 1.682z"/></svg>WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex border-b border-border mb-6">
                {(["overview", "specs"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-5 py-3 font-display font-semibold text-sm capitalize transition ${
                      activeTab === key ? "text-red border-b-2 border-red -mb-[2px]" : "text-text-muted hover:text-text-body"
                    }`}
                  >
                    {key === "specs" ? "Specifications" : "Overview"}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { Icon: Gauge, value: formatKm(car.km), label: "Kilometres" },
                      { Icon: Fuel, value: car.fuel, label: "Fuel Type" },
                      { Icon: Settings, value: car.transmission, label: "Transmission" },
                      { Icon: Users, value: `${car.owners} Owner${car.owners > 1 ? "s" : ""}`, label: "Ownership" },
                    ].map(({ Icon, value, label }) => (
                      <div key={label} className="bg-surface rounded-xl p-4 text-center border border-border">
                        <Icon size={20} className="text-red mx-auto" />
                        <div className="font-display font-bold text-base text-text-heading mt-2">{value}</div>
                        <div className="text-text-muted text-xs mt-0.5 font-body">{label}</div>
                      </div>
                    ))}
                  </div>
                  {car.description && (
                    <div className="mt-6">
                      <h3 className="font-display font-bold text-lg text-text-heading mb-3">About This Car</h3>
                      <p className="text-text-body text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "specs" && (
                <div className="divide-y divide-border">
                  {[
                    ["Make", car.brand], ["Model", car.name], ["Year", car.year],
                    ["Fuel Type", car.fuel], ["Transmission", car.transmission],
                    ["Kilometres", formatKm(car.km)],
                    ["Ownership", `${car.owners}${car.owners === 1 ? "st" : "nd"} Owner`],
                    ["Body Type", deriveBodyType(car.name)],
                    ["Insurance", "Valid (Comprehensive)"], ["Registration", "Hyderabad (TS)"],
                  ].map(([k, v]) => (
                    <div key={String(k)} className="grid grid-cols-2 py-3 text-sm">
                      <span className="text-text-muted font-body">{k}</span>
                      <span className="text-text-heading font-semibold font-body">{v}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* RIGHT — sticky price panel */}
          <aside className="lg:sticky lg:top-[120px] self-start">
            <div className="bg-white rounded-2xl border border-border shadow-card p-6">
              <div className="hidden lg:block">
                <div className="mb-3">
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wider">{car.brand} · {car.year}</p>
                  <h2 className="font-display font-extrabold text-xl text-text-heading leading-tight mt-0.5">{car.name}</h2>
                </div>
                <div className="border-t border-border mb-4" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {car.offerPrice ? (
                      <>
                        <div className="font-display font-extrabold text-3xl text-text-heading">{formatPrice(car.offerPrice)}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="line-through text-text-muted text-sm">{formatPrice(car.price)}</span>
                          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {Math.round(((car.price - car.offerPrice) / car.price) * 100)}% OFF
                          </span>
                        </div>
                        <div className="text-success text-xs font-semibold mt-0.5">
                          You save {formatPrice(car.price - car.offerPrice)}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-display font-extrabold text-3xl text-text-heading">{formatPrice(car.price)}</div>
                        <div className="text-text-muted text-xs mt-0.5">Fixed price, inclusive of all taxes</div>
                      </>
                    )}
                  </div>
                  {!car.offerPrice && (
                    <span className="bg-success-bg text-success text-[10px] font-display font-bold px-2 py-0.5 rounded-md shrink-0">Best Price</span>
                  )}
                </div>
                {car.financePercent && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                      <Banknote size={12} />
                      Up to {car.financePercent}% finance available
                    </span>
                  </div>
                )}
                <div className="mt-5 border-t border-border" />
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[{ v: formatKm(car.km), l: "KM Done" }, { v: car.fuel, l: "Fuel" }, { v: car.transmission, l: "Gearbox" }].map((s) => (
                    <div key={s.l} className="bg-surface rounded-lg py-3 px-2">
                      <div className="font-display font-bold text-sm text-text-heading">{s.v}</div>
                      <div className="text-text-muted text-[10px] mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-3">
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="bg-red text-white w-full py-3.5 rounded-xl font-display font-bold text-base flex items-center justify-center gap-2 hover:bg-red-dark hover:shadow-red-glow transition">
                    <CarIcon size={18} />Book a Test Drive
                  </a>
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="bg-[#25D366] text-white w-full py-3 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1EA855] transition">
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.563.658 4.972 1.806 7.07L2 30l7.13-1.869A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.07 19.77c-.295.833-1.46 1.525-2.4 1.726-.638.136-1.472.244-4.28-.92-3.593-1.468-5.908-5.118-6.085-5.356-.172-.239-1.437-1.912-1.437-3.648s.905-2.588 1.245-2.943c.295-.304.782-.443 1.25-.443.151 0 .287.008.409.014.358.016.537.037.774.6.295.705 1.012 2.44 1.099 2.617.088.177.176.414.052.657-.117.249-.22.36-.397.564-.177.204-.345.36-.522.58-.162.196-.346.405-.14.762.205.35.913 1.503 1.958 2.433 1.344 1.2 2.438 1.578 2.836 1.735.295.117.644.088.856-.138.268-.29.6-.769.938-1.244.24-.337.544-.38.864-.26.326.112 2.052.968 2.404 1.144.352.177.587.264.673.41.085.147.085.849-.21 1.682z"/></svg>WhatsApp Enquiry
                  </a>
                  <a href={`tel:+${PHONE}`}
                    className="border-2 border-border text-text-heading w-full py-3 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 hover:border-red hover:text-red transition">
                    <Phone size={16} className="text-red" />Call Directly
                  </a>
                </div>
                <div className="mt-5 border-t border-border" />
              </div>

            </div>
          </aside>
        </div>
      </section>

      {similarCars.length > 0 && (
        <section className="bg-surface py-12 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-heading mb-6">Similar Cars You May Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similarCars.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
