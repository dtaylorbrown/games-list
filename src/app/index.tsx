import { GameCard } from "@/components/game-card";
import { GAMES } from "@/mock-game-data";
import { Game } from "@/types/game";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

const GameListScreen = () => {
  const router = useRouter();

  const openGame = (game: Game) => {
    router.push({ pathname: "/game/[id]", params: { id: game.id } });
  };

  return (
    <FlatList
      data={GAMES}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GameCard game={item} onPress={openGame} />}
      contentContainerStyle={styles.list}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
});

export default GameListScreen;
