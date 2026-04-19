import { products } from "./products";

export type Reel = {
  id: string;
  videoUrl: string;
  poster: string;
  caption: string;
  creator: string;
  productId: string;
  likes: number;
};

// Royalty-free fashion vertical clips (Pexels / sample CDN)
export const reels: Reel[] = [
  {
    id: "r1",
    videoUrl: "https://videos.pexels.com/video-files/4434286/4434286-uhd_1440_2732_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    caption: "Bridal lehenga moments ✨ that ageless red & gold magic",
    creator: "@ethnique.official",
    productId: "p1",
    likes: 12400,
  },
  {
    id: "r2",
    videoUrl: "https://videos.pexels.com/video-files/5530593/5530593-uhd_1440_2732_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
    caption: "Anarkali twirls — your festive season starter pack 🌸",
    creator: "@rangde.studio",
    productId: "p2",
    likes: 8920,
  },
  {
    id: "r3",
    videoUrl: "https://videos.pexels.com/video-files/4112386/4112386-uhd_1440_2732_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
    caption: "Soft florals for soft mornings 🌷 #midi",
    creator: "@boho.belle",
    productId: "p12",
    likes: 5630,
  },
  {
    id: "r4",
    videoUrl: "https://videos.pexels.com/video-files/3209828/3209828-uhd_1440_2732_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    caption: "Power dressing, made elegant. Linen blazer obsession 🤍",
    creator: "@urban.drape",
    productId: "p11",
    likes: 7210,
  },
  {
    id: "r5",
    videoUrl: "https://videos.pexels.com/video-files/8801932/8801932-uhd_1440_2732_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1535632066274-36a5b3a325d4?auto=format&fit=crop&w=600&q=80",
    caption: "Statement kundans for the win 👑",
    creator: "@aurum.jewels",
    productId: "p21",
    likes: 9540,
  },
];

export const getProductForReel = (reel: Reel) =>
  products.find((p) => p.id === reel.productId)!;
