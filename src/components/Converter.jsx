import React, { useState, useEffect } from 'react';
import { mphToKph, kphToMph, speedToPace, paceToSpeed } from '../utils/paceCalculator';

const Converter = () => {
    const [mph, setMph] = useState('');
    const [kph, setKph] = useState('');
    const [paceMile, setPaceMile] = useState('');
    const [paceKm, setPaceKm] = useState('');

    const handleMphChange = (e) => {
        const val = e.target.value;
        setMph(val);
        if (val && !isNaN(val)) {
            const k = mphToKph(val);
            setKph(k);
            setPaceMile(speedToPace(val, 'mph'));
            setPaceKm(speedToPace(k, 'kph'));
        } else {
            setKph('');
            setPaceMile('');
            setPaceKm('');
        }
    };

    const handleKphChange = (e) => {
        const val = e.target.value;
        setKph(val);
        if (val && !isNaN(val)) {
            const m = kphToMph(val);
            setMph(m);
            setPaceMile(speedToPace(m, 'mph'));
            setPaceKm(speedToPace(val, 'kph'));
        } else {
            setMph('');
            setPaceMile('');
            setPaceKm('');
        }
    };

    // Handling pace input is trickier (MM:SS), for now let's stick to speed inputs driving the pace outputs
    // or simple text display. If we want two-way binding for pace, we need to parse MM:SS.
    // Let's add simple parsing for pace if the user types there.

    const parsePace = (paceStr) => {
        const parts = paceStr.split(':');
        if (parts.length !== 2) return null;
        const min = parseFloat(parts[0]);
        const sec = parseFloat(parts[1]);
        if (isNaN(min) || isNaN(sec)) return null;
        return { min, sec };
    };

    const handlePaceMileChange = (e) => {
        const val = e.target.value;
        setPaceMile(val);
        const parsed = parsePace(val);
        if (parsed) {
            const m = paceToSpeed(parsed.min, parsed.sec, 'mph');
            setMph(m);
            const k = mphToKph(m);
            setKph(k);
            setPaceKm(speedToPace(k, 'kph'));
        }
    };

    return (
        <div className="card">
            <h2 className="section-title">Pace Converter</h2>
            <div className="grid-2">
                <div className="input-group">
                    <label htmlFor="mph">Speed (MPH)</label>
                    <input
                        id="mph"
                        type="number"
                        placeholder="e.g. 6.0"
                        value={mph}
                        onChange={handleMphChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="kph">Speed (KPH)</label>
                    <input
                        id="kph"
                        type="number"
                        placeholder="e.g. 9.65"
                        value={kph}
                        onChange={handleKphChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="paceMile">Pace (Min/Mile)</label>
                    <input
                        id="paceMile"
                        type="text"
                        placeholder="e.g. 10:00"
                        value={paceMile}
                        onChange={handlePaceMileChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="paceKm">Pace (Min/Km)</label>
                    <input
                        id="paceKm"
                        type="text"
                        placeholder="Calculated..."
                        value={paceKm}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default Converter;
