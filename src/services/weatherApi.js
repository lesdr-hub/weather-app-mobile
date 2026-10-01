
const BASE_URL = "https://api.openweathermap.org";
const API_KEY = process.env.EXPO_PUBLIC_OWM_API_KEY;

class WeatherApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "WeatherApiError";
        this.status = status;
    }
}

async function request(path, params) {
    if (!API_KEY) {
        throw new WeatherApiError(
            "Missing OpenWeatherMap API key. Add EXPO_PUBLIC_OWM_API_KEY to your .env file and restart Expo.",
        );
    }

    const url = new URL(`${BASE_URL}${path}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, value);
        }
    });
    url.searchParams.set("appid", API_KEY);

    let response;
    try {
        response = await fetch(url.toString());
    } catch {
        throw new WeatherApiError("Network error - check your connection.");
    }

    if (!response.ok) {
        if (response.status === 401) {
            throw new WeatherApiError("Invalid API key.", 401);
        }
        if (response.status === 404) {
            throw new WeatherApiError("Location not found.", 404);
        }
        if (response.status === 429) {
            throw new WeatherApiError(
                "Rate limit reached. Try again shortly.",
                429,
            );
        }
        throw new WeatherApiError(
            `Weather service error (${response.status}).`,
            response.status,
        );
    }

    return response.json();
}

export function searchLocations(query, limit = 5) {
    return request("/geo/1.0/direct", { q: query, limit });
}

export function reverseGeocode(lat, lon) {
    return request("/geo/1.0/reverse", { lat, lon, limit: 1 });
}

export function getCurrentWeather(lat, lon, units) {
    return request("/data/2.5/weather", { lat, lon, units });
}

export function getForecast(lat, lon, units) {
    return request("/data/2.5/forecast", { lat, lon, units });
}

export { WeatherApiError };
