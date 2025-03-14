import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { theme } from './src/theme';
import { AppNavigation } from './src/navigation/AppNavigation';

const AppContent = () => {
  const theme = useTheme();

  return (
    // This outer view fills the entire window and sets the background color.
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppNavigation />
    </View>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
