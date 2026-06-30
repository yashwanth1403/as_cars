import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronRight, Car as CarIcon, X, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { useQuery } from "@tanstack/react-query";

import SiteLayout from "@/components/layout/SiteLayout";
import CarCard from "@/components/cards/CarCard";
import {
  BRANDS,
  FUEL_TYPES,
  TRANSMISSIONS,
  YEARS,
  PRICE_RANGES,
} from "@/data/cars";
import type { Car } from "@/data/cars";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchPublicCars } from "@/lib/supabase/cars";
import { toPublicCar, applyHotDealTags } from "@/lib/supabase/mappers";

const searchSchema = z.object({
  brand: fallback(z.string(), "All").default("All"),
});

export const Route = createFileRoute("/cars/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Used Cars for Sale in Hyderabad | Browse Inventory — AS Cars" },
      {
        name: "description",
        content:
          "Explore 100+ certified pre-owned cars in Hyderabad. Filter by brand, price, fuel, and transmission. Maruti, Hyundai, Honda, Toyota, Tata, Kia & more at AS Cars Hitech City.",
      },
      {
        name: "keywords",
        content:
          "used cars for sale Hyderabad, second hand cars Hyderabad, pre-owned Maruti Hyderabad, buy Honda City Hyderabad, car inventory Hitech City",
      },
      { property: "og:title", content: "Used Cars for Sale in Hyderabad — AS Cars" },
      {
        property: "og:description",
        content:
          "Browse certified pre-owned cars in Hyderabad. Filter by brand, price, and fuel type.",
      },
      { property: "og:url", content: "https://ascars.in/cars" },
      { property: "og:image", content: "https://ascars.in/hero-family.png" },
      { name: "twitter:title", content: "Used Cars for Sale in Hyderabad — AS Cars" },
      { name: "twitter:description", content: "Browse certified pre-owned cars in Hyderabad. Filter by brand, price, and fuel type." },
    ],
    links: [{ rel: "canonical", href: "https://ascars.in/cars" }],
  }),
  component: InventoryPage,
});

type SortBy = "default" | "price-asc" | "price-desc" | "year-desc" | "km-asc";

const PAGE_SIZE = 6;

function InventoryPage() {
  const { brand: brandFromUrl } = Route.useSearch();
  const navigate = useNavigate({ from: "/cars" });

  const { data: rawCars = [], isLoading } = useQuery({
    queryKey: ["public-cars"],
    queryFn: fetchPublicCars,
  });

  const allCars = useMemo(() => applyHotDealTags(rawCars.map(toPublicCar)), [rawCars]);

  const [selectedBrand, setSelectedBrand] = useState<string>(brandFromUrl ?? "All");
  const [selectedFuel, setSelectedFuel] = useState<string>("All");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedPriceIdx, setSelectedPriceIdx] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const setBrand = (b: string) => {
    setSelectedBrand(b);
    setVisible(PAGE_SIZE);
    navigate({ search: { brand: b }, replace: true });
  };

  const clearAll = () => {
    setSelectedBrand("All");
    setSelectedFuel("All");
    setSelectedTransmission("All");
    setSelectedYear("All");
    setSelectedPriceIdx(0);
    setSortBy("default");
    setVisible(PAGE_SIZE);
    navigate({ search: { brand: "All" }, replace: true });
  };

  const filteredCars = useMemo(() => {
    const range = PRICE_RANGES[selectedPriceIdx];
    let list: Car[] = allCars.filter((c) => {
      if (selectedBrand !== "All" && c.brand !== selectedBrand) return false;
      if (selectedFuel !== "All" && c.fuel !== selectedFuel) return false;
      if (selectedTransmission !== "All" && c.transmission !== selectedTransmission)
        return false;
      if (selectedYear !== "All" && String(c.year) !== selectedYear) return false;
      if (c.price < range.min || c.price >= range.max) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        list = [...list].sort((a, b) => b.year - a.year);
        break;
      case "km-asc":
        list = [...list].sort((a, b) => a.km - b.km);
        break;
    }
    return list;
  }, [allCars, selectedBrand, selectedFuel, selectedTransmission, selectedYear, selectedPriceIdx, sortBy]);

  const activeFilters: { key: string; label: string; clear: () => void }[] = [];
  if (selectedBrand !== "All")
    activeFilters.push({ key: "brand", label: selectedBrand, clear: () => setBrand("All") });
  if (selectedFuel !== "All")
    activeFilters.push({ key: "fuel", label: selectedFuel, clear: () => setSelectedFuel("All") });
  if (selectedTransmission !== "All")
    activeFilters.push({
      key: "trans",
      label: selectedTransmission,
      clear: () => setSelectedTransmission("All"),
    });
  if (selectedYear !== "All")
    activeFilters.push({
      key: "year",
      label: selectedYear,
      clear: () => setSelectedYear("All"),
    });
  if (selectedPriceIdx !== 0)
    activeFilters.push({
      key: "price",
      label: PRICE_RANGES[selectedPriceIdx].label,
      clear: () => setSelectedPriceIdx(0),
    });

  const sidebar = (
    <FilterSidebar
      selectedBrand={selectedBrand}
      setSelectedBrand={setBrand}
      selectedFuel={selectedFuel}
      setSelectedFuel={(v) => { setSelectedFuel(v); setVisible(PAGE_SIZE); }}
      selectedTransmission={selectedTransmission}
      setSelectedTransmission={(v) => { setSelectedTransmission(v); setVisible(PAGE_SIZE); }}
      selectedYear={selectedYear}
      setSelectedYear={(v) => { setSelectedYear(v); setVisible(PAGE_SIZE); }}
      selectedPriceIdx={selectedPriceIdx}
      setSelectedPriceIdx={(i) => { setSelectedPriceIdx(i); setVisible(PAGE_SIZE); }}
      activeFilters={activeFilters}
      clearAll={clearAll}
    />
  );

  const shown = filteredCars.slice(0, visible);

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-dark py-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Buy Cars</span>
          </nav>
          <h1 className="font-display font-extrabold text-4xl text-white">
            Buy Used Cars in Hyderabad
          </h1>
          <p className="text-white/60 text-base mt-2">
            Browse our verified pre-owned inventory. Fair prices, zero hidden charges.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-red-muted font-display font-semibold">
              {isLoading ? "Loading..." : `${filteredCars.length} cars available`}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/40">Updated daily</span>
          </div>
        </motion.div>
      </section>

      {/* Main */}
      <section className="bg-surface py-8 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-[110px]">{sidebar}</div>
          </aside>

          {/* Mobile filter trigger */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="w-full flex items-center justify-between bg-white border border-border rounded-xl px-4 py-3 shadow-card font-display font-semibold text-text-heading"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-red" />
                Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
              </span>
              <ChevronRight
                size={16}
                className={`transition-transform ${mobileFiltersOpen ? "rotate-90" : ""}`}
              />
            </button>
            {mobileFiltersOpen && <div className="mt-3">{sidebar}</div>}
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 gap-3">
              <h2 className="font-display font-semibold text-text-heading text-base">
                {filteredCars.length} cars found
              </h2>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
                <SelectTrigger className="w-[180px] bg-white border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="year-desc">Newest First</SelectItem>
                  <SelectItem value="km-asc">Lowest KM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-72 animate-pulse rounded-2xl bg-white border border-border" />
                ))}
              </div>
            ) : filteredCars.length > 0 ? (
              <>
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {shown.map((car) => (
                      <motion.div
                        key={car.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CarCard car={car} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {visible < filteredCars.length && (
                  <div className="text-center mt-10">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="border-2 border-red text-red font-display font-semibold px-8 py-3 rounded-xl hover:bg-red hover:text-white transition-colors"
                    >
                      Load More Cars
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-border shadow-card">
                <CarIcon size={48} className="text-red-muted mx-auto" />
                <h3 className="font-display font-bold text-xl text-text-heading mt-4">
                  No cars match your filters
                </h3>
                <p className="text-text-muted mt-2 text-sm">
                  Try adjusting or clearing your filters to see more options.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="bg-red text-white px-6 py-2.5 rounded-lg mt-5 font-display font-semibold hover:bg-red-dark transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/* ---------- Filter Sidebar ---------- */

function FilterSidebar(props: {
  selectedBrand: string;
  setSelectedBrand: (v: string) => void;
  selectedFuel: string;
  setSelectedFuel: (v: string) => void;
  selectedTransmission: string;
  setSelectedTransmission: (v: string) => void;
  selectedYear: string;
  setSelectedYear: (v: string) => void;
  selectedPriceIdx: number;
  setSelectedPriceIdx: (i: number) => void;
  activeFilters: { key: string; label: string; clear: () => void }[];
  clearAll: () => void;
}) {
  const {
    selectedBrand, setSelectedBrand, selectedFuel, setSelectedFuel,
    selectedTransmission, setSelectedTransmission, selectedYear, setSelectedYear,
    selectedPriceIdx, setSelectedPriceIdx, activeFilters, clearAll,
  } = props;

  return (
    <div className="bg-white rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-text-heading">Filter Cars</h3>
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-red text-xs font-semibold hover:text-red-dark transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-5">
        <PillGroup label="Brand" options={BRANDS} allLabel="Any Brand" value={selectedBrand} onChange={setSelectedBrand} />
        <PillGroup label="Fuel Type" options={FUEL_TYPES} value={selectedFuel} onChange={setSelectedFuel} />
        <PillGroup label="Transmission" options={TRANSMISSIONS} value={selectedTransmission} onChange={setSelectedTransmission} />
        <PillGroup label="Year" options={YEARS} value={selectedYear} onChange={setSelectedYear} />

        <div>
          <p className="text-xs font-display font-bold tracking-[0.12em] text-text-muted uppercase mb-2">Budget</p>
          <div className="flex flex-wrap gap-2">
            {PRICE_RANGES.map((r, i) => {
              const active = i === selectedPriceIdx;
              return (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setSelectedPriceIdx(i)}
                  className={`text-xs font-display font-semibold px-3 py-1.5 rounded-lg transition-colors border ${
                    active
                      ? "bg-red text-white border-red"
                      : "bg-surface border-border text-text-body hover:border-red hover:text-red"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border">
          <p className="text-xs text-text-muted mb-2">
            {activeFilters.length} filter{activeFilters.length === 1 ? "" : "s"} active
          </p>
          <div className="flex flex-wrap gap-1.5">
            {activeFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={f.clear}
                className="bg-red-light text-red text-xs px-2.5 py-1 rounded-md flex items-center gap-1 hover:bg-red hover:text-white transition-colors"
              >
                {f.label}
                <X size={10} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PillGroup({
  label, options, value, onChange, allLabel,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  allLabel?: string;
}) {
  return (
    <div>
      <p className="text-xs font-display font-bold tracking-[0.12em] text-text-muted uppercase mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          const display = opt === "All" && allLabel ? allLabel : opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`text-xs font-display font-semibold px-3 py-1.5 rounded-lg transition-colors border ${
                active
                  ? "bg-red text-white border-red"
                  : "bg-surface border-border text-text-body hover:border-red hover:text-red"
              }`}
            >
              {display}
            </button>
          );
        })}
      </div>
    </div>
  );
}
