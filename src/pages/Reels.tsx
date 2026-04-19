import { useEffect, useRef, useState } from "react";
import { Heart, Share2, ShoppingBag, Volume2, VolumeX, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { reels, getProductForReel } from "@/data/reels";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const fmtK = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`);

const ReelsPage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Track which reel is on screen via scroll-snap + IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            setActiveIdx(idx);
          }
        });
      },
      { threshold: [0, 0.6, 1] },
    );
    const items = containerRef.current?.querySelectorAll("[data-reel]");
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Play active video, pause the rest
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = muted;
      if (i === activeIdx) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [activeIdx, muted]);

  const toggleLike = (id: string) => {
    setLiked((s) => ({ ...s, [id]: !s[id] }));
  };

  const share = async (caption: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Inotech Reels", text: caption, url: window.location.href });
      } catch { /* canceled */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/70 to-transparent">
        <Link to="/" className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-white text-sm font-semibold hover:bg-white/20">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="font-display font-bold text-white text-lg">Reels</div>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label="Toggle sound"
          className="rounded-full bg-white/10 backdrop-blur-md p-2.5 text-white hover:bg-white/20"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>

      {/* Reels feed (vertical scroll-snap) */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {reels.map((reel, i) => {
          const product = getProductForReel(reel);
          const isLiked = liked[reel.id];
          return (
            <section
              key={reel.id}
              data-reel
              data-idx={i}
              className="relative h-full w-full snap-start flex items-center justify-center"
            >
              {/* Video centered with vertical aspect */}
              <div className="relative h-full md:h-[92%] aspect-[9/16] max-w-full mx-auto bg-foreground md:rounded-3xl overflow-hidden">
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={reel.videoUrl}
                  poster={reel.poster}
                  loop
                  muted={muted}
                  playsInline
                  preload={Math.abs(i - activeIdx) <= 1 ? "auto" : "none"}
                  className="h-full w-full object-cover"
                />
                {/* gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

                {/* Right action rail */}
                <div className="absolute right-3 bottom-32 md:bottom-24 flex flex-col items-center gap-5 z-10">
                  <button
                    onClick={() => toggleLike(reel.id)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <span className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all group-active:scale-90",
                      isLiked && "bg-accent"
                    )}>
                      <Heart className={cn("h-6 w-6", isLiked ? "fill-white text-white" : "text-white")} />
                    </span>
                    <span className="text-white text-xs font-semibold">
                      {fmtK(reel.likes + (isLiked ? 1 : 0))}
                    </span>
                  </button>
                  <button onClick={() => share(reel.caption)} className="flex flex-col items-center gap-1 group">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md group-active:scale-90">
                      <Share2 className="h-5 w-5 text-white" />
                    </span>
                    <span className="text-white text-xs font-semibold">Share</span>
                  </button>
                </div>

                {/* Bottom caption + product card */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-10">
                  <p className="text-white font-bold text-sm">{reel.creator}</p>
                  <p className="mt-1 text-white/90 text-sm leading-snug max-w-xs">{reel.caption}</p>

                  {/* Product mini-card */}
                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-2.5 pr-3 max-w-sm shadow-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{product.brand}</p>
                      <p className="text-sm font-semibold truncate">{product.name}</p>
                      <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        {fmtINR(product.price)}
                        <span className="text-xs text-muted-foreground inline-flex items-center gap-0.5 font-normal">
                          <Star className="h-3 w-3 fill-warning text-warning" />{product.rating}
                        </span>
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => toast.success(`${product.name} added to bag`)}
                      className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-9 px-4 text-xs font-bold"
                    >
                      <ShoppingBag className="h-3.5 w-3.5 mr-1" /> Shop
                    </Button>
                  </div>
                </div>
              </div>

              {/* Side index dots (desktop) */}
              <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-2 z-20">
                {reels.map((_, j) => (
                  <span
                    key={j}
                    className={cn(
                      "block w-1 rounded-full transition-all bg-white/40",
                      j === activeIdx ? "h-8 bg-white" : "h-3"
                    )}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ReelsPage;
