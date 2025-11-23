import React, { useMemo } from 'react';
import { generatePaceTableData } from '../utils/paceCalculator';

const PaceTable = () => {
    const data = useMemo(() => generatePaceTableData(), []);

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
                            <tr key={row.mph}>
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
