// ===============
// imports
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// ===============
// components
import { SearchBar } from "./src/components/SearchBar";
import { Hero } from "./src/components/Hero";
import { HourlyForecast } from "./src/components/HourlyForecast";
import { DailyForecast } from "./src/components/DailyForecast";
import { UnitToggle } from "./src/components/UnitToggle";
import { LoadingView, ErrorView } from "./src/components/StatusView";
import { useWeatherData } from "./src/hooks/useWeatherData";
import { useUnitPreference } from "./src/hooks/useUnitPreference";
import { useDeviceLocation } from "./src/hooks/useDeviceLocation";
import { colors } from "./src/theme";

// ===============
// main

// set default location to vancouver
const DEFAULT_LOCATION = { lat: 49.2827, lon: -123.1207, name: "Vancouver, BC, CA" };

function Weather() {
    const [location, setLocation] = useState(DEFAULT_LOCATION); // location state
    const { unitSystem, toggleUnitSystem, ready } = useUnitPreference(); // update unit preference
    const { locate, locating, error: locateError } = useDeviceLocation(); // phone GPS
    const { current, forecast, loading, error } = useWeatherData(
        ready ? location : null, // wait for the saved unit preference before fetching
        unitSystem,
    );

    async function handleLocate() {
        const here = await locate();
        if (here) setLocation(here);
    }

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={styles.app}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <SearchBar onSelect={setLocation} />
                    <Pressable
                        onPress={handleLocate}
                        disabled={locating}
                        style={styles.locate}
                        accessibilityRole="button"
                        accessibilityLabel="Use my location"
                    >
                        <Text style={styles.locateText}>{locating ? "…" : "📍"}</Text>
                    </Pressable>
                    <UnitToggle unitSystem={unitSystem} onToggle={toggleUnitSystem} />
                </View>

                {locateError && <Text style={styles.locateError}>{locateError}</Text>}

                {(loading || !ready) && <LoadingView />}
                {ready && !loading && error && <ErrorView message={error} />}
                {ready && !loading && !error && current && (
                    <>
                        <Hero
                            current={current}
                            unitSystem={unitSystem}
                            locationName={location.name}
                        />
                        <HourlyForecast forecast={forecast} unitSystem={unitSystem} />
                        <DailyForecast forecast={forecast} unitSystem={unitSystem} />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <Weather />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.bg },
    app: { padding: 24, paddingBottom: 80 },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 40,
    },
    locate: { padding: 8 },
    locateText: { fontSize: 18 },
    locateError: { color: colors.accent, fontSize: 13, marginBottom: 24 },
});
