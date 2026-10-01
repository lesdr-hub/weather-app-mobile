import { useEffect, useState } from "react";
import {
    getCurrentWeather,
    getForecast,
    WeatherApiError,
} from "../services/weatherApi";

// single weather data function to get all weather data per location 
export function useWeatherData(location, unitSystem) {
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!location) return;

        let cancelled = false;

        async function fetchWeather() {
            setLoading(true);
            setError(null);

            try {
                const [currentData, forecastData] = await Promise.all([
                    getCurrentWeather(location.lat, location.lon, unitSystem),
                    getForecast(location.lat, location.lon, unitSystem),
                ]);

                if (!cancelled) {
                    setCurrent(currentData);
                    setForecast(forecastData);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof WeatherApiError
                            ? err.message
                            : "Failed to load weather data.",
                    );
                    setCurrent(null);
                    setForecast(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchWeather();

        return () => {
            cancelled = true;
        };
    }, [location, unitSystem]);

    return { current, forecast, loading, error };
}
