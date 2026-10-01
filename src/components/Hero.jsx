import { StyleSheet, Text, View } from "react-native";
import { WeatherIcon } from "./WeatherIcon";
import { formatTemp, formatWindSpeed, formatPercent } from "../utils/units";
import { formatDateReadable } from "../utils/datetime";
import { colors, fonts } from "../theme";

function Stat({ label, value }) {
    return (
        <View style={styles.stat}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );
}

// main current weather component
export function Hero({ current, unitSystem, locationName }) {
    if (!current) return null;

    const weather = current.weather?.[0];
    const timezoneOffset = current.timezone ?? 0;

    return (
        <View style={styles.hero}>
            <Text style={styles.location}>{locationName}</Text>
            <Text style={styles.date}>
                {formatDateReadable(current.dt, timezoneOffset)}
            </Text>

            <View style={styles.main}>
                <WeatherIcon owmIconCode={weather?.icon} size={96} />
                <Text style={styles.temp}>
                    {formatTemp(current.main?.temp, unitSystem)}
                </Text>
            </View>

            <Text style={styles.description}>{weather?.description}</Text>

            <View style={styles.stats}>
                <Stat
                    label="Feels like"
                    value={formatTemp(current.main?.feels_like, unitSystem)}
                />
                <Stat label="Humidity" value={formatPercent(current.main?.humidity)} />
                <Stat
                    label="Wind"
                    value={formatWindSpeed(current.wind?.speed, unitSystem)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hero: { alignItems: "center", marginBottom: 56 },
    location: { fontSize: 18, fontWeight: "500", color: colors.text, marginBottom: 4 },
    date: { fontSize: 14, color: colors.textMuted, marginBottom: 24 },
    main: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 },
    temp: {
        fontFamily: fonts.display,
        fontWeight: "300",
        fontSize: 72,
        color: colors.text,
        letterSpacing: -1,
    },
    description: {
        textTransform: "capitalize",
        color: colors.textMuted,
        fontSize: 16,
        marginTop: 8,
        marginBottom: 32,
    },
    stats: { flexDirection: "row", justifyContent: "center", gap: 28 },
    stat: { gap: 4 },
    statLabel: { fontSize: 12, color: colors.textMuted },
    statValue: { fontSize: 16, fontWeight: "500", color: colors.text },
});
