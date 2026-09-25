import type { Game } from "@/types/game";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  game: Game;
  onPress: (game: Game) => void;
};

export function GameCard({ game, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(game)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Play ${game.title}`}
    >
      <Image
        source={{ uri: game.thumbnail }}
        style={styles.thumb}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {game.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  pressed: { opacity: 0.7 },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 17, fontWeight: "600", marginBottom: 4 },
  description: { fontSize: 14, color: "#666" },
});
