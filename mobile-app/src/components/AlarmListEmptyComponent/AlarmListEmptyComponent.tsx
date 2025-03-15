import { IconButton, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from 'react-native';


export const AlarmListEmptyComponent = () => {

    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text variant="bodyLarge" style={styles.title}>
                No tienes ninguna alarma configurada
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
                Comienza añadiendo una alarma con el botón de cámara o el de más
            </Text>
            <IconButton
                icon="tray-arrow-down"
                size={48}
                iconColor={theme.colors.onSurface}
                disabled
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
    },
    title: {
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 16,
        textAlign: 'center',
    },
});