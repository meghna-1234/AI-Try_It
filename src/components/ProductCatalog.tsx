import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "./ProductCard";
import { products, categories, type Category } from "@/data/products";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | Category;
type Sort = "Featured" | "Price: Low to High" | "Price: High to Low" | "Top Rated" | "Newest";

const ratingOptions = [
  { label: "All", min: 0 },
  { label: "3+", min: 3 },
  { label: "4+", min: 4 },
  { label: "4.5+", min: 4.5 },
];

export const ProductCatalog = () => {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<Sort>("Featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (query && !`${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case "Price: Low to High": list = [...list].sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": list = [...list].sort((a, b) => b.price - a.price); break;
      case "Top Rated": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "Newest": list = [...list].sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0)); break;
    }
    return list;
  }, [category, query, maxPrice, minRating, sort]);

  const clearAll = () => {
    setCategory("All");
    setMaxPrice(25000);
    setMinRating(0);
    setQuery("");
  };

  const Filters = () => (
    <aside className="rounded-3xl bg-card p-6 shadow-soft border border-border/60 lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">Filters</h3>
        <button onClick={clearAll} className="text-sm font-semibold text-primary hover:underline">
          Clear All
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold mb-3">Category</p>
        <div className="flex flex-col gap-1">
          {(["All", ...categories] as CategoryFilter[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-4 py-2.5 text-left text-sm transition-colors",
                category === c
                  ? "bg-primary/15 font-semibold text-primary"
                  : "text-foreground/75 hover:bg-secondary"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <p className="text-sm font-semibold">
          Price Range: <span className="text-muted-foreground font-normal">₹0 - ₹{maxPrice.toLocaleString("en-IN")}</span>
        </p>
        <div className="mt-4 px-1">
          <Slider value={[maxPrice]} onValueChange={(v) => setMaxPrice(v[0])} min={500} max={25000} step={500} />
        </div>
      </div>

      <div className="mt-7">
        <p className="text-sm font-semibold mb-3">Min Rating</p>
        <div className="flex flex-wrap gap-2">
          {ratingOptions.map((r) => (
            <button
              key={r.label}
              onClick={() => setMinRating(r.min)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                minRating === r.min
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/75 hover:bg-secondary/80"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <section id="shop" className="bg-secondary/40 py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">All Products</h2>
            <p className="mt-2 text-muted-foreground">{filtered.length} products found</p>
          </div>
          <button
            className="lg:hidden inline-flex items-center gap-2 rounded-full bg-card border border-border px-5 py-2.5 text-sm font-semibold shadow-soft"
            onClick={() => setMobileFilters(!mobileFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <div className={cn("lg:block", mobileFilters ? "block" : "hidden")}>
            <Filters />
          </div>

          {/* Right */}
          <div>
            {/* Search + sort row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-14 rounded-full border-border/80 pl-11 text-base shadow-soft bg-card"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-14 rounded-full border border-border/80 bg-card px-6 pr-10 text-sm font-semibold shadow-soft focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                {(["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Newest"] as Sort[]).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Category chips */}
            <div className="mt-5 flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
              {(["All", ...categories] as CategoryFilter[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                    category === c
                      ? "border-primary bg-primary text-primary-foreground shadow-glow"
                      : "border-border bg-card hover:border-primary/40"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="mt-16 rounded-3xl border border-dashed border-border bg-card p-16 text-center">
                <p className="font-display text-2xl font-bold">No products match your filters</p>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or clearing filters.</p>
                <button onClick={clearAll} className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
