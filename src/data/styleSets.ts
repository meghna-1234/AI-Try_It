import { products } from "./products";

// Curated mix-and-match outfits. The "anchor" is the hero piece;
// "matches" are AI-suggested companion pieces.
export type StyleSet = {
  id: string;
  occasion: string;
  vibe: string;
  anchorId: string;
  matchIds: string[];
};

export const styleSets: StyleSet[] = [
  {
    id: "s1",
    occasion: "Sangeet Night",
    vibe: "Glam & glittery",
    anchorId: "p3",   // Embroidered Lehenga
    matchIds: ["p23", "p32", "p25", "p30"], // Polki choker, juttis, sling bag, bangles
  },
  {
    id: "s2",
    occasion: "Office Power Look",
    vibe: "Tailored & confident",
    anchorId: "p11",  // Linen Blazer
    matchIds: ["p18", "p33", "p22", "p24"], // Pleated trousers, sneakers, shoulder bag, sunglasses
  },
  {
    id: "s3",
    occasion: "Sunday Brunch",
    vibe: "Effortless boho",
    anchorId: "p12",  // Floral Midi Dress
    matchIds: ["p35", "p25", "p27", "p28"], // Stiletto pumps, sling, cat-eye sunnies, pearl earrings
  },
  {
    id: "s4",
    occasion: "Diwali Evening",
    vibe: "Festive & graceful",
    anchorId: "p2",   // Anarkali Suit
    matchIds: ["p21", "p32", "p9", "p30"],
  },
  {
    id: "s5",
    occasion: "Weekend Workout",
    vibe: "Move with style",
    anchorId: "p41",  // High-Waist Leggings
    matchIds: ["p42", "p33", "p50", "p43"],
  },
  {
    id: "s6",
    occasion: "Date Night",
    vibe: "Sleek & sultry",
    anchorId: "p15",  // Satin Slip Dress
    matchIds: ["p37", "p25", "p28", "p26"],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id)!;
