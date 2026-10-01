import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

// unit toggle button (shortened to °C / °F so it fits next to the search box on a phone)
export function UnitToggle({ unitSystem, onToggle }) {
    const isMetric = unitSystem === "metric";

    return (
        <Pressable
            onPress={onToggle}
            style={styles.toggle}
            accessibilityRole="button"
            accessibilityLabel="Toggle temperature units"
        >
            <Text style={[styles.label, isMetric && styles.active]}>°C</Text>
            <Text style={styles.divider}>/</Text>
            <Text style={[styles.label, !isMetric && styles.active]}>°F</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    toggle: { flexDirection: "row", alignItems: "center", gap: 6, padding: 8 },
    label: { fontSize: 14, color: colors.textMuted },
    active: { color: colors.accent, fontWeight: "600" },
    divider: { color: colors.textMuted, opacity: 0.5 },
});
