import { useMemo, useState } from "react";
import { ArrowLeft, Sparkles, Star, ShoppingBag, Heart, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { styleSets, productById } from "@/data/styleSets";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const StyleLibraryPage = () => {
  const [setIdx, setSetIdx] = useState(0);
  const set = styleSets[setIdx];
  const anchor = productById(set.anchorId);
  const matches = set.matchIds.map(productById);

  const total = useMemo(
    () => [anchor, ...matches].reduce((s, p) => s + p.price, 0),
    [anchor, matches],
  );

  const addAll = () => toast.success(`Complete look (${matches.length + 1} items) added to bag`);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8 py-4">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold hover:bg-secondary/70">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="font-display text-xl md:text-2xl font-bold">Style Library</h1>
          </div>
          <div className="w-[88px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-8 md:py-12">
        {/* Intro */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full gradient-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-pink">
            <Sparkles className="h-3 w-3" /> AI Mix & Match
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Pick one piece. Get the whole look.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Our AI stylist curates a complete outfit around any item — top, bottom, footwear & accessories.
          </p>
        </div>

        {/* Occasion tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {styleSets.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSetIdx(i)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                i === setIdx
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border bg-card hover:border-primary/40"
              )}
            >
              {s.occasion}
            </button>
          ))}
        </div>

        {/* The look */}
        <div key={set.id} className="grid gap-8 lg:grid-cols-[1fr_1.4fr] animate-fade-in">
          {/* Anchor */}
          <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-card">
            <div className="relative aspect-[3/4]">
              <img src={anchor.image} alt={anchor.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="rounded-full gradient-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-glow">
                  Hero Piece
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{anchor.brand}</p>
              <h3 className="font-display text-2xl font-bold mt-1">{anchor.name}</h3>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="font-bold text-lg">{fmtINR(anchor.price)}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {anchor.rating} ({anchor.reviews})
                </span>
              </div>
            </div>
          </div>

          {/* Curated matches */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{set.vibe}</p>
                <h3 className="font-display text-2xl font-bold">Complete the look</h3>
              </div>
              <button
                onClick={() => toast.success("Re-shuffled with new picks")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary/40"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Re-shuffle
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {matches.map((p) => (
                <article key={p.id} className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-card transition-shadow">
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center hover:bg-background">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{p.brand}</p>
                    <p className="text-sm font-semibold leading-tight truncate">{p.name}</p>
                    <p className="text-sm font-bold mt-1">{fmtINR(p.price)}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Total bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl bg-foreground text-background p-5 shadow-card">
              <div>
                <p className="text-xs uppercase tracking-wider opacity-70">Complete look total</p>
                <p className="font-display text-2xl font-bold">{fmtINR(total)}</p>
              </div>
              <Button
                size="lg"
                onClick={addAll}
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-pink h-12 px-7 font-bold"
              >
                <ShoppingBag className="h-5 w-5 mr-1" />
                Add Whole Look ({matches.length + 1})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleLibraryPage;
