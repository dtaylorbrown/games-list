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
  const { id, url, title } = useLocalSearchParams<{
    id: string;
    url?: string;
    title?: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [hasError, setHasError] = useState(false);

  const gameUrl = /^[a-z0-9-]+$/i.test(id ?? "")
    ? `https://play.famobi.com/${id}`
    : null;

  const closeButton = (
    <Pressable
      onPress={() => router.back()}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={title ? `Close ${title}` : "Close game"}
      style={[styles.close, { top: insets.top + 36, right: insets.right + 12 }]}
    >
      <Text style={styles.closeText}>✕</Text>
    </Pressable>
  );

  if (!gameUrl || hasError) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.message}>
          {gameUrl ? "Could not load the game." : "Game not found."}
        </Text>
        {closeButton}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView
        source={{ uri: gameUrl }}
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
