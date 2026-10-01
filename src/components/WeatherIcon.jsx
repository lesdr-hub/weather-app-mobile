import Svg, { Circle, G, Line, Path } from 'react-native-svg';
import { resolveIconKey } from '../utils/weatherIcons';

// generated with AI (ported to react-native-svg)
const ICONS = {
    'clear-day': (
        <>
            <Circle cx="32" cy="32" r="14" fill="#FDB813" />
            <G stroke="#FDB813" strokeWidth="3" strokeLinecap="round">
                <Line x1="32" y1="4" x2="32" y2="12" />
                <Line x1="32" y1="52" x2="32" y2="60" />
                <Line x1="4" y1="32" x2="12" y2="32" />
                <Line x1="52" y1="32" x2="60" y2="32" />
                <Line x1="12.7" y1="12.7" x2="18.3" y2="18.3" />
                <Line x1="45.7" y1="45.7" x2="51.3" y2="51.3" />
                <Line x1="12.7" y1="51.3" x2="18.3" y2="45.7" />
                <Line x1="45.7" y1="18.3" x2="51.3" y2="12.7" />
            </G>
        </>
    ),
    'clear-night': (
        <>
            <Path
                d="M40 8a22 22 0 1 0 16 37 18 18 0 0 1-16-37z"
                fill="#D6DEEB"
            />
        </>
    ),
    'partly-cloudy-day': (
        <>
            <Circle cx="24" cy="24" r="10" fill="#FDB813" />
            <Path
                d="M20 46a12 12 0 0 1 22-7 10 10 0 0 1-2 19H22a9 9 0 0 1-2-12z"
                fill="#B0BEC5"
            />
        </>
    ),
    'partly-cloudy-night': (
        <>
            <Path
                d="M18 22a12 12 0 1 0 8 20 9 9 0 0 1-8-20z"
                fill="#D6DEEB"
            />
            <Path
                d="M20 46a12 12 0 0 1 22-7 10 10 0 0 1-2 19H22a9 9 0 0 1-2-12z"
                fill="#8FA0AC"
            />
        </>
    ),
    cloudy: (
        <>
            <Path
                d="M16 46a14 14 0 0 1 26-8 12 12 0 0 1-2 22H18a10 10 0 0 1-2-14z"
                fill="#B0BEC5"
            />
        </>
    ),
    rain: (
        <>
            <Path
                d="M16 38a14 14 0 0 1 26-8 12 12 0 0 1-2 22H18a10 10 0 0 1-2-14z"
                fill="#90A4AE"
            />
            <G stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round">
                <Line x1="22" y1="54" x2="19" y2="60" />
                <Line x1="32" y1="54" x2="29" y2="60" />
                <Line x1="42" y1="54" x2="39" y2="60" />
            </G>
        </>
    ),
    thunderstorm: (
        <>
            <Path
                d="M16 36a14 14 0 0 1 26-8 12 12 0 0 1-2 22H18a10 10 0 0 1-2-14z"
                fill="#78909C"
            />
            <Path d="M30 44l-6 12h7l-4 10 12-16h-7l5-6z" fill="#FDB813" />
        </>
    ),
    snow: (
        <>
            <Path
                d="M16 36a14 14 0 0 1 26-8 12 12 0 0 1-2 22H18a10 10 0 0 1-2-14z"
                fill="#B0BEC5"
            />
            <G stroke="#E1F5FE" strokeWidth="3" strokeLinecap="round">
                <Line x1="22" y1="52" x2="22" y2="60" />
                <Line x1="32" y1="52" x2="32" y2="60" />
                <Line x1="42" y1="52" x2="42" y2="60" />
                <Line x1="19" y1="56" x2="25" y2="56" />
                <Line x1="29" y1="56" x2="35" y2="56" />
                <Line x1="39" y1="56" x2="45" y2="56" />
            </G>
        </>
    ),
    mist: (
        <>
            <G stroke="#B0BEC5" strokeWidth="4" strokeLinecap="round">
                <Line x1="10" y1="24" x2="54" y2="24" />
                <Line x1="10" y1="34" x2="54" y2="34" />
                <Line x1="16" y1="44" x2="48" y2="44" />
            </G>
        </>
    ),
};

export function WeatherIcon({ owmIconCode, size = 48 }) {
    const key = resolveIconKey(owmIconCode);
    const icon = ICONS[key] ?? ICONS.cloudy;

    return (
        <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
            {icon}
        </Svg>
    );
}
