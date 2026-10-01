import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

// loading screens
export function LoadingView({ label = "Loading weather..." }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={colors.accentCool} />
            <Text style={styles.muted}>{label}</Text>
        </View>
    );
}

export function ErrorView({ message = "Something went wrong.", onRetry }) {
    return (
        <View style={styles.container}>
            <Text style={styles.error}>{message}</Text>
            {onRetry && (
                <Pressable onPress={onRetry} style={styles.retry}>
                    <Text style={styles.retryText}>Try again</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center", gap: 16, paddingVertical: 80 },
    muted: { color: colors.textMuted, fontSize: 16 },
    error: { color: colors.text, fontSize: 16, textAlign: "center" },
    retry: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.divider,
    },
    retryText: { color: colors.text, fontSize: 14 },
});
