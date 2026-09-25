import type { Game } from "@/types/game";

const GAMES_LIST_URL = "https://api.famobi.com/feed";

type ListGame = {
  package_id: string;
  name: string;
  description?: string;
  thumb_180: string;
  link: string;
  categories?: string[];
  orientation?: string;
};

// revisit
export const isAllowedGameUrl = (url: string): boolean => {
  return /^https:\/\/([a-z0-9-]+\.)*famobi\.com(\/|$)/i.test(url);
};

const toGame = (game: ListGame): Game => {
  return {
    id: game.package_id,
    title: game.name.trim(),
    description: game.description ?? "",
    url: game.link,
    thumbnail: game.thumb_180,
    categories: game.categories ?? [],
    orientation:
      game.orientation === "portrait" || game.orientation === "landscape"
        ? game.orientation
        : "none",
  };
};

const fetchGames = async (signal?: AbortSignal): Promise<Game[]> => {
  const response = await fetch(GAMES_LIST_URL, { signal });

  if (!response.ok) {
    throw new Error(`Feed request failed (${response.status})`);
  }

  const data: unknown = await response.json();
  const games = (data as { games?: ListGame[] })?.games ?? [];

  return games.map(toGame);
};

export default fetchGames;
