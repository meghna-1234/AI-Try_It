import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bridal from "@/assets/hero-bridal.jpg";
import festive from "@/assets/hero-festive.jpg";
import western from "@/assets/hero-western.jpg";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  align: "left" | "right";
};

const slides: Slide[] = [
  {
    image: bridal,
    eyebrow: "Bridal Edit",
    title: "Wedding\nSeason Ready",
    subtitle: "From lehengas to sarees — complete bridal collections",
    cta: "Shop Bridal",
    align: "left",
  },
  {
    image: festive,
    eyebrow: "Festive Drop",
    title: "Pretty in\nPastels",
    subtitle: "Light fabrics, soft palettes — made for every celebration",
    cta: "Shop Festive",
    align: "left",
  },
  {
    image: western,
    eyebrow: "Workwear",
    title: "Tailored\nFor You",
    subtitle: "Premium silhouettes that take you from desk to dinner",
    cta: "Shop Western",
    align: "left",
  },
];

export const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[560px] max-h-[780px] w-full overflow-hidden bg-foreground">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <img
            src={slide.image}
            alt={slide.title}
            width={1920}
            height={1080}
            className={cn("h-full w-full object-cover", i === index && "animate-ken-burns")}
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-12">
        <div key={index} className="max-w-2xl text-primary-foreground animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full gradient-accent px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-pink">
            <Sparkles className="h-3.5 w-3.5" />
            {slides[index].eyebrow}
          </div>

          <h1 className="mt-6 whitespace-pre-line font-display text-5xl font-bold leading-[1.02] md:text-7xl lg:text-8xl text-balance">
            {slides[index].title}
          </h1>

          <p className="mt-5 max-w-md text-base md:text-lg text-primary-foreground/85">
            {slides[index].subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-pink h-14 px-7 text-base font-semibold group">
              {slides[index].cta}
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-7 text-base font-semibold border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md">
              <Zap className="mr-1 h-5 w-5 fill-warning text-warning" />
              Virtual Try-On
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-end gap-10">
            {[
              { value: "50K+", label: "Products" },
              { value: "2M+", label: "Happy Shoppers" },
              { value: "4.9★", label: "App Rating" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl font-bold leading-none">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index ? "w-10 bg-warning" : "w-2.5 bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </section>
  );
};
