import React, { useMemo } from 'react';
import { generatePaceTableData } from '../utils/paceCalculator';

const PaceTable = ({ highlightMph, onRowClick }) => {
    const data = useMemo(() => generatePaceTableData(), []);

    const activeRowMph = useMemo(() => {
        if (!highlightMph || isNaN(highlightMph)) return null;
        const target = parseFloat(highlightMph);
        // Data is descending by MPH (15.0 -> 3.0)
        // We want the first row where row.mph <= target
        const match = data.find(row => parseFloat(row.mph) <= target);
        return match ? match.mph : null;
    }, [data, highlightMph]);

    return (
        <div className="card">
            <h2 className="section-title">Common Paces</h2>
            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Min / Mile</th>
                            <th>Min / Km</th>
                            <th>MPH</th>
                            <th>KPH</th>
                            <th>5k</th>
                            <th>10k</th>
                            <th>Half</th>
                            <th>Marathon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr
                                key={row.mph}
                                onClick={() => onRowClick && onRowClick(row.mph)}
                                className={activeRowMph === row.mph ? 'highlighted-row' : ''}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{row.paceMile}</td>
                                <td>{row.paceKm}</td>
                                <td>{row.mph}</td>
                                <td>{row.kph}</td>
                                <td>{row.time5k}</td>
                                <td>{row.time10k}</td>
                                <td>{row.timeHalf}</td>
                                <td>{row.timeFull}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaceTable;
