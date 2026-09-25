import { colours } from "@/colours";
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
        {game.categories[0] ? (
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {game.categories[0].replace(/-/g, " ")}
            </Text>
          </View>
        ) : null}
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
    borderRadius: 14,
    backgroundColor: colours.surface,
    borderWidth: 1,
    borderColor: colours.primarySoft,
    shadowColor: colours.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  pressed: {
    backgroundColor: colours.accentSoft,
    borderColor: colours.accent,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colours.primarySoft,
  },
  info: { flex: 1, marginLeft: 12 },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: colours.text,
    marginBottom: 4,
  },
  description: { fontSize: 14, color: colours.textMuted },
  tag: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colours.accentSoft,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: colours.accentText,
    textTransform: "capitalize",
  },
});
