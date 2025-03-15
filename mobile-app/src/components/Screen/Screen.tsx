import React from 'react';
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { Navbar } from '../Navbar/Navbar';

interface ScreenProps {
    children: React.ReactNode;
    dontHideNavbar?: boolean;
}

export function Screen({ children, dontHideNavbar }: ScreenProps) {
    const theme = useTheme();
    const { isAuth } = useSelector((state: RootState) => state.user);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.innerContainer}>
                    <View style={styles.content}>
                        {children}
                    </View>
                    {(isAuth && dontHideNavbar) && <Navbar />}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
});
