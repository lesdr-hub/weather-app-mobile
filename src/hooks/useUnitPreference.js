import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UNIT_SYSTEMS } from "../utils/units";

const STORAGE_KEY = "weather-app:unit-system";

// AsyncStorage replaces localStorage (it's async, so we track when the stored value has loaded)
export function useUnitPreference() {
    const [unitSystem, setUnitSystem] = useState("metric");
    const [ready, setReady] = useState(false);

    // load saved preference once
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((stored) => {
                if (stored && UNIT_SYSTEMS[stored]) setUnitSystem(stored);
            })
            .catch(() => {})
            .finally(() => setReady(true));
    }, []);

    // save on change (but not before the load finishes, or we'd overwrite it with the default)
    useEffect(() => {
        if (ready) AsyncStorage.setItem(STORAGE_KEY, unitSystem).catch(() => {});
    }, [unitSystem, ready]);

    const toggleUnitSystem = useCallback(() => {
        const keys = Object.keys(UNIT_SYSTEMS);
        setUnitSystem((prev) => keys[(keys.indexOf(prev) + 1) % keys.length]);
    }, []);

    return { unitSystem, setUnitSystem, toggleUnitSystem, ready };
}
