import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const ProductCard = ({ product }: { product: Product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-500 hover:shadow-card">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        {product.badge && (
          <span className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-soft",
            product.badge === "NEW" && "bg-warning text-foreground",
            product.badge === "BESTSELLER" && "bg-foreground text-background",
            product.badge === "TRENDING" && "gradient-accent text-accent-foreground"
          )}>
            {product.badge}
          </span>
        )}
        {!product.badge && product.discountPct && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground shadow-soft">
            -{product.discountPct}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 backdrop-blur-md shadow-soft transition-transform hover:scale-110"
        >
          <Heart className={cn(
            "h-[18px] w-[18px] transition-colors",
            liked ? "fill-accent text-accent" : "text-foreground/70"
          )} />
        </button>

        {/* Quick add (slide up on hover) */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="w-full rounded-full bg-foreground/95 backdrop-blur-md py-2.5 text-xs font-bold uppercase tracking-wider text-background hover:bg-foreground">
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-1 pt-4 pb-2">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 font-semibold text-[15px] leading-tight line-clamp-1">{product.name}</h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-base font-bold">{fmtINR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{fmtINR(product.originalPrice)}</span>
          )}
          {product.discountPct && (
            <span className="text-xs font-bold text-success">{product.discountPct}% OFF</span>
          )}
        </div>
      </div>
    </article>
  );
};
