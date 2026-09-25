import type { Game } from "@/types/game";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CardProps = {
  game: Game;
  onPress: (game: Game) => void;
};

export const GameCard = ({ game, onPress }: CardProps) => {
  return (
    <Pressable
      onPress={() => onPress(game)}
      style={({ pressed }) => {
        [styles.card, pressed && styles.pressed];
      }}
      accessibilityRole="button"
      accessibilityLabel={`Play ${game.title}`}
    >
      {game.thumbnail ? (
        <Image
          source={{ uri: game.thumbnail }}
          style={styles.thumb}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View
          style={[
            styles.thumb,
            styles.placeholder,
            { backgroundColor: game.color },
          ]}
        >
          <Text style={styles.initial}>{game.title.charAt(0)}</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {game.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pressed: { opacity: 0.7 },
  thumb: { width: 64, height: 64, borderRadius: 10 },
  placeholder: { alignItems: "center", justifyContent: "center" },
  initial: { color: "#fff", fontSize: 28, fontWeight: "700" },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 17, fontWeight: "600", marginBottom: 4 },
  description: { fontSize: 14, color: "#666" },
});
