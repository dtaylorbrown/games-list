export type Game = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  categories: string[];
  orientation: "portrait" | "landscape" | "none";
};
