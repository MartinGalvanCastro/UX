// Screen.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { Navbar } from '../Navbar/Navbar';

export interface ScreenProps {
    children: React.ReactNode;
    dontHideNavbar?: boolean;
    scrollable?: boolean;
}

export function Screen({ children, dontHideNavbar, scrollable = false }: ScreenProps) {
    const theme = useTheme();
    const { isAuth } = useSelector((state: RootState) => state.user);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {scrollable ? (
                <ScrollView contentContainerStyle={styles.innerContainer}>
                    {children}
                    {isAuth && dontHideNavbar && <Navbar />}
                </ScrollView>
            ) : (
                <View style={styles.innerContainer}>
                    {children}
                    {isAuth && dontHideNavbar && <Navbar />}
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flexGrow: 1,
    },
});
