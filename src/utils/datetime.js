export function toLocationDate(unixSeconds, timezoneOffsetSeconds = 0) {
    return new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
}

export function formatHour(unixSeconds, timezoneOffsetSeconds = 0) {
    const date = toLocationDate(unixSeconds, timezoneOffsetSeconds);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        timeZone: "UTC",
    });
}

export function formatDayLabel(unixSeconds, timezoneOffsetSeconds = 0) {
    const date = toLocationDate(unixSeconds, timezoneOffsetSeconds);
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "UTC",
    });
}

export function formatDateReadable(unixSeconds, timezoneOffsetSeconds = 0) {
    const date = toLocationDate(unixSeconds, timezoneOffsetSeconds);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}

export function groupForecastByDay(list, timezoneOffsetSeconds = 0) {
    const days = new Map();

    for (const item of list) {
        const date = toLocationDate(item.dt, timezoneOffsetSeconds);
        const dayKey = date.toISOString().slice(0, 10);

        if (!days.has(dayKey)) {
            days.set(dayKey, []);
        }
        days.get(dayKey).push(item);
    }

    return Array.from(days.entries()).map(([dayKey, entries]) => ({
        dayKey,
        entries,
    }));
}
