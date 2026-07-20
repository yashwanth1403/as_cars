import { supabase } from "@/lib/supabase/client";

export type VoiceCarSortBy =
  | "price_asc"
  | "price_desc"
  | "year_desc"
  | "year_asc"
  | "km_asc"
  | "km_desc";

export interface VoiceCarSearchFilters {
  name?: string;
  model?: string;
  brand?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  priceBudget?: number;
  minYear?: number;
  maxYear?: number;
  year?: number;
  minKm?: number;
  maxKm?: number;
  kmDriven?: number;
  sortBy?: VoiceCarSortBy;
  limit?: number;
}

export interface VoiceCarResult {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  kmFormatted: string;
  fuel: string;
  fuelType: string;
  transmission: string;
  price: number;
  priceFormatted: string;
  offerPrice: number | null;
  offerPriceFormatted: string | null;
  emi: number | null;
  emiFormatted: string | null;
  financePercent: number | null;
  description: string | null;
  slug: string;
  coverImage: string | null;
  detailUrl: string;
}

export interface VoiceCarSearchResponse {
  count: number;
  summary: string;
  filtersApplied: Record<string, unknown>;
  cars: VoiceCarResult[];
}

const toRpcParams = (filters: VoiceCarSearchFilters) => ({
  p_name: filters.name ?? null,
  p_model: filters.model ?? null,
  p_brand: filters.brand ?? null,
  p_fueltype: filters.fuelType ?? null,
  p_transmission: filters.transmission ?? null,
  p_min_price: filters.minPrice ?? null,
  p_max_price: filters.maxPrice ?? null,
  p_pricebudget: filters.priceBudget ?? null,
  p_min_year: filters.minYear ?? null,
  p_max_year: filters.maxYear ?? null,
  p_year: filters.year ?? null,
  p_min_km: filters.minKm ?? null,
  p_max_km: filters.maxKm ?? null,
  p_kmdriven: filters.kmDriven ?? null,
  p_sort_by: filters.sortBy ?? "price_asc",
  p_limit: filters.limit ?? 10,
});

export const searchCarsForVoice = async (
  filters: VoiceCarSearchFilters = {},
): Promise<VoiceCarSearchResponse> => {
  const { data, error } = await supabase.rpc("search_cars_for_voice", toRpcParams(filters));

  if (error) throw error;
  return data as VoiceCarSearchResponse;
};
