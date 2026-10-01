import { useState } from "react";
import * as Location from "expo-location";
import { reverseGeocode } from "../services/weatherApi";
import { formatPlaceName } from "../utils/places";

// asks for permission, reads the phone's GPS position, and returns { lat, lon, name }
export function useDeviceLocation() {
    const [locating, setLocating] = useState(false);
    const [error, setError] = useState(null);

    async function locate() {
        setLocating(true);
        setError(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Location permission denied. You can still search for a city.");
                return null;
            }

            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            const { latitude: lat, longitude: lon } = position.coords;

            // turn coordinates into a readable name; fall back if the lookup fails
            let name = "Current location";
            try {
                const [place] = await reverseGeocode(lat, lon);
                if (place) name = formatPlaceName(place);
            } catch {
                // keep fallback name
            }

            return { lat, lon, name };
        } catch {
            setError("Couldn't get your location. Check that location services are on.");
            return null;
        } finally {
            setLocating(false);
        }
    }

    return { locate, locating, error };
}
