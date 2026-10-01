import { Platform } from "react-native";

// same palette as the web app's CSS variables
export const colors = {
    bg: "#16253b",
    surface: "#1c2f4a",
    text: "#eaf0f6",
    textMuted: "#7a8ca3",
    accent: "#f2a65a",
    accentCool: "#5fa8d3",
    divider: "rgba(234, 240, 246, 0.12)",
};

// system fonts keep setup simple (no font loading); swap in Fraunces/Inter later if wanted
export const fonts = {
    display: Platform.select({ ios: "Georgia", default: "serif" }),
};
