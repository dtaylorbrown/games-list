import fetchGames from "@/api/games";
import type { Game } from "@/types/game";
import { useCallback, useEffect, useRef, useState } from "react";

export const useGames = (limit = 25) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const loadGames = useCallback(
    async (isRefresh: boolean) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const result = await fetchGames(controller.signal);
        setGames(result.slice(0, limit));
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [limit],
  );

  useEffect(() => {
    loadGames(false);
    return () => controllerRef.current?.abort();
  }, [loadGames]);

  return {
    games,
    loading,
    refreshing,
    error,
    reload: () => loadGames(false),
    refresh: () => loadGames(true),
  };
};
