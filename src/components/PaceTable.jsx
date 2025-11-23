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
                            <th>MPH</th>
                            <th>KPH</th>
                            <th>Min / Km</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.mph}>
                                <td>{row.paceMile}</td>
                                <td>{row.mph}</td>
                                <td>{row.kph}</td>
                                <td>{row.paceKm}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaceTable;
