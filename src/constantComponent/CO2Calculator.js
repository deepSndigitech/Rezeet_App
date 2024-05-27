import React from 'react';
import { View, Text } from 'react-native';

const CO2Calculator = ({ totalScans }) => {
    // Constants
    const kgPerScan = 1.2;
    const kgPerTon = 1000;

    // Calculate total CO2 saved
    const totalCO2Saved = totalScans * kgPerScan;

    // Determine the unit to display
    let displayUnit = 'kg Co2e';
    let displayValue = totalCO2Saved;

    if (totalCO2Saved >= kgPerTon) {
        displayUnit = 'tons Co2e';
        displayValue = totalCO2Saved / kgPerTon;
    }

    return (

        <Text style={{ color: '#FFF', fontWeight: '700', }}>{displayValue.toFixed(2)} {displayUnit}</Text>
    );
};

export default CO2Calculator;
