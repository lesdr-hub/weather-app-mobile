import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocationSearch } from "../hooks/useLocationSearch";
import { formatPlaceName } from "../utils/places";
import { colors } from "../theme";

// search bar (results show in the page flow below the input; the parent ScrollView
// uses keyboardShouldPersistTaps="handled" so tapping a result works while typing)
export function SearchBar({ onSelect }) {
    const [query, setQuery] = useState("");
    const { results, loading, error } = useLocationSearch(query);
    const showResults = query.trim().length >= 2;

    function handleSelect(place) {
        onSelect({ lat: place.lat, lon: place.lon, name: formatPlaceName(place) });
        setQuery("");
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search for a city..."
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                autoCorrect={false}
                returnKeyType="search"
                accessibilityLabel="Search for a city"
            />

            {showResults && (
                <View style={styles.results}>
                    {loading && <Text style={styles.hint}>Searching...</Text>}
                    {error && <Text style={styles.hint}>{error}</Text>}
                    {!loading && !error && results.length === 0 && (
                        <Text style={styles.hint}>No matches found.</Text>
                    )}
                    {results.map((place, index) => (
                        <Pressable
                            key={`${place.lat}-${place.lon}-${index}`}
                            onPress={() => handleSelect(place)}
                            style={({ pressed }) => [styles.result, pressed && styles.pressed]}
                        >
                            <Text style={styles.resultText}>{formatPlaceName(place)}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 4,
        fontSize: 15,
        color: colors.text,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    results: {
        marginTop: 4,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.divider,
    },
    result: { paddingVertical: 12, paddingHorizontal: 14 },
    pressed: { backgroundColor: "rgba(234, 240, 246, 0.06)" },
    resultText: { fontSize: 14, color: colors.text },
    hint: { paddingVertical: 10, paddingHorizontal: 14, fontSize: 14, color: colors.textMuted },
});
