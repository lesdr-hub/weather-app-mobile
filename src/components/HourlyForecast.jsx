import { ScrollView, StyleSheet, Text, View } from "react-native";
import { WeatherIcon } from "./WeatherIcon";
import { formatTemp } from "../utils/units";
import { formatHour } from "../utils/datetime";
import { colors, fonts } from "../theme";

// forecast per hour (notably in 3 hour gaps due to free tier restrictions with open weather map api)
export function HourlyForecast({ forecast, unitSystem }) {
    if (!forecast?.list?.length) return null;

    const timezoneOffset = forecast.city?.timezone ?? 0;
    const upcoming = forecast.list.slice(0, 12);

    return (
        <View style={styles.section}>
            <Text style={styles.heading}>Hourly Forecast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {upcoming.map((step) => (
                    <View key={step.dt} style={styles.item}>
                        <Text style={styles.time}>
                            {formatHour(step.dt, timezoneOffset)}
                        </Text>
                        <WeatherIcon owmIconCode={step.weather?.[0]?.icon} size={36} />
                        <Text style={styles.temp}>
                            {formatTemp(step.main?.temp, unitSystem)}
                        </Text>
                    </View>
                ))}
            </ScrollView>
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
    scroll: { gap: 28, paddingBottom: 8 },
    item: { alignItems: "center", gap: 10, minWidth: 48 },
    time: { fontSize: 13, color: colors.textMuted },
    temp: { fontSize: 15, fontWeight: "500", color: colors.text },
});
