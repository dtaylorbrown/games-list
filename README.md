# games-list 👾🎮

This is a simple [Expo](https://expo.dev) project which lists games from `https://html5games.com/`

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Dev Notes

I found game data from Famobi's public JSON feed, which powers `https://html5games.com/`.

Tapping a game opens it in a `react-native-webview` component with the header and status bar hidden! If time permitted I would write some simple component tests to cover the game cards, add tests for the custom `useGames` hook!
