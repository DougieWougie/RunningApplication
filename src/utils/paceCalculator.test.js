import { describe, it, expect } from 'vitest';
import { mphToKph, kphToMph, speedToPace, paceToSpeed, generatePaceTableData } from './paceCalculator';

describe('paceCalculator', () => {
    describe('mphToKph', () => {
        it('converts mph to kph correctly', () => {
            expect(mphToKph(1)).toBe(1.61);
            expect(mphToKph(10)).toBe(16.09);
            expect(mphToKph(6.21)).toBe(9.99); // approx 10kph
        });

        it('handles 0 and invalid inputs', () => {
            expect(mphToKph(0)).toBe(0);
            expect(mphToKph(null)).toBe(0);
        });
    });

    describe('kphToMph', () => {
        it('converts kph to mph correctly', () => {
            expect(kphToMph(1.60934)).toBe(1);
            expect(kphToMph(10)).toBe(6.21);
            expect(kphToMph(16.09)).toBe(10);
        });

        it('handles 0 and invalid inputs', () => {
            expect(kphToMph(0)).toBe(0);
            expect(kphToMph(null)).toBe(0);
        });
    });

    describe('speedToPace', () => {
        it('calculates pace correctly for given speed', () => {
            // 10 mph = 6 min/mile
            expect(speedToPace(10, 'mph')).toBe('6:00');
            // 6 mph = 10 min/mile
            expect(speedToPace(6, 'mph')).toBe('10:00');
            // 12 mph = 5 min/mile
            expect(speedToPace(12, 'mph')).toBe('5:00');
        });

        it('handles fractional speeds', () => {
            // 7.5 mph = 8 min/mile
            expect(speedToPace(7.5, 'mph')).toBe('8:00');
        });

        it('handles edge cases', () => {
            expect(speedToPace(0)).toBe('00:00');
            expect(speedToPace(-5)).toBe('00:00');
        });
    });

    describe('paceToSpeed', () => {
        it('calculates speed correctly from pace', () => {
            expect(paceToSpeed(6, 0)).toBe(10);
            expect(paceToSpeed(10, 0)).toBe(6);
            expect(paceToSpeed(5, 0)).toBe(12);
        });

        it('handles seconds correctly', () => {
            // 8:00 pace = 7.5 mph
            expect(paceToSpeed(8, 0)).toBe(7.5);
            // 6:30 pace = ~9.23 mph
            // 6.5 mins = 6.5/60 hours = 0.108333... hours. 1/0.10833 = 9.23
            expect(paceToSpeed(6, 30)).toBe(9.23);
        });
    });

    describe('generatePaceTableData', () => {
        it('generates a non-empty array', () => {
            const data = generatePaceTableData();
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThan(0);
        });

        it('contains correct structure', () => {
            const data = generatePaceTableData();
            const firstRow = data[0];
            expect(firstRow).toHaveProperty('mph');
            expect(firstRow).toHaveProperty('kph');
            expect(firstRow).toHaveProperty('paceMile');
            expect(firstRow).toHaveProperty('paceKm');
        });

        it('generates correct range', () => {
            const data = generatePaceTableData();
            // We know it starts at 3.0 and goes to 15.0
            // But we might have reversed it or not.
            // Let's check if 3.0 and 15.0 exist in the data
            const hasMin = data.some(r => r.mph === '3.0');
            const hasMax = data.some(r => r.mph === '15.0');
            expect(hasMin).toBe(true);
            expect(hasMax).toBe(true);
        });
    });
});
