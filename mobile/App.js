
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useColorScheme, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Converter from './components/Converter';
import PaceTable from './components/PaceTable';

export default function App() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme || 'light');
  const [highlightMph, setHighlightMph] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  useEffect(() => {
    if (systemScheme) {
      setTheme(systemScheme);
    }
  }, [systemScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const increaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.min(prev + 0.1, 1.5));
  };

  const decreaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.max(prev - 0.1, 0.8));
  };

  const handleRowClick = (rowData) => {
    setHighlightMph(rowData.mph);
    setSelectedRowData(rowData);
  };

  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  // Dynamic styles based on font size
  const dynamicStyles = {
    text: { fontSize: 16 * fontSizeMultiplier },
    title: { fontSize: 24 * fontSizeMultiplier },
    buttonText: { fontSize: 14 * fontSizeMultiplier },
  };

  // Pass combined styles to components
  const componentThemeStyles = {
    ...themeStyles,
    text: { ...themeStyles.text, ...dynamicStyles.text },
    highlightedRow: theme === 'light' ? { backgroundColor: '#e6f7ff' } : { backgroundColor: '#1a365d' },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, themeStyles.container]}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
        <View style={styles.header}>
          <View style={styles.controls}>
            <View style={styles.fontControls}>
              <TouchableOpacity onPress={decreaseFontSize} style={[styles.button, themeStyles.button]}>
                <Text style={[styles.buttonText, themeStyles.buttonText, dynamicStyles.buttonText]}>A-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={increaseFontSize} style={[styles.button, themeStyles.button]}>
                <Text style={[styles.buttonText, themeStyles.buttonText, dynamicStyles.buttonText]}>A+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={toggleTheme} style={[styles.button, themeStyles.button]}>
              <Text style={[styles.buttonText, themeStyles.buttonText, dynamicStyles.buttonText]}>
                {theme === 'light' ? '🌙' : '☀️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.appTitle, themeStyles.text, dynamicStyles.title]}>Running Pace Calculator</Text>

          <Converter
            onSpeedChange={setHighlightMph}
            selectedRowData={selectedRowData}
            themeStyles={componentThemeStyles}
          />

          <PaceTable
            highlightMph={highlightMph}
            onRowClick={handleRowClick}
            themeStyles={componentThemeStyles}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const lightTheme = {
  container: { backgroundColor: '#f5f5f5' },
  text: { color: '#333' },
  card: { backgroundColor: '#fff' },
  input: { color: '#333', borderColor: '#ccc', backgroundColor: '#fff' },
  placeholder: { color: '#999' },
  button: { backgroundColor: '#e0e0e0' },
  buttonText: { color: '#333' },
  headerRow: { borderBottomColor: '#ccc' },
  row: { borderBottomColor: '#eee' },
};

const darkTheme = {
  container: { backgroundColor: '#121212' },
  text: { color: '#e0e0e0' },
  card: { backgroundColor: '#1e1e1e' },
  input: { color: '#e0e0e0', borderColor: '#444', backgroundColor: '#2d2d2d' },
  placeholder: { color: '#666' },
  button: { backgroundColor: '#333' },
  buttonText: { color: '#e0e0e0' },
  headerRow: { borderBottomColor: '#444' },
  row: { borderBottomColor: '#333' },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontControls: {
    flexDirection: 'row',
    marginRight: 16,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
  },
  appTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
});
