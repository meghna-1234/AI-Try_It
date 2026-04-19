import { Link } from "react-router-dom";
import { Play, Wand2, Layers, MessageSquareText, ArrowRight } from "lucide-react";

const features = [
  {
    to: "/reels",
    icon: Play,
    label: "Reels",
    title: "Shop the scroll",
    desc: "Vertical reels you can shop in one tap.",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    to: "/try-on",
    icon: Wand2,
    label: "Virtual Try-On",
    title: "See it on you",
    desc: "AI models in diverse Indian skin tones.",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    to: "/style-library",
    icon: Layers,
    label: "Style Library",
    title: "Mix & match",
    desc: "Pick one piece, get the whole look.",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    to: "/ai-stylist",
    icon: MessageSquareText,
    label: "AI Stylist",
    title: "Chat for outfits",
    desc: "Occasion-based picks from your AI bestie.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
];

export const FeatureGrid = () => (
  <section className="py-14 md:py-20">
    <div className="mx-auto max-w-[1400px] px-4 md:px-8">
      <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Discover</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">
            More than a store.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Try AI-powered tools that make shopping fun, social and tailored to you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Link
            key={f.to}
            to={f.to}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-6 hover:shadow-card transition-all hover:-translate-y-0.5"
          >
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} text-white shadow-glow`}>
              <f.icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <h3 className="font-display text-2xl font-bold mt-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
              Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
