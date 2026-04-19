import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, User, MessageCircle, Moon, Sun, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Reels", href: "#reels" },
  { label: "Style Library", href: "#style" },
  { label: "Virtual Try-On", href: "#tryon" },
  { label: "AI Stylist", href: "#stylist" },
];

export const Navbar = () => {
  const [active, setActive] = useState("Shop");
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">Inotech</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full bg-secondary/60 p-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setActive(link.label)}
              className={cn(
                "relative px-5 py-2 text-sm font-semibold transition-all rounded-full",
                active === link.label
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full hidden sm:inline-flex">
            <Search className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hidden sm:inline-flex" onClick={() => setDark(!dark)}>
            {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative hidden sm:inline-flex">
            <MessageCircle className="h-[18px] w-[18px]" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-success animate-pulse" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingBag className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hidden sm:inline-flex">
            <User className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => { setActive(link.label); setMobileOpen(false); }}
                className={cn(
                  "px-4 py-3 text-left text-sm font-semibold rounded-xl transition-colors",
                  active === link.label ? "bg-primary/15 text-primary" : "hover:bg-secondary"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
