
import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { generatePaceTableData } from '../utils/paceCalculator';

const PaceTable = ({ highlightMph, onRowClick, themeStyles }) => {
    const data = useMemo(() => generatePaceTableData(), []);
    const [showTimeColumns, setShowTimeColumns] = useState(false);

    const activeRowMph = useMemo(() => {
        if (!highlightMph || isNaN(highlightMph)) return null;
        const target = parseFloat(highlightMph);
        const match = data.find(row => parseFloat(row.mph) <= target);
        return match ? match.mph : null;
    }, [data, highlightMph]);

    return (
        <View style={[styles.card, themeStyles.card]}>
            <Text style={[styles.title, themeStyles.text]}>Common Paces</Text>
            <TouchableOpacity
                style={[styles.toggleButton, themeStyles.button]}
                onPress={() => setShowTimeColumns(!showTimeColumns)}
            >
                <Text style={themeStyles.buttonText}>
                    {showTimeColumns ? 'Hide' : 'Show'} Race Times
                </Text>
            </TouchableOpacity>

            <ScrollView horizontal>
                <View>
                    <View style={[styles.headerRow, themeStyles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>Min/Mile</Text>
                        <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>Min/Km</Text>
                        <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>MPH</Text>
                        <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>KPH</Text>
                        {showTimeColumns && (
                            <>
                                <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>5k</Text>
                                <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>10k</Text>
                                <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>Half</Text>
                                <Text style={[styles.cell, styles.headerCell, themeStyles.text]}>Full</Text>
                            </>
                        )}
                    </View>
                    {data.map((row) => (
                        <TouchableOpacity
                            key={row.mph}
                            onPress={() => onRowClick && onRowClick(row)}
                            style={[
                                styles.row,
                                themeStyles.row,
                                activeRowMph === row.mph && styles.highlightedRow,
                                activeRowMph === row.mph && themeStyles.highlightedRow
                            ]}
                        >
                            <Text style={[styles.cell, themeStyles.text]}>{row.paceMile}</Text>
                            <Text style={[styles.cell, themeStyles.text]}>{row.paceKm}</Text>
                            <Text style={[styles.cell, themeStyles.text]}>{row.mph}</Text>
                            <Text style={[styles.cell, themeStyles.text]}>{row.kph}</Text>
                            {showTimeColumns && (
                                <>
                                    <Text style={[styles.cell, themeStyles.text]}>{row.time5k}</Text>
                                    <Text style={[styles.cell, themeStyles.text]}>{row.time10k}</Text>
                                    <Text style={[styles.cell, themeStyles.text]}>{row.timeHalf}</Text>
                                    <Text style={[styles.cell, themeStyles.text]}>{row.timeFull}</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    toggleButton: {
        padding: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cell: {
        width: 80,
        textAlign: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
    },
    highlightedRow: {
        backgroundColor: '#e6f7ff',
    },
});

export default PaceTable;
