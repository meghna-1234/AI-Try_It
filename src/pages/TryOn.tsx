import { useState } from "react";
import { ArrowLeft, Sparkles, ShoppingBag, RotateCcw, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { aiModels } from "@/data/models";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Try-on works best with full garment shots. Filter to apparel categories.
const tryOnProducts = products.filter((p) =>
  ["Ethnic Wear", "Western Wear"].includes(p.category)
).slice(0, 18);

const TryOnPage = () => {
  const [modelId, setModelId] = useState(aiModels[0].id);
  const [productId, setProductId] = useState<string | null>(tryOnProducts[0].id);
  const [opacity, setOpacity] = useState(85);
  const [blendMode, setBlendMode] = useState<"normal" | "multiply">("multiply");
  const model = aiModels.find((m) => m.id === modelId)!;
  const product = tryOnProducts.find((p) => p.id === productId);

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
            <h1 className="font-display text-xl md:text-2xl font-bold">Virtual Try-On</h1>
          </div>
          <Button
            onClick={() => toast.info("Photo upload + custom AI model coming soon!")}
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 hidden sm:inline-flex"
          >
            <Sparkles className="h-4 w-4 mr-1" /> Create Your AI Model
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-8 grid gap-8 lg:grid-cols-[280px_1fr_320px]">
        {/* LEFT — Model picker */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-xl font-bold mb-4">Choose Model</h2>
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
            {aiModels.map((m) => (
              <button
                key={m.id}
                onClick={() => setModelId(m.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 transition-all bg-secondary",
                  modelId === m.id ? "border-primary shadow-glow" : "border-transparent hover:border-border"
                )}
              >
                <img src={m.image} alt={m.name} className="aspect-[3/4] w-full object-cover" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-left">
                  <p className="text-xs font-bold text-white">{m.name}</p>
                  <p className="text-[10px] text-white/75">{m.tone}</p>
                </div>
                {modelId === m.id && (
                  <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <p className="text-sm font-bold">Create your own</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Upload a photo and our AI will create a try-on model that looks like you.
            </p>
            <Button
              onClick={() => toast.info("Photo upload + custom AI model coming soon!")}
              size="sm"
              variant="outline"
              className="w-full rounded-full"
            >
              Upload Photo
            </Button>
          </div>
        </aside>

        {/* CENTER — Try-On Stage */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[480px] aspect-[3/4] rounded-3xl overflow-hidden shadow-card bg-secondary">
            {/* Base model */}
            <img src={model.image} alt={model.name} className="absolute inset-0 h-full w-full object-cover" />

            {/* Garment overlay */}
            {product && (
              <div
                key={product.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-in"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    opacity: opacity / 100,
                    mixBlendMode: blendMode,
                  }}
                  className="h-[78%] w-auto object-contain transition-all duration-500"
                />
              </div>
            )}

            {/* Watermark */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5">
              <Sparkles className="h-3 w-3 text-warning" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">AI Try-On Preview</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 w-full max-w-[480px] rounded-2xl bg-secondary/60 p-4">
            <div className="mb-3">
              <label className="text-xs font-semibold mb-2 block">Garment Opacity: {opacity}%</label>
              <input
                type="range" min={40} max={100}
                value={opacity}
                onChange={(e) => setOpacity(+e.target.value)}
                className="w-full accent-primary"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={blendMode === "normal" ? "default" : "outline"}
                onClick={() => setBlendMode("normal")}
                className="rounded-full flex-1"
              >
                Natural
              </Button>
              <Button
                size="sm"
                variant={blendMode === "multiply" ? "default" : "outline"}
                onClick={() => setBlendMode("multiply")}
                className="rounded-full flex-1"
              >
                Blended
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setOpacity(85); setBlendMode("multiply"); }}
                className="rounded-full"
                aria-label="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {product && (
            <Button
              size="lg"
              onClick={() => toast.success(`${product.name} added to bag`)}
              className="mt-4 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-pink h-12 px-8 font-bold"
            >
              <ShoppingBag className="h-5 w-5 mr-1" />
              Add to Bag • {fmtINR(product.price)}
            </Button>
          )}
        </div>

        {/* RIGHT — Product picker */}
        <aside>
          <h2 className="font-display text-xl font-bold mb-4">Try a Product</h2>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto pr-1 scrollbar-hide">
            {tryOnProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setProductId(p.id)}
                className={cn(
                  "group rounded-2xl overflow-hidden border-2 bg-card transition-all text-left",
                  productId === p.id ? "border-primary shadow-glow" : "border-transparent hover:border-border"
                )}
              >
                <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" loading="lazy" />
                <div className="p-2">
                  <p className="text-xs font-semibold truncate">{p.name}</p>
                  <p className="text-xs font-bold mt-0.5 flex items-center justify-between">
                    {fmtINR(p.price)}
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground font-normal">
                      <Star className="h-2.5 w-2.5 fill-warning text-warning" />{p.rating}
                    </span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TryOnPage;
