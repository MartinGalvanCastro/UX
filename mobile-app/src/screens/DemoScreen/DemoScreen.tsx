import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Screen } from '../../components/Screen';
import { EditModeProvider } from '../../providers/EditModeProvider/EditModeProvider';
import { useEditModeContext } from '../../hooks/useEditModeContext/useEditModeContext';
import { AlarmRow } from '../../components/AlarmRow/AlarmRow';
import { AlarmListEmptyComponent } from '../../components/AlarmListEmptyComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';


function DemoScreenInternal() {
    const theme = useTheme();
    const { alarms } = useSelector((state: RootState) => state.alarm);
    const { isEditMode, setIsEditMode } = useEditModeContext();

    const handlePress = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <View style={styles.container}>
            <Text variant='displayMedium' style={styles.title}>Mis Alarmas</Text>
            {alarms.length > 0 && (
                <TouchableOpacity onPress={handlePress} style={styles.editButton}>
                    <Text variant='bodyLarge'>{isEditMode ? 'Volver' : 'Editar'}</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AlarmRow alarm={item} />}
                ListEmptyComponent={<AlarmListEmptyComponent />}
            />
        </View>
    );
}

export function DemoScreen() {
    return (
        <Screen dontHideNavbar>
            <EditModeProvider>
                <DemoScreenInternal />
            </EditModeProvider>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    editButton: {
        alignSelf: 'flex-end',
        padding: 8,
    },
    title: {
        marginVertical: 24,
        textAlign: 'center',
    }
});
