import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BRANDS } from "@/data/cars";
import type { AdminCar } from "@/data/admin-cars";
import MediaUploadZone from "./MediaUploadZone";
import {
  Car,
  IndianRupee,
  Loader2,
  Sparkles,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveActiveOffer } from "@/lib/offers";
import { formatSavings } from "@/lib/offers";
import { formatPrice } from "@/data/cars";

const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric"] as const;
const TRANSMISSIONS = ["Manual", "Automatic"] as const;

export type AdminCarFormData = Omit<AdminCar, "id"> & {
  offerTitle?: string;
  offerPrice?: number;
  offerActive?: boolean;
};

const FINANCE_PRESETS = [55, 70, 80, 90, 95] as const;

interface AddCarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCar?: AdminCar | null;
  onSubmit: (data: AdminCarFormData, id?: string) => void;
  onUploadImage?: (files: File[]) => Promise<string[]>;
  onUploadVideo?: (files: File[]) => Promise<string[]>;
  saving?: boolean;
}

const getDefaultFormData = (): AdminCarFormData => ({
  name: "",
  brand: "Maruti",
  year: new Date().getFullYear(),
  km: 0,
  fuel: "Petrol",
  transmission: "Manual",
  price: 0,
  financePercent: 90,
  description: "",
  image: "",
  images: [],
  videos: [],
  status: "Available",
  offerTitle: "",
  offerPrice: undefined,
  offerActive: false,
});

const SectionCard = ({
  title,
  description,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  description?: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-xl border border-border/60 bg-card/50 p-4 shadow-sm sm:rounded-2xl sm:p-5",
      className,
    )}
  >
    <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:items-start sm:gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-10 sm:w-10 sm:rounded-xl">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-foreground sm:text-base">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
    {children}
  </div>
);

const AddCarModal = ({
  open,
  onOpenChange,
  initialCar,
  onSubmit,
  onUploadImage,
  onUploadVideo,
  saving,
}: AddCarModalProps) => {
  const isEditing = !!initialCar;
  const [formData, setFormData] = useState<AdminCarFormData>(getDefaultFormData);
  const [activeTab, setActiveTab] = useState("details");

  const offerPreview =
    formData.offerActive &&
    formData.offerTitle &&
    formData.offerPrice &&
    formData.price > formData.offerPrice
      ? resolveActiveOffer(formData.price, [
          {
            title: formData.offerTitle,
            offerprice: formData.offerPrice,
            isactive: true,
          },
        ])
      : null;

  useEffect(() => {
    if (open) {
      setActiveTab("details");
      if (initialCar) {
        setFormData({
          name: initialCar.name,
          brand: initialCar.brand,
          year: initialCar.year,
          km: initialCar.km,
          fuel: initialCar.fuel,
          transmission: initialCar.transmission,
          price: initialCar.price,
          financePercent: initialCar.financePercent ?? 90,
          description: initialCar.description ?? "",
          image: initialCar.image,
          offerTitle: initialCar.offerTitle,
          offerPrice: initialCar.offerPrice,
          offerActive: initialCar.offerActive,
          images: initialCar.images ?? (initialCar.image ? [initialCar.image] : []),
          videos: initialCar.videos ?? [],
          status: initialCar.status,
        });
      } else {
        setFormData(getDefaultFormData());
      }
    }
  }, [open, initialCar]);

  const set = <K extends keyof AdminCarFormData>(key: K, value: AdminCarFormData[K]) =>
    setFormData((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = formData.images ?? [];
    onSubmit(
      { ...formData, image: images[0] || "" },
      initialCar?.id,
    );
  };

  const brandsForSelect = BRANDS.filter((b) => b !== "All");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="admin-theme flex flex-col gap-0 overflow-hidden border-0 p-0 max-sm:inset-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:h-dvh max-sm:w-full sm:max-h-[95dvh] sm:max-w-3xl sm:rounded-2xl [&>button]:right-4 [&>button]:top-4 [&>button]:z-30 [&>button]:rounded-full [&>button]:p-2 [&>button]:text-primary-foreground [&>button]:opacity-90 [&>button]:hover:bg-white/15 [&>button]:hover:opacity-100 [&>button]:focus:ring-white/40"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header — fixed height, never shrinks with form content */}
        <div className="relative z-20 shrink-0 overflow-hidden bg-primary px-4 py-4 pr-12 text-primary-foreground sm:px-8 sm:py-6 sm:pr-14">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-secondary/20 blur-2xl" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70 sm:text-xs">
              Inventory Manager
            </p>
            <h2 className="mt-0.5 text-lg font-extrabold tracking-tight text-white sm:mt-1 sm:text-2xl">
              {isEditing ? "Edit Listing" : "Add New Car"}
            </h2>
            <p className="hidden text-sm leading-snug text-white/85 sm:mt-1.5 sm:block">
              Fill details, upload media, and publish to your showroom.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="shrink-0 border-b bg-muted/30 px-3 pt-2.5 sm:px-6 sm:pt-3">
              <TabsList className="grid h-9 w-full grid-cols-3 rounded-lg bg-background/80 p-0.5 sm:h-11 sm:rounded-xl sm:p-1">
                <TabsTrigger value="details" className="rounded-md text-[11px] sm:rounded-lg sm:text-sm">
                  Details
                </TabsTrigger>
                <TabsTrigger value="media" className="rounded-md text-[11px] sm:rounded-lg sm:text-sm">
                  Photos
                </TabsTrigger>
                <TabsTrigger value="pricing" className="rounded-md text-[11px] sm:rounded-lg sm:text-sm">
                  Pricing
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-6 sm:py-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
              <TabsContent value="details" className="mt-0 space-y-4 focus-visible:outline-none data-[state=inactive]:hidden">
                <SectionCard title="Vehicle Identity" description="Name, brand, and availability" icon={Car}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Car Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Honda City VX CVT"
                        className="h-11 rounded-xl"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Brand</Label>
                        <Select value={formData.brand} onValueChange={(v) => set("brand", v)}>
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {brandsForSelect.map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(v) => set("status", v as AdminCar["status"])}
                        >
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="SoldOut">Sold Out</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Specifications" icon={Sparkles}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        min={1990}
                        max={new Date().getFullYear() + 1}
                        value={formData.year || ""}
                        onChange={(e) => set("year", parseInt(e.target.value, 10) || 0)}
                        className="h-11 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="km">KM Driven</Label>
                      <Input
                        id="km"
                        type="number"
                        min={0}
                        value={formData.km || ""}
                        onChange={(e) => set("km", parseInt(e.target.value, 10) || 0)}
                        className="h-11 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Fuel</Label>
                      <Select
                        value={formData.fuel}
                        onValueChange={(v) => set("fuel", v as AdminCar["fuel"])}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FUEL_TYPES.map((f) => (
                            <SelectItem key={f} value={f}>{f}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Transmission</Label>
                      <Select
                        value={formData.transmission}
                        onValueChange={(v) => set("transmission", v as AdminCar["transmission"])}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TRANSMISSIONS.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Seller Notes" description="Visible on car detail page" icon={Tag}>
                  <Textarea
                    value={formData.description ?? ""}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Highlight condition, service history, and key selling points..."
                    rows={4}
                    className="rounded-xl resize-none [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent"
                  />
                </SectionCard>
              </TabsContent>

              <TabsContent value="media" className="mt-0 space-y-4 focus-visible:outline-none data-[state=inactive]:hidden">
                <SectionCard
                  title="Photo Gallery"
                  description="First photo becomes the cover image on listings"
                  icon={Car}
                >
                  {onUploadImage && (
                    <MediaUploadZone
                      type="image"
                      items={formData.images ?? []}
                      onChange={(urls) =>
                        setFormData((p) => ({ ...p, images: urls, image: urls[0] || "" }))
                      }
                      onUpload={onUploadImage}
                      disabled={saving}
                    />
                  )}
                </SectionCard>

                <SectionCard
                  title="Walkthrough Videos"
                  description="Optional — great for premium listings"
                  icon={Sparkles}
                >
                  {onUploadVideo && (
                    <MediaUploadZone
                      type="video"
                      items={formData.videos ?? []}
                      onChange={(urls) => set("videos", urls)}
                      onUpload={onUploadVideo}
                      disabled={saving}
                    />
                  )}
                </SectionCard>
              </TabsContent>

              <TabsContent value="pricing" className="mt-0 space-y-4 focus-visible:outline-none data-[state=inactive]:hidden">
                <SectionCard title="Pricing & Finance" icon={IndianRupee}>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="price">Listing Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        min={0}
                        value={formData.price || ""}
                        onChange={(e) => set("price", parseInt(e.target.value, 10) || 0)}
                        className="h-11 rounded-xl text-lg font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="financePercent">Finance Available (%)</Label>
                      <div className="flex flex-wrap gap-2">
                        {FINANCE_PRESETS.map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => set("financePercent", pct)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                              formData.financePercent === pct
                                ? "border-secondary bg-secondary text-secondary-foreground"
                                : "border-border bg-background hover:border-secondary/50",
                            )}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                      <Input
                        id="financePercent"
                        type="number"
                        min={0}
                        max={100}
                        value={formData.financePercent ?? ""}
                        onChange={(e) => {
                          const n = parseInt(e.target.value, 10);
                          set("financePercent", Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : null);
                        }}
                        placeholder="e.g. 90"
                        className="h-11 rounded-xl"
                      />
                      <p className="text-xs text-muted-foreground">
                        Example: 90% finance means customer can loan up to 90% of car price.
                      </p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Special Offer" description="Highlight a limited-time deal" icon={Tag}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold">Activate Offer</p>
                        <p className="text-xs text-muted-foreground">Show offer badge on listing</p>
                      </div>
                      <Switch
                        checked={!!formData.offerActive}
                        onCheckedChange={(checked) => set("offerActive", checked)}
                      />
                    </div>
                    {formData.offerActive && (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-2">
                          <Label>Offer Title</Label>
                          <Input
                            value={formData.offerTitle ?? ""}
                            onChange={(e) => set("offerTitle", e.target.value)}
                            placeholder="Festive Discount"
                            className="h-11 rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Offer Price (₹)</Label>
                          <Input
                            type="number"
                            min={0}
                            value={formData.offerPrice ?? ""}
                            onChange={(e) => {
                              const parsed = Number(e.target.value);
                              set(
                                "offerPrice",
                                Number.isFinite(parsed) && parsed > 0 ? parsed : undefined,
                              );
                            }}
                            placeholder="999999"
                            className="h-11 rounded-xl"
                          />
                        </div>
                        {offerPreview && (
                          <div className="sm:col-span-2 rounded-2xl border border-secondary/30 bg-gradient-to-r from-secondary/15 to-secondary/5 p-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                              Customer preview
                            </p>
                            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                              <div>
                                <p className="text-lg font-extrabold text-foreground">
                                  {offerPreview.title}
                                </p>
                                <p className="mt-1 text-2xl font-extrabold text-primary">
                                  {formatPrice(offerPreview.offerPrice)}
                                  <span className="ml-2 text-sm font-bold text-secondary">
                                    {offerPreview.discountPercent}% OFF
                                  </span>
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  <span className="line-through">{formatPrice(offerPreview.listPrice)}</span>
                                  {" · "}
                                  <span className="font-semibold text-emerald-700">
                                    Save {formatSavings(offerPreview.savings)}
                                  </span>
                                </p>
                              </div>
                              <div className="rounded-full bg-secondary px-4 py-2 text-sm font-extrabold text-secondary-foreground shadow-sm">
                                {offerPreview.discountPercent}% discount
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </SectionCard>
              </TabsContent>
            </div>
          </Tabs>

          {/* Sticky footer */}
          <div className="relative z-20 flex shrink-0 gap-2 border-t bg-background px-3 py-3 sm:justify-end sm:px-6 sm:py-4">
            <Button
              type="button"
              variant="outline"
              className="h-10 flex-1 rounded-xl sm:h-11 sm:flex-none"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 flex-[2] rounded-xl bg-secondary px-6 font-bold text-secondary-foreground hover:bg-secondary/90 sm:h-11 sm:flex-none sm:px-8"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Update Listing"
              ) : (
                "Publish Car"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarModal;
