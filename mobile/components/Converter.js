
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { mphToKph, kphToMph, speedToPace, paceToSpeed } from '../utils/paceCalculator';

const Converter = ({ onSpeedChange, selectedRowData, themeStyles }) => {
    const [mph, setMph] = useState('');
    const [kph, setKph] = useState('');
    const [paceMile, setPaceMile] = useState('');
    const [paceKm, setPaceKm] = useState('');

    useEffect(() => {
        if (selectedRowData) {
            setMph(selectedRowData.mph);
            setKph(selectedRowData.kph);
            setPaceMile(selectedRowData.paceMile);
            setPaceKm(selectedRowData.paceKm);
        }
    }, [selectedRowData]);

    const handleMphChange = (val) => {
        setMph(val);
        if (onSpeedChange) onSpeedChange(val);
        if (val && !isNaN(val)) {
            const k = mphToKph(val);
            setKph(k.toString());
            setPaceMile(speedToPace(val, 'mph'));
            setPaceKm(speedToPace(k, 'kph'));
        } else {
            setKph('');
            setPaceMile('');
            setPaceKm('');
        }
    };

    const handleKphChange = (val) => {
        setKph(val);
        if (val && !isNaN(val)) {
            const m = kphToMph(val);
            setMph(m.toString());
            if (onSpeedChange) onSpeedChange(m);
            setPaceMile(speedToPace(m, 'mph'));
            setPaceKm(speedToPace(val, 'kph'));
        } else {
            setMph('');
            if (onSpeedChange) onSpeedChange('');
            setPaceMile('');
            setPaceKm('');
        }
    };

    const parsePace = (paceStr) => {
        const parts = paceStr.split(':');
        if (parts.length !== 2) return null;
        const min = parseFloat(parts[0]);
        const sec = parseFloat(parts[1]);
        if (isNaN(min) || isNaN(sec)) return null;
        return { min, sec };
    };

    const handlePaceMileChange = (val) => {
        setPaceMile(val);
        const parsed = parsePace(val);
        if (parsed) {
            const m = paceToSpeed(parsed.min, parsed.sec, 'mph');
            setMph(m.toString());
            if (onSpeedChange) onSpeedChange(m);
            const k = mphToKph(m);
            setKph(k.toString());
            setPaceKm(speedToPace(k, 'kph'));
        }
    };

    return (
        <View style={[styles.card, themeStyles.card]}>
            <Text style={[styles.title, themeStyles.text]}>Pace Converter</Text>
            <View style={styles.grid}>
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, themeStyles.text]}>Speed (MPH)</Text>
                    <TextInput
                        style={[styles.input, themeStyles.input]}
                        placeholder="e.g. 6.0"
                        placeholderTextColor={themeStyles.placeholder.color}
                        keyboardType="numeric"
                        value={mph}
                        onChangeText={handleMphChange}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, themeStyles.text]}>Speed (KPH)</Text>
                    <TextInput
                        style={[styles.input, themeStyles.input]}
                        placeholder="e.g. 9.65"
                        placeholderTextColor={themeStyles.placeholder.color}
                        keyboardType="numeric"
                        value={kph}
                        onChangeText={handleKphChange}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, themeStyles.text]}>Pace (Min/Mile)</Text>
                    <TextInput
                        style={[styles.input, themeStyles.input]}
                        placeholder="e.g. 10:00"
                        placeholderTextColor={themeStyles.placeholder.color}
                        value={paceMile}
                        onChangeText={handlePaceMileChange}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, themeStyles.text]}>Pace (Min/Km)</Text>
                    <TextInput
                        style={[styles.input, themeStyles.input, styles.readOnly]}
                        placeholder="Calculated..."
                        placeholderTextColor={themeStyles.placeholder.color}
                        value={paceKm}
                        editable={false}
                    />
                </View>
            </View>
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    inputGroup: {
        width: '48%',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    readOnly: {
        backgroundColor: '#f0f0f0',
        opacity: 0.7,
    },
});

export default Converter;
