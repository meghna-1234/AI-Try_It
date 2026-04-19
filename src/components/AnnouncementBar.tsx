import { Sparkles, Truck, ShieldCheck, Gift } from "lucide-react";

const items = [
  { icon: Sparkles, text: "AI Try-On now live" },
  { icon: Truck, text: "Free shipping over ₹999" },
  { icon: Gift, text: "Send as gift, beautifully wrapped" },
  { icon: ShieldCheck, text: "Easy 30-day returns" },
];

export const AnnouncementBar = () => (
  <div className="bg-foreground text-background overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...items, ...items, ...items].map((item, i) => (
        <div key={i} className="flex items-center gap-2.5 px-8 py-2.5 text-xs font-semibold uppercase tracking-wider">
          <item.icon className="h-3.5 w-3.5 text-warning" />
          {item.text}
          <span className="ml-8 opacity-30">●</span>
        </div>
      ))}
    </div>
  </div>
);
