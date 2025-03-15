import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, IconButton, Switch, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button/Button';
import { useSnackbar } from '../../hooks/useSnackbar';
import { AppStackParamList, AppRoutes } from '../../navigation';
import { RootState } from '../../redux';
import { updateNotificationPreferences } from '../../redux/userSlice'; // Example action to update prefs

type AlarmPreferencesScreenProps = NativeStackScreenProps<AppStackParamList, AppRoutes.AlarmPreferences>;

export function AlarmPreferencesScreen({ navigation }: AlarmPreferencesScreenProps) {
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

    // Suppose we store preferences in Redux like { email: boolean; sms: boolean }
    const { email: currentEmail, sms: currentSms } = useSelector(
        (state: RootState) => state.user.notificationPreferences
    );

    // Local state for toggles
    const [email, setEmail] = useState(currentEmail);
    const [sms, setSms] = useState(currentSms);

    // Check if anything changed
    const hasChanged = useMemo(() => {
        return email !== currentEmail || sms !== currentSms;
    }, [email, sms, currentEmail, currentSms]);

    const handleSave = () => {
        dispatch(updateNotificationPreferences({ email, sms }));
        showSnackbar('Preferencias guardadas');
    };

    return (
        <Screen scrollable>
            <View style={styles.container}>
                <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
                <Text variant="displayMedium" style={styles.title}>
                    Preferencias de alarmas
                </Text>


                <View style={styles.rowContainer}>
                    <View style={styles.row}>
                        <Text variant="headlineSmall">Correo</Text>
                        <Switch value={email} onValueChange={setEmail} />
                    </View>

                    <Divider />

                    <View style={styles.row}>
                        <Text variant="headlineSmall">SMS</Text>
                        <Switch value={sms} onValueChange={setSms} />
                    </View>

                </View>

                <Button
                    mode="contained"
                    onAction={handleSave}
                    disabled={!hasChanged}
                    style={styles.saveButton}
                >
                    GUARDAR
                </Button>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        marginBottom: 32,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    saveButton: {
        marginTop: 24,
        alignSelf: 'center',
    },
    rowContainer: {
        gap: 16,
        marginBottom: 32,
    }
});
