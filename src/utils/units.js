
// unit systems 
export const UNIT_SYSTEMS = {
    metric: {
        label: "Metric",
        temp: "°C",
        speed: "km/h",
        owmParam: "metric",
    },
    imperial: {
        label: "Imperial",
        temp: "°F",
        speed: "mph",
        owmParam: "imperial",
    },
};

export function formatWindSpeed(speedValue, unitSystem) {
    if (speedValue == null) return "--";

    if (unitSystem === "metric") {
        const kmh = speedValue * 3.6;
        return `${Math.round(kmh)} km/h`;
    }

    return `${Math.round(speedValue)} mph`;
}

export function formatTemp(tempValue, unitSystem) {
    if (tempValue == null) return "--";
    const symbol = UNIT_SYSTEMS[unitSystem]?.temp ?? "";
    return `${Math.round(tempValue)}${symbol}`;
}

export function formatPercent(value) {
    if (value == null) return "--";
    return `${Math.round(value)}%`;
}
