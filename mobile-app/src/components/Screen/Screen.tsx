import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ScreenProps {
    children: React.ReactNode;
}

export function Screen({ children }: ScreenProps) {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
