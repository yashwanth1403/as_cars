import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CarRow from "./CarRow";
import type { AdminCar } from "@/data/admin-cars";
import { formatKm, formatPrice } from "@/data/cars";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, RotateCcw, CheckCircle, Car, ImageIcon } from "lucide-react";
import { resolveActiveOffer, formatSavings } from "@/lib/offers";

interface InventoryTableProps {
  cars: AdminCar[];
  onEdit: (car: AdminCar) => void;
  onDelete: (car: AdminCar) => void;
  onToggleStatus: (car: AdminCar) => void;
  loading?: boolean;
}

const InventoryTable = ({
  cars,
  onEdit,
  onDelete,
  onToggleStatus,
  loading,
}: InventoryTableProps) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-24 font-bold">Photo</TableHead>
              <TableHead className="font-bold">Vehicle</TableHead>
              <TableHead className="font-bold">Year</TableHead>
              <TableHead className="font-bold">KM</TableHead>
              <TableHead className="font-bold">Fuel</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Finance</TableHead>
              <TableHead className="font-bold">Offer</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="w-36 text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-40 text-center">
                  <EmptyInventory />
                </TableCell>
              </TableRow>
            ) : (
              cars.map((car) => (
                <CarRow
                  key={car.id}
                  car={car}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleStatus={onToggleStatus}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile + tablet cards */}
      <div className="space-y-3 p-2 sm:p-3 lg:hidden">
        {cars.length === 0 ? (
          <EmptyInventory />
        ) : (
          cars.map((car) => {
            const isSold = car.status === "SoldOut";
            const mediaCount = (car.images?.length ?? 0) + (car.videos?.length ?? 0);
            const offer =
              car.offerActive && car.offerPrice && car.price > car.offerPrice
                ? resolveActiveOffer(car.price, [
                    {
                      title: car.offerTitle || "Offer",
                      offerprice: car.offerPrice,
                      isactive: true,
                    },
                  ])
                : null;

            return (
              <article
                key={car.id}
                className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm"
              >
                {/* Card body */}
                <div className="flex gap-3 p-3">
                  {/* Image */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {car.image ? (
                      <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-6 w-6 opacity-40" />
                      </div>
                    )}
                    {mediaCount > 1 && (
                      <span className="absolute bottom-1 left-1 rounded bg-black/65 px-1 py-0.5 text-[9px] font-bold text-white">
                        +{mediaCount - 1}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    {/* Name + status */}
                    <div className="flex items-start justify-between gap-1.5">
                      <p className="line-clamp-1 text-sm font-bold leading-snug text-foreground">
                        {car.name}
                      </p>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${isSold ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"}`}>
                        {isSold ? "Sold" : "Active"}
                      </span>
                    </div>

                    {/* Meta row */}
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {car.year} · {car.fuel} · {formatKm(car.km)}
                    </p>

                    {/* Price row */}
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-primary">
                        {formatPrice(offer ? offer.offerPrice : car.price)}
                      </span>
                      {offer && (
                        <>
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(car.price)}</span>
                          <span className="text-[10px] font-bold text-emerald-700">Save {formatSavings(offer.savings)}</span>
                        </>
                      )}
                    </div>

                    {/* Badges row */}
                    {(offer || (car.financePercent != null && car.financePercent > 0)) && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {offer && (
                          <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                            {offer.discountPercent}% off
                          </span>
                        )}
                        {car.financePercent != null && car.financePercent > 0 && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {car.financePercent}% finance
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action row */}
                <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 bg-muted/20">
                  <Button
                    variant="ghost"
                    className="h-9 gap-1.5 rounded-none text-xs font-semibold"
                    onClick={() => onEdit(car)}
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-9 gap-1.5 rounded-none text-xs font-semibold text-emerald-700"
                    onClick={() => onToggleStatus(car)}
                  >
                    {isSold ? <RotateCcw className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                    {isSold ? "Activate" : "Sold"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-9 gap-1.5 rounded-none text-xs font-semibold text-destructive"
                    onClick={() => onDelete(car)}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

const EmptyInventory = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
      <Car className="h-8 w-8 text-muted-foreground" />
    </div>
    <p className="mt-4 font-semibold text-foreground">No listings yet</p>
    <p className="mt-1 max-w-xs text-sm text-muted-foreground">
      Add your first car to start selling on your showroom website.
    </p>
  </div>
);

export default InventoryTable;
