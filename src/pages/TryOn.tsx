import { useMemo, useState } from "react";
import { ArrowLeft, Sparkles, ShoppingBag, Wand2, Loader2, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { aiModels } from "@/data/models";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const tryOnProducts = products
  .filter((p) => ["Ethnic Wear", "Western Wear"].includes(p.category))
  .slice(0, 18);

const SKIN_TONES = [
  { id: "fair", label: "Fair", swatch: "#F4D9C0" },
  { id: "wheatish", label: "Wheatish", swatch: "#D6A77A" },
  { id: "medium", label: "Medium", swatch: "#B07A52" },
  { id: "dusky", label: "Dusky", swatch: "#8B5A3B" },
  { id: "deep", label: "Deep", swatch: "#5C3A24" },
] as const;

const EYE_COLORS = [
  { id: "black", label: "Black", swatch: "#1B1B1B" },
  { id: "brown", label: "Brown", swatch: "#5A3A22" },
  { id: "hazel", label: "Hazel", swatch: "#8E6B3A" },
  { id: "green", label: "Green", swatch: "#3F7A4F" },
  { id: "blue", label: "Blue", swatch: "#3B6FA1" },
] as const;

const HAIR_STYLES = [
  { id: "long-straight-black", label: "Long Straight Black" },
  { id: "wavy-brown-shoulder", label: "Wavy Brown" },
  { id: "curly-black-medium", label: "Curly Black" },
  { id: "sleek-bun-black", label: "Sleek Bun" },
  { id: "short-bob-brown", label: "Short Bob" },
] as const;

const TryOnPage = () => {
  const [modelId, setModelId] = useState(aiModels[0].id);
  const [productId, setProductId] = useState<string>(tryOnProducts[0].id);
  const [skinTone, setSkinTone] = useState<string>("");
  const [eyeColor, setEyeColor] = useState<string>("");
  const [hair, setHair] = useState<string>("");

  const [generating, setGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const model = useMemo(() => aiModels.find((m) => m.id === modelId)!, [modelId]);
  const product = useMemo(
    () => tryOnProducts.find((p) => p.id === productId)!,
    [productId],
  );

  const generate = async () => {
    setGenerating(true);
    setResultImage(null);
    try {
      // The Lovable AI gateway can't fetch preview/localhost URLs, so we
      // inline the model image as a base64 data URL.
      const modelImageUrl = await toDataUrl(
        new URL(model.image, window.location.origin).toString(),
      );

      const { data, error } = await supabase.functions.invoke("ai-tryon", {
        body: {
          modelImage: modelImageUrl,
          productImage: product.image,
          productName: product.name,
          productCategory: product.category,
          skinTone: skinTone || undefined,
          eyeColor: eyeColor || undefined,
          hair: HAIR_STYLES.find((h) => h.id === hair)?.label.toLowerCase() || undefined,
        },
      });

      if (error) throw error;
      if (!data?.image) throw new Error("No image returned");

      setResultImage(data.image);
      toast.success("Your AI try-on is ready ✨");
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.context?.body?.error ||
        err?.message ||
        "Failed to generate. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const downloadResult = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = `tryon-${model.name}-${product.name.replace(/\s+/g, "-")}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold hover:bg-secondary/70"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="font-display text-xl md:text-2xl font-bold">
              Virtual Try-On
            </h1>
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
        {/* LEFT — Model + appearance */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold mb-4">Choose Model</h2>
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
              {aiModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setModelId(m.id);
                    setResultImage(null);
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border-2 transition-all bg-secondary",
                    modelId === m.id
                      ? "border-primary shadow-glow"
                      : "border-transparent hover:border-border",
                  )}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
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
          </div>

          {/* Appearance customization */}
          <div className="rounded-2xl border border-border p-4 space-y-4 bg-card">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-accent" />
              <p className="text-sm font-bold">Customize appearance</p>
            </div>

            <div>
              <p className="text-xs font-semibold mb-2 text-muted-foreground">Skin tone</p>
              <div className="flex flex-wrap gap-2">
                {SKIN_TONES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSkinTone(skinTone === s.id ? "" : s.id)}
                    title={s.label}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      skinTone === s.id ? "border-primary scale-110 shadow-glow" : "border-border",
                    )}
                    style={{ background: s.swatch }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-2 text-muted-foreground">Eye color</p>
              <div className="flex flex-wrap gap-2">
                {EYE_COLORS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEyeColor(eyeColor === e.id ? "" : e.id)}
                    title={e.label}
                    className={cn(
                      "h-7 w-7 rounded-full border-2 transition-all",
                      eyeColor === e.id ? "border-primary scale-110 shadow-glow" : "border-border",
                    )}
                    style={{ background: e.swatch }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-2 text-muted-foreground">Hair</p>
              <div className="flex flex-wrap gap-1.5">
                {HAIR_STYLES.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHair(hair === h.id ? "" : h.id)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                      hair === h.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-secondary",
                    )}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {(skinTone || eyeColor || hair) && (
              <button
                onClick={() => {
                  setSkinTone("");
                  setEyeColor("");
                  setHair("");
                }}
                className="text-[11px] text-muted-foreground hover:text-foreground underline"
              >
                Reset appearance
              </button>
            )}
          </div>
        </aside>

        {/* CENTER — Try-On Stage */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[480px] aspect-[3/4] rounded-3xl overflow-hidden shadow-card bg-secondary">
            {/* Base model OR AI result */}
            <img
              src={resultImage ?? model.image}
              alt={resultImage ? "AI try-on result" : model.name}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Loading overlay */}
            {generating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm font-semibold">AI is dressing your model…</p>
                <p className="text-xs text-muted-foreground">Usually takes 10–20 seconds</p>
              </div>
            )}

            {/* Watermark */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5">
              <Sparkles className="h-3 w-3 text-warning" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                {resultImage ? "AI Generated" : "AI Try-On Preview"}
              </span>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mt-6 w-full max-w-[480px] flex flex-col gap-3">
            <Button
              size="lg"
              onClick={generate}
              disabled={generating}
              className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 h-14 text-base font-bold shadow-glow"
            >
              {generating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" /> Try On with AI
                </>
              )}
            </Button>

            <div className="flex gap-2">
              {resultImage && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={downloadResult}
                  className="rounded-full flex-1 h-12"
                >
                  <Download className="h-4 w-4 mr-1" /> Save
                </Button>
              )}
              <Button
                size="lg"
                onClick={() => toast.success(`${product.name} added to bag`)}
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-pink h-12 px-6 font-bold flex-1"
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add • {fmtINR(product.price)}
              </Button>
            </div>

            <p className="text-center text-[11px] text-muted-foreground">
              Tip: tweak skin tone, eyes, or hair on the left, then regenerate.
            </p>
          </div>
        </div>

        {/* RIGHT — Product picker */}
        <aside>
          <h2 className="font-display text-xl font-bold mb-4">Try a Product</h2>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto pr-1 scrollbar-hide">
            {tryOnProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setProductId(p.id);
                  setResultImage(null);
                }}
                className={cn(
                  "group rounded-2xl overflow-hidden border-2 bg-card transition-all text-left",
                  productId === p.id
                    ? "border-primary shadow-glow"
                    : "border-transparent hover:border-border",
                )}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
                <div className="p-2">
                  <p className="text-xs font-semibold truncate">{p.name}</p>
                  <p className="text-xs font-bold mt-0.5 flex items-center justify-between">
                    {fmtINR(p.price)}
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground font-normal">
                      <Star className="h-2.5 w-2.5 fill-warning text-warning" />
                      {p.rating}
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