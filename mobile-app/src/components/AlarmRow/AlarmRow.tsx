import React, { useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useTheme, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '../../navigation';
import { useEditMode } from '../../providers/EditModeProvider';
import { AppDispatch, type Alarm, deleteAlarm } from '../../redux'; // or wherever your Alarm type is
import { AppRoutes } from '../../navigation';
import { useDispatch } from 'react-redux';
import { getNextAlarmTimestamp } from '../../util/getNextAlarmTimestamp';

export type AlarmRowProps = {
    alarm: Alarm;
};


export function AlarmRow({ alarm }: AlarmRowProps) {
    const theme = useTheme();
    const { isEditMode } = useEditMode();
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();

    const onEdit = () => {
        navigation.navigate(AppRoutes.AlarmForm, { alarmId: alarm.id });
    };

    const formattedTimeStamp: string = useMemo(() => {
        const { firstDoseHour, cadence } = alarm
        const nextTimestamp = getNextAlarmTimestamp({ firstDoseHour, cadence });
        return new Date(nextTimestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }, [])

    const onDelete = () => {
        Alert.alert(
            'Eliminar Alarma',
            `¿Estás seguro de que deseas eliminar la alarma para el medicmaneto '${alarm.name}'?`,
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteAlarm(alarm.id));
                    },
                },
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: '#DEE5FF' }]}>
            <View style={styles.textContainer}>
                <Text variant="titleLarge" style={styles.timeText}>
                    {formattedTimeStamp}
                </Text>
                <Text variant="bodyMedium" style={styles.medNameText}>
                    {alarm.name}
                </Text>
            </View>
            {isEditMode && (
                <View style={styles.actionsContainer}>
                    <IconButton
                        icon="pencil"
                        size={24}
                        style={[styles.actionButton, { backgroundColor: '#F9D8FD' }]}
                        iconColor={theme.colors.onSurface}
                        onPress={onEdit}
                    />
                    <IconButton
                        icon="delete"
                        size={24}
                        style={[styles.actionButton, { backgroundColor: '#FFDAD6' }]}
                        iconColor={theme.colors.onSurface}
                        onPress={onDelete}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    timeText: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    medNameText: {},
    actionsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
