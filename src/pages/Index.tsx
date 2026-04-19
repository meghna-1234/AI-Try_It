import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCatalog } from "@/components/ProductCatalog";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroCarousel />
        <ProductCatalog />
      </main>

      <footer className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-14 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-bold">Inotech</h3>
            <p className="mt-3 text-sm text-background/70 max-w-xs">
              India's AI-first fashion destination. Try, mix, match — and shop with confidence.
            </p>
          </div>
          {[
            { title: "Shop", links: ["Ethnic Wear", "Western Wear", "Accessories", "Footwear"] },
            { title: "Discover", links: ["Reels", "Style Library", "Virtual Try-On", "AI Stylist"] },
            { title: "Support", links: ["Help Center", "Returns", "Track Order", "Gift Wrap"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-semibold uppercase text-xs tracking-wider mb-4">{col.title}</p>
              <ul className="space-y-2.5 text-sm text-background/70">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-background transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-background/10">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-5 text-xs text-background/60 flex flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} Inotech. All rights reserved.</span>
            <span>Made with care in India.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
