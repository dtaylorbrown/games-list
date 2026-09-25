import { colours } from "@/colours";
import { GameCard } from "@/components/game-card";
import { useGames } from "@/hooks/use-games";
import type { Game } from "@/types/game";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function GameListScreen() {
  const router = useRouter();
  const { games, loading, refreshing, error, reload, refresh } = useGames();

  const openGame = (game: Game) => {
    router.push({
      pathname: "/game/[id]",
      params: { id: game.id, url: game.url, title: game.title },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colours.primary} />
      </View>
    );
  }

  if (error && games.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Couldn't load games</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <Pressable
          style={styles.retry}
          onPress={reload}
          accessibilityRole="button"
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GameCard game={item} onPress={openGame} />}
      contentContainerStyle={styles.list}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={colours.accent}
          colors={[colours.accent]}
        />
      }
      ListEmptyComponent={
        <View style={styles.center}>
          <Text>No games found.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colours.background,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: colours.text,
  },
  errorDetail: {
    color: colours.textMuted,
    marginBottom: 16,
    textAlign: "center",
  },
  retry: {
    backgroundColor: colours.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  retryText: { color: colours.text, fontWeight: "700" },
});
