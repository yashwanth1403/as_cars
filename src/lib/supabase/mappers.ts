import type { CarWithRelations } from "@/types/domain";
import type { Car } from "@/data/cars";
import type { AdminCar } from "@/data/admin-cars";
import { resolveActiveOffer } from "@/lib/offers";

export const toCarSlug = (car: { brand: string; name: string; year: number }): string =>
  `${car.brand.toLowerCase()}-${car.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${car.year}`;

const deriveTag = (car: CarWithRelations): Car["tag"] => {
  const currentYear = new Date().getFullYear();
  if (car.year >= currentYear - 1) return "New Arrival";
  return null;
};

export const applyHotDealTags = (cars: Car[]): Car[] => {
  const hotDealIds = new Set(
    cars
      .filter((c) => c.offerPrice != null && c.offerPrice > 0)
      .map((c) => ({ id: c.id, pct: (c.price - c.offerPrice!) / c.price }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3)
      .map((c) => c.id),
  );
  return cars.map((c) => ({
    ...c,
    tag: hotDealIds.has(c.id) ? "Hot Deal" : c.tag,
  }));
};

export const toPublicCar = (car: CarWithRelations): Car => {
  const images = car.media
    .filter((m) => m.mediatype === "image")
    .sort((a, b) => a.sortorder - b.sortorder)
    .map((m) => m.publicurl);

  const offer = resolveActiveOffer(car.price, car.offers);

  return {
    id: car.id,
    slug: toCarSlug(car),
    name: car.name,
    brand: car.brand,
    year: car.year,
    km: car.km,
    fuel: car.fuel,
    transmission: car.transmission,
    price: car.price,
    offerPrice: offer?.offerPrice ?? null,
    financePercent: car.financepercent ?? null,
    financeEmi: car.emi ?? null,
    description: car.description ?? null,
    isVerified: true,
    isFeatured: car.ispublished,
    tag: deriveTag(car),
    images: images.length > 0 ? images : ["/placeholder.svg"],
    color: "",
    owners: 1,
  };
};

export const toAdminCar = (car: CarWithRelations): AdminCar => {
  const imageList = car.media
    .filter((m) => m.mediatype === "image")
    .sort((a, b) => a.sortorder - b.sortorder)
    .map((m) => m.publicurl);
  const videoList = car.media
    .filter((m) => m.mediatype === "video")
    .sort((a, b) => a.sortorder - b.sortorder)
    .map((m) => m.publicurl);

  const offer = resolveActiveOffer(car.price, car.offers);

  return {
    id: car.id,
    name: car.name,
    brand: car.brand,
    year: car.year,
    km: car.km,
    fuel: car.fuel,
    transmission: car.transmission,
    price: car.price,
    financePercent: car.financepercent ?? undefined,
    description: car.description ?? undefined,
    image: imageList[0] || "",
    images: imageList,
    videos: videoList,
    status: car.status === "sold" ? "SoldOut" : "Available",
    offerTitle: car.offers[0]?.title,
    offerPrice: offer?.offerPrice ?? car.offers[0]?.offerprice ?? undefined,
    offerActive: car.offers[0]?.isactive ?? false,
  };
};
