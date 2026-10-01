// "Vancouver, BC, CA"
export function formatPlaceName(place) {
    return place.state
        ? `${place.name}, ${place.state}, ${place.country}`
        : `${place.name}, ${place.country}`;
}
