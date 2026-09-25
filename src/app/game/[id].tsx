import { GAMES } from "@/mock-game-data";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const GameScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [hasError, setHasError] = useState(false);

  const game = GAMES.find((game) => game.id === id);

  const closeButton = (
    <Pressable
      onPress={() => router.back()}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="Close game"
      style={[styles.close, { top: insets.top + 36, right: insets.right + 12 }]}
    >
      <Text style={styles.closeText}>x</Text>
    </Pressable>
  );

  if (!game || hasError) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.message}>
          {game ? "Could not load this game" : "Game not found"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView
        source={{ uri: game.url }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        setSupportMultipleWindows={false}
        onError={() => setHasError(true)}
      />
      {closeButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { alignItems: "center", justifyContent: "center" },
  webview: { flex: 1, backgroundColor: "#000" },
  message: { color: "#fff", fontSize: 16 },
  close: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

export default GameScreen;
