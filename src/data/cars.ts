export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  year: number;
  km: number;
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric";
  transmission: "Manual" | "Automatic";
  price: number;
  offerPrice?: number | null;
  financePercent?: number | null;
  financeEmi: number | null;
  description?: string | null;
  isVerified: boolean;
  isFeatured: boolean;
  tag?: "Hot Deal" | "New Arrival" | "Best Value" | null;
  images: string[];
  color: string;
  owners: number;
}

export const MOCK_CARS: Car[] = [
  {
    id: "1",
    slug: "maruti-swift-2022",
    name: "Maruti Swift ZXi",
    brand: "Maruti",
    year: 2022,
    km: 18000,
    fuel: "Petrol",
    transmission: "Manual",
    price: 650000,
    financeEmi: 9800,
    isVerified: true,
    isFeatured: true,
    tag: "Hot Deal",
    images: ["https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"],
    color: "Pearl White",
    owners: 1,
  },
  {
    id: "2",
    slug: "hyundai-creta-2021",
    name: "Hyundai Creta SX",
    brand: "Hyundai",
    year: 2021,
    km: 32000,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 1250000,
    financeEmi: 18500,
    isVerified: true,
    isFeatured: true,
    tag: "Best Value",
    images: ["https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80"],
    color: "Typhoon Silver",
    owners: 1,
  },
  {
    id: "3",
    slug: "honda-city-2020",
    name: "Honda City VX CVT",
    brand: "Honda",
    year: 2020,
    km: 45000,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 980000,
    financeEmi: 14600,
    isVerified: true,
    isFeatured: true,
    tag: null,
    images: ["https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80"],
    color: "Lunar Silver",
    owners: 2,
  },
  {
    id: "4",
    slug: "toyota-innova-2021",
    name: "Toyota Innova Crysta GX",
    brand: "Toyota",
    year: 2021,
    km: 55000,
    fuel: "Diesel",
    transmission: "Manual",
    price: 1750000,
    financeEmi: 26000,
    isVerified: true,
    isFeatured: false,
    tag: "New Arrival",
    images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"],
    color: "Avant Garde Bronze",
    owners: 1,
  },
  {
    id: "5",
    slug: "tata-nexon-2022",
    name: "Tata Nexon XZ Plus",
    brand: "Tata",
    year: 2022,
    km: 22000,
    fuel: "Petrol",
    transmission: "Manual",
    price: 920000,
    financeEmi: 13700,
    isVerified: true,
    isFeatured: false,
    tag: "Hot Deal",
    images: ["https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&q=80"],
    color: "Calgary White",
    owners: 1,
  },
  {
    id: "6",
    slug: "kia-seltos-2021",
    name: "Kia Seltos HTX Plus",
    brand: "Kia",
    year: 2021,
    km: 38000,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 1380000,
    financeEmi: 20500,
    isVerified: true,
    isFeatured: false,
    tag: null,
    images: ["https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80"],
    color: "Steel Silver",
    owners: 1,
  },
  {
    id: "7",
    slug: "maruti-baleno-2023",
    name: "Maruti Baleno Alpha",
    brand: "Maruti",
    year: 2023,
    km: 8000,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 820000,
    financeEmi: 12200,
    isVerified: true,
    isFeatured: true,
    tag: "New Arrival",
    images: ["https://images.unsplash.com/photo-1592805144716-feeccccef5ac?w=800&q=80"],
    color: "Splendid Silver",
    owners: 1,
  },
  {
    id: "8",
    slug: "hyundai-i20-2022",
    name: "Hyundai i20 Asta",
    brand: "Hyundai",
    year: 2022,
    km: 14000,
    fuel: "Petrol",
    transmission: "Manual",
    price: 720000,
    financeEmi: 10700,
    isVerified: true,
    isFeatured: false,
    tag: "Best Value",
    images: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80"],
    color: "Titan Grey",
    owners: 1,
  },
  {
    id: "9",
    slug: "mahindra-xuv700-2022",
    name: "Mahindra XUV700 AX7",
    brand: "Mahindra",
    year: 2022,
    km: 28000,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 2100000,
    financeEmi: 31200,
    isVerified: true,
    isFeatured: false,
    tag: null,
    images: ["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"],
    color: "Galaxy Grey",
    owners: 1,
  },
  {
    id: "10",
    slug: "honda-amaze-2021",
    name: "Honda Amaze S CVT",
    brand: "Honda",
    year: 2021,
    km: 36000,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 740000,
    financeEmi: 11000,
    isVerified: true,
    isFeatured: false,
    tag: null,
    images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80"],
    color: "Radiant Red",
    owners: 2,
  },
];

export const BRANDS = [
  "All",
  "Maruti",
  "Hyundai",
  "Honda",
  "Toyota",
  "Tata",
  "Kia",
  "Mahindra",
  "Ford",
  "Volkswagen",
  "Skoda",
  "Renault",
  "Nissan",
  "MG",
  "Jeep",
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Volvo",
  "Jaguar",
  "Land Rover",
  "Porsche",
  "Lexus",
  "Isuzu",
  "Force",
];
export const FUEL_TYPES = ["All", "Petrol", "Diesel", "CNG", "Electric"];
export const TRANSMISSIONS = ["All", "Manual", "Automatic"];
export const YEARS = ["All", "2023", "2022", "2021", "2020", "2019", "2018"];
export const PRICE_RANGES: { label: string; min: number; max: number }[] = [
  { label: "All Budgets", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under ₹5L", min: 0, max: 500000 },
  { label: "₹5L – ₹10L", min: 500000, max: 1000000 },
  { label: "₹10L – ₹15L", min: 1000000, max: 1500000 },
  { label: "₹15L – ₹20L", min: 1500000, max: 2000000 },
  { label: "Above ₹20L", min: 2000000, max: Number.POSITIVE_INFINITY },
];

export function formatPrice(price: number): string {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("en-IN")} km`;
}
