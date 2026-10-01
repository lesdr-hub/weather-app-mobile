import { StyleSheet, Text, View } from "react-native";
import { WeatherIcon } from "./WeatherIcon";
import { formatTemp } from "../utils/units";
import { formatDayLabel, groupForecastByDay } from "../utils/datetime";
import { colors, fonts } from "../theme";

// daily forecast 
function summarizeDay(entries) {
    const temps = entries.map((entry) => entry.main?.temp).filter(Number.isFinite);
    const min = Math.min(...temps);
    const max = Math.max(...temps);

    const midday = entries.reduce((closest, entry) => {
        const hour = new Date(entry.dt * 1000).getUTCHours();
        const closestHour = new Date(closest.dt * 1000).getUTCHours();
        return Math.abs(hour - 12) < Math.abs(closestHour - 12) ? entry : closest;
    }, entries[0]);

    return { min, max, icon: midday.weather?.[0]?.icon, dt: midday.dt };
}

export function DailyForecast({ forecast, unitSystem }) {
    if (!forecast?.list?.length) return null;

    const timezoneOffset = forecast.city?.timezone ?? 0;
    const days = groupForecastByDay(forecast.list, timezoneOffset).slice(0, 7);

    return (
        <View style={styles.section}>
            <Text style={styles.heading}>{days.length}-Day Forecast</Text>
            {days.map(({ dayKey, entries }, index) => {
                const { min, max, icon, dt } = summarizeDay(entries);
                return (
                    <View
                        key={dayKey}
                        style={[styles.row, index === days.length - 1 && styles.lastRow]}
                    >
                        <Text style={styles.day}>{formatDayLabel(dt, timezoneOffset)}</Text>
                        <WeatherIcon owmIconCode={icon} size={32} />
                        <View style={styles.range}>
                            <Text style={styles.high}>{formatTemp(max, unitSystem)}</Text>
                            <Text style={styles.low}>{formatTemp(min, unitSystem)}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    section: { marginBottom: 48 },
    heading: {
        fontFamily: fonts.display,
        fontWeight: "500",
        fontSize: 20,
        color: colors.text,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    lastRow: { borderBottomWidth: 0 },
    day: { width: 56, fontSize: 15, fontWeight: "500", color: colors.text },
    range: { flex: 1, flexDirection: "row", justifyContent: "flex-end", gap: 16 },
    high: { fontSize: 15, color: colors.text },
    low: { fontSize: 15, color: colors.textMuted },
});
