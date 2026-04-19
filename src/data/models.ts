import m1 from "@/assets/model-1.jpg";
import m2 from "@/assets/model-2.jpg";
import m3 from "@/assets/model-3.jpg";
import m4 from "@/assets/model-4.jpg";
import m5 from "@/assets/model-5.jpg";

export type AIModel = {
  id: string;
  name: string;
  tone: string;
  gender: "F" | "M";
  image: string;
};

export const aiModels: AIModel[] = [
  { id: "m1", name: "Aanya", tone: "Fair",     gender: "F", image: m1 },
  { id: "m2", name: "Diya",  tone: "Wheatish", gender: "F", image: m2 },
  { id: "m3", name: "Meera", tone: "Dusky",    gender: "F", image: m3 },
  { id: "m4", name: "Arjun", tone: "Medium",   gender: "M", image: m4 },
  { id: "m5", name: "Tara",  tone: "Warm",     gender: "F", image: m5 },
];
