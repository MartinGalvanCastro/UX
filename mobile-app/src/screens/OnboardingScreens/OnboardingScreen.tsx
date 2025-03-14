import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button/Button';
import { AppRoutes, AppStackParamList, useNavigation } from '../../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type OnboardingScreenProps = NativeStackScreenProps<AppStackParamList, AppRoutes.Onboarding>;


const content: Record<number, { supText: string; icon: string; subText?: string }> = {
    1: {
        supText: 'Empieza a agregar tus alarmas para tus medicamentos.',
        icon: 'camera',
        subText: 'Es tan simple como oprimir el botón de cámara y tomar una foto',
    },
    2: {
        supText: 'O también puedes agregarlas manualmente',
        icon: 'plus',
    },
};

export function OnboardingScreen({ route }: OnboardingScreenProps) {

    const step = route.params.step;
    const { supText, icon, subText } = content[step];
    const theme = useTheme();
    const navigation = useNavigation();

    const handleSkip = () => {
        navigation.navigate(AppRoutes.AlarmList);
    };

    const handleNext = () => {
        if (step === 1) {
            navigation.navigate(AppRoutes.Onboarding, { step: 2 });
        } else {
            navigation.navigate(AppRoutes.AlarmList);
        }
    };

    return (
        <Screen>
            <View style={styles.container}>
                {(step === 1) && (
                    <View style={styles.skipContainer}>
                        <Button mode="text" onAction={handleSkip}>
                            SALTAR
                        </Button>
                    </View>
                )}
                <View style={styles.content}>
                    <Text variant="displaySmall" style={styles.title}>
                        Bienvenido a My Med Buddy
                    </Text>
                    <View style={styles.instructions}>
                        <Text variant="bodyMedium" style={styles.subtitle}>
                            {supText}
                        </Text>
                        <IconButton
                            icon={icon}
                            size={80}
                            mode="contained"
                            containerColor={theme.colors.primary}
                            iconColor={theme.colors.onPrimary}
                        />
                        {!!subText && (
                            <Text variant="bodyMedium" style={styles.subtitle}>
                                {subText}
                            </Text>
                        )}
                    </View>
                </View>
                <Button mode="contained" onAction={handleNext} style={styles.nextButton}>
                    SIGUIENTE
                </Button>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    skipContainer: {
        alignItems: 'flex-end',
    },
    content: {
        marginTop: 64,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        marginBottom: 24,
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
    },
    nextButton: {
        marginTop: 64,
        alignSelf: 'center',
    },
    instructions: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 24,
    },
});
