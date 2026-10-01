import { useEffect, useRef, useState } from "react";
import { searchLocations, WeatherApiError } from "../services/weatherApi";

const DEBOUNCE_MS = 400; // prevents the api from performing a location search EVERY KEYPRESS
                         // big performance saver 
const MIN_QUERY_LENGTH = 2;

// location search functionality
export function useLocationSearch(query) {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [pendingId, setPendingId] = useState(0);
    const [settledId, setSettledId] = useState(0);
    const requestIdRef = useRef(0);

    const trimmed = query.trim();
    const isQueryTooShort = trimmed.length < MIN_QUERY_LENGTH;

    useEffect(() => {
        if (isQueryTooShort) {
            return undefined;
        }

        const currentRequestId = ++requestIdRef.current;
        setPendingId(currentRequestId);

        const timeoutId = setTimeout(async () => {
            try {
                const data = await searchLocations(trimmed);
                if (currentRequestId === requestIdRef.current) {
                    setResults(data ?? []);
                    setError(null);
                    setSettledId(currentRequestId);
                }
            } catch (err) {
                if (currentRequestId === requestIdRef.current) {
                    setResults([]);
                    setError(
                        err instanceof WeatherApiError
                            ? err.message
                            : "Search failed.",
                    );
                    setSettledId(currentRequestId);
                }
            }
        }, DEBOUNCE_MS);

        return () => clearTimeout(timeoutId); 
    }, [trimmed, isQueryTooShort]);

    if (isQueryTooShort) {
        return { results: [], loading: false, error: null };
    }

    return { results, loading: pendingId !== settledId, error };
}
