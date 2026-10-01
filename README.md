# Weather App (Expo / React Native)

Mobile port of the React + Vite weather app. Same OpenWeatherMap logic (hooks, API service, utils), with the UI rewritten in React Native.

## Run it

```bash
npm install
cp .env.example .env   # then paste your OpenWeatherMap key
npx expo start
```

Install **Expo Go** on your phone, make sure the phone and computer are on the same Wi-Fi, then scan the QR code (Camera app on iOS, Expo Go on Android). Edits hot-reload.

Press `a` for an Android emulator (needs Android Studio) or `w` for a browser preview. The iOS Simulator needs a Mac.

## What changed from the web version

- `div`/`span` etc. became `View`/`Text`; CSS became `StyleSheet` (palette kept in `src/theme.js`)
- `VITE_OWM_API_KEY` is now `EXPO_PUBLIC_OWM_API_KEY`
- `localStorage` became AsyncStorage (unit preference)
- SVG weather icons use `react-native-svg`
- New: "use my location" button (`src/hooks/useDeviceLocation.js`)
- Unchanged: `useWeatherData`, `useLocationSearch`, `utils/*`

## Layout

```
App.js                 root screen
src/components/        UI
src/hooks/             data + device hooks
src/services/          OpenWeatherMap calls
src/utils/             formatting helpers
```
