export type Category = "Ethnic Wear" | "Western Wear" | "Accessories" | "Footwear" | "Activewear";

export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: Category;
  image: string;
  badge?: "NEW" | "BESTSELLER" | "TRENDING" | string;
  discountPct?: number;
};

// Curated Unsplash imagery — fashion / lifestyle focused
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  // ── Ethnic Wear ────────────────────────────────────────────────
  { id: "p1", brand: "Ethnique", name: "Banarasi Silk Saree", price: 8999, originalPrice: 14999, discountPct: 40, rating: 4.8, reviews: 342, category: "Ethnic Wear", image: img("photo-1610030469983-98e550d6193c"), badge: "BESTSELLER" },
  { id: "p2", brand: "Rang De", name: "Anarkali Suit Set", price: 3499, originalPrice: 5999, discountPct: 42, rating: 4.6, reviews: 218, category: "Ethnic Wear", image: img("photo-1583391733956-6c78276477e2"), badge: "NEW" },
  { id: "p3", brand: "Mehfil", name: "Embroidered Lehenga", price: 12499, originalPrice: 19999, discountPct: 38, rating: 4.9, reviews: 512, category: "Ethnic Wear", image: img("photo-1594736797933-d0501ba2fe65") },
  { id: "p4", brand: "Sufiyana", name: "Chikankari Kurta Set", price: 2299, originalPrice: 3499, discountPct: 34, rating: 4.5, reviews: 184, category: "Ethnic Wear" , image: img("photo-1617059062613-dbb16e54e1c2") },
  { id: "p5", brand: "Virasat", name: "Kanjeevaram Saree", price: 15999, originalPrice: 22999, discountPct: 30, rating: 4.9, reviews: 612, category: "Ethnic Wear", image: img("photo-1605664041952-4a2855d9be39"), badge: "TRENDING" },
  { id: "p6", brand: "Rang De", name: "Pastel Sharara Set", price: 4799, originalPrice: 6999, discountPct: 31, rating: 4.7, reviews: 289, category: "Ethnic Wear" , image: img("photo-1610030469668-8e450b4d0d3e") },
  { id: "p7", brand: "Mehfil", name: "Velvet Bridal Lehenga", price: 24999, originalPrice: 36999, discountPct: 32, rating: 4.9, reviews: 178, category: "Ethnic Wear", image: img("photo-1602573852596-1ac11d4d030f") },
  { id: "p8", brand: "Sufiyana", name: "Cotton Straight Kurta", price: 1299, originalPrice: 1999, discountPct: 35, rating: 4.4, reviews: 432, category: "Ethnic Wear", image: img("photo-1583391733892-e92b50887c11") },
  { id: "p9", brand: "Ethnique", name: "Silk Dupatta", price: 1599, rating: 4.6, reviews: 124, category: "Ethnic Wear", image: img("photo-1602810316693-3667c854239a") },
  { id: "p10", brand: "Virasat", name: "Patola Print Saree", price: 6499, originalPrice: 8999, discountPct: 27, rating: 4.7, reviews: 256, category: "Ethnic Wear", image: img("photo-1622260614153-03223fb72052") },

  // ── Western Wear ───────────────────────────────────────────────
  { id: "p11", brand: "Urban Drape", name: "Linen Blazer", price: 2999, originalPrice: 4500, discountPct: 33, rating: 4.5, reviews: 156, category: "Western Wear", image: img("photo-1591047139829-d91aecb6caea"), badge: "NEW" },
  { id: "p12", brand: "Boho Belle", name: "Floral Midi Dress", price: 1899, originalPrice: 2999, discountPct: 37, rating: 4.7, reviews: 289, category: "Western Wear", image: img("photo-1572804013309-59a88b7e92f1") },
  { id: "p13", brand: "Indigo & Co", name: "Mom-Fit Jeans", price: 1799, originalPrice: 2499, discountPct: 28, rating: 4.6, reviews: 524, category: "Western Wear", image: img("photo-1541099649105-f69ad21f3246") },
  { id: "p14", brand: "Urban Drape", name: "Oversized Tee", price: 799, originalPrice: 1199, discountPct: 33, rating: 4.4, reviews: 312, category: "Western Wear", image: img("photo-1521572163474-6864f9cf17ab") },
  { id: "p15", brand: "Noir Studio", name: "Satin Slip Dress", price: 2599, originalPrice: 3999, discountPct: 35, rating: 4.6, reviews: 198, category: "Western Wear", image: img("photo-1496747611176-843222e1e57c"), badge: "TRENDING" },
  { id: "p16", brand: "Boho Belle", name: "Wrap Maxi Skirt", price: 1599, originalPrice: 2299, discountPct: 30, rating: 4.5, reviews: 142, category: "Western Wear", image: img("photo-1583496661160-fb5886a13d44") },
  { id: "p17", brand: "Indigo & Co", name: "Denim Jacket", price: 2299, originalPrice: 3299, discountPct: 30, rating: 4.7, reviews: 378, category: "Western Wear", image: img("photo-1551537482-f2075a1d41f2") },
  { id: "p18", brand: "Noir Studio", name: "Pleated Trousers", price: 1999, originalPrice: 2799, discountPct: 28, rating: 4.5, reviews: 167, category: "Western Wear", image: img("photo-1594633312681-425c7b97ccd1") },
  { id: "p19", brand: "Urban Drape", name: "Knit Cardigan", price: 1799, originalPrice: 2499, discountPct: 28, rating: 4.6, reviews: 203, category: "Western Wear", image: img("photo-1434389677669-e08b4cac3105") },
  { id: "p20", brand: "Boho Belle", name: "Crop Top", price: 699, originalPrice: 999, discountPct: 30, rating: 4.3, reviews: 421, category: "Western Wear", image: img("photo-1564257631407-4deb1f99d992") },

  // ── Accessories ────────────────────────────────────────────────
  { id: "p21", brand: "Aurum", name: "Kundan Earrings", price: 1499, originalPrice: 2499, discountPct: 40, rating: 4.8, reviews: 412, category: "Accessories", image: img("photo-1535632066274-36a5b3a325d4"), badge: "BESTSELLER" },
  { id: "p22", brand: "Leatherly", name: "Tan Shoulder Bag", price: 2299, originalPrice: 3499, discountPct: 34, rating: 4.6, reviews: 187, category: "Accessories", image: img("photo-1548036328-c9fa89d128fa") },
  { id: "p23", brand: "Aurum", name: "Polki Choker Set", price: 3499, originalPrice: 5999, discountPct: 41, rating: 4.9, reviews: 256, category: "Accessories", image: img("photo-1605100804763-247f67b3557e") },
  { id: "p24", brand: "Tinted", name: "Aviator Sunglasses", price: 1199, originalPrice: 1999, discountPct: 40, rating: 4.5, reviews: 312, category: "Accessories", image: img("photo-1572635196237-14b3f281503f") },
  { id: "p25", brand: "Leatherly", name: "Mini Sling Bag", price: 1799, originalPrice: 2499, discountPct: 28, rating: 4.6, reviews: 145, category: "Accessories", image: img("photo-1591561954557-26941169b49e") },
  { id: "p26", brand: "Aurum", name: "Statement Ring", price: 899, originalPrice: 1499, discountPct: 40, rating: 4.4, reviews: 89, category: "Accessories", image: img("photo-1611591437281-460bfbe1220a") },
  { id: "p27", brand: "Tinted", name: "Cat-Eye Sunglasses", price: 999, originalPrice: 1599, discountPct: 37, rating: 4.5, reviews: 178, category: "Accessories", image: img("photo-1577803645773-f96470509666") },
  { id: "p28", brand: "Aurum", name: "Pearl Drop Earrings", price: 799, originalPrice: 1299, discountPct: 38, rating: 4.7, reviews: 234, category: "Accessories", image: img("photo-1630018548696-e1900d3c1f82") },
  { id: "p29", brand: "Leatherly", name: "Leather Belt", price: 999, originalPrice: 1499, discountPct: 33, rating: 4.5, reviews: 156, category: "Accessories", image: img("photo-1624222247344-550fb60583dc") },
  { id: "p30", brand: "Aurum", name: "Gold-Toned Bangles", price: 1299, originalPrice: 1999, discountPct: 35, rating: 4.6, reviews: 198, category: "Accessories", image: img("photo-1611652022419-a9419f74343d") },

  // ── Footwear ───────────────────────────────────────────────────
  { id: "p31", brand: "Stride", name: "Block Heel Sandals", price: 1999, originalPrice: 2999, discountPct: 33, rating: 4.5, reviews: 234, category: "Footwear", image: img("photo-1543163521-1bf539c55dd2") },
  { id: "p32", brand: "Heritage", name: "Embellished Juttis", price: 1499, originalPrice: 2299, discountPct: 35, rating: 4.7, reviews: 412, category: "Footwear", image: img("photo-1606107557195-0e29a4b5b4aa"), badge: "TRENDING" },
  { id: "p33", brand: "Stride", name: "White Sneakers", price: 2499, originalPrice: 3499, discountPct: 29, rating: 4.6, reviews: 567, category: "Footwear", image: img("photo-1542291026-7eec264c27ff") },
  { id: "p34", brand: "Heritage", name: "Kolhapuri Chappals", price: 899, originalPrice: 1299, discountPct: 31, rating: 4.5, reviews: 289, category: "Footwear", image: img("photo-1603487742131-4160ec999306") },
  { id: "p35", brand: "Glide", name: "Stiletto Pumps", price: 2799, originalPrice: 3999, discountPct: 30, rating: 4.4, reviews: 156, category: "Footwear", image: img("photo-1573100925118-870b8efc799d") },
  { id: "p36", brand: "Stride", name: "Chunky Loafers", price: 2299, originalPrice: 3299, discountPct: 30, rating: 4.6, reviews: 198, category: "Footwear", image: img("photo-1582588678413-dbf45f4823e9") },
  { id: "p37", brand: "Glide", name: "Strappy Heels", price: 1899, originalPrice: 2799, discountPct: 32, rating: 4.5, reviews: 267, category: "Footwear", image: img("photo-1515347619252-60a4bf4fff4f") },
  { id: "p38", brand: "Heritage", name: "Mojari Flats", price: 1199, originalPrice: 1799, discountPct: 33, rating: 4.6, reviews: 178, category: "Footwear", image: img("photo-1551107696-a4b0c5a0d9a2") },
  { id: "p39", brand: "Stride", name: "Ankle Boots", price: 3199, originalPrice: 4499, discountPct: 29, rating: 4.7, reviews: 234, category: "Footwear", image: img("photo-1520639888713-7851133b1ed0") },
  { id: "p40", brand: "Glide", name: "Slide Sandals", price: 999, originalPrice: 1499, discountPct: 33, rating: 4.4, reviews: 312, category: "Footwear", image: img("photo-1562273138-f46be4ebdf33") },

  // ── Activewear ─────────────────────────────────────────────────
  { id: "p41", brand: "Flex Co", name: "High-Waist Leggings", price: 1299, originalPrice: 1899, discountPct: 32, rating: 4.7, reviews: 612, category: "Activewear", image: img("photo-1506629082955-511b1aa562c8"), badge: "BESTSELLER" },
  { id: "p42", brand: "Move", name: "Sports Bra", price: 899, originalPrice: 1299, discountPct: 31, rating: 4.6, reviews: 423, category: "Activewear", image: img("photo-1518611012118-696072aa579a") },
  { id: "p43", brand: "Flex Co", name: "Cropped Hoodie", price: 1799, originalPrice: 2499, discountPct: 28, rating: 4.5, reviews: 189, category: "Activewear", image: img("photo-1556821840-3a63f95609a7") },
  { id: "p44", brand: "Move", name: "Training Shorts", price: 999, originalPrice: 1499, discountPct: 33, rating: 4.6, reviews: 234, category: "Activewear", image: img("photo-1483721310020-03333e577078") },
  { id: "p45", brand: "Flex Co", name: "Seamless Tank", price: 799, originalPrice: 1199, discountPct: 33, rating: 4.5, reviews: 167, category: "Activewear", image: img("photo-1571019613454-1cb2f99b2d8b") },
  { id: "p46", brand: "Move", name: "Yoga Joggers", price: 1599, originalPrice: 2299, discountPct: 30, rating: 4.7, reviews: 312, category: "Activewear", image: img("photo-1517438476312-10d79c077509") },
  { id: "p47", brand: "Flex Co", name: "Performance Tee", price: 999, originalPrice: 1499, discountPct: 33, rating: 4.4, reviews: 198, category: "Activewear", image: img("photo-1581009146145-b5ef050c2e1e") },
  { id: "p48", brand: "Move", name: "Workout Bodysuit", price: 1499, originalPrice: 2199, discountPct: 32, rating: 4.6, reviews: 156, category: "Activewear", image: img("photo-1593079831268-3381b0db4a77") },
  { id: "p49", brand: "Flex Co", name: "Quick-Dry Pants", price: 1899, originalPrice: 2699, discountPct: 30, rating: 4.5, reviews: 178, category: "Activewear", image: img("photo-1539109136881-3be0616acf4b") },
  { id: "p50", brand: "Move", name: "Running Cap", price: 599, originalPrice: 899, discountPct: 33, rating: 4.3, reviews: 89, category: "Activewear", image: img("photo-1588850561407-ed78c282e89b") },
  { id: "p51", brand: "Flex Co", name: "Compression Tights", price: 1699, originalPrice: 2399, discountPct: 29, rating: 4.7, reviews: 267, category: "Activewear", image: img("photo-1518310383802-640c2de311b2") },
  { id: "p52", brand: "Move", name: "Light Windbreaker", price: 2299, originalPrice: 3299, discountPct: 30, rating: 4.5, reviews: 134, category: "Activewear", image: img("photo-1542327897-d73f4005b533") },
];

export const categories: Category[] = ["Ethnic Wear", "Western Wear", "Accessories", "Footwear", "Activewear"];
