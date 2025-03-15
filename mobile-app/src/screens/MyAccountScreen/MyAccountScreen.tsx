import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AppStackParamList, AppRoutes } from '../../navigation';
import { setAuth } from '../../redux/userSlice'; // adjust path as needed
import { Screen } from '../../components/Screen';

export type MyAccountScreenProps = NativeStackScreenProps<AppStackParamList, AppRoutes.MyAccount>;

export function MyAccountScreen({ navigation }: MyAccountScreenProps) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigation.navigate(AppRoutes.Login);
        dispatch(setAuth(false));
    };

    return (
        <Screen scrollable>
            <View style={styles.container}>
                <IconButton
                    icon="arrow-left"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text variant="displayMedium" style={styles.title}>
                    Mi Cuenta
                </Text>

                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.EmergencyContact)}>
                        <Text variant="headlineSmall">Contacto de Emergencia</Text>
                    </TouchableOpacity>

                    <Divider />

                    <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.AlarmPreferences)}>
                        <Text variant="headlineSmall">Preferencia de alarmas</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text variant="bodyLarge" style={styles.logoutText}>
                        CERRAR SESION
                    </Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    title: {
        marginBottom: 64,
        textAlign: 'center',
    },
    itemContainer: {
        gap: 16
    },
    logoutButton: {
        marginTop: 'auto',
        alignItems: 'center',
    },
    logoutText: {
        textDecorationLine: 'underline',
    },
});
