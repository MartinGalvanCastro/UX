import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IconButton, Text } from 'react-native-paper';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useNavigation } from '../../navigation';

// Single-field form interface
interface EmergencyContactFormValues {
    email: string;
}

// Yup schema
const schema = Yup.object().shape({
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
});

export function EmergencyContactScreen() {
    const [loading, setLoading] = useState(false);
    const { showSnackbar } = useSnackbar();
    const navigation = useNavigation();

    // Set up react-hook-form
    const methods = useForm<EmergencyContactFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { email: '' },
        mode: 'onChange',
    });

    const {
        handleSubmit,
        formState: { isValid },
        reset,
    } = methods;

    // Handler for the Save button
    const onSubmit = (data: EmergencyContactFormValues) => {
        Alert.alert(
            'Contacto Emergencia',
            `¿Seguro que quieres establecer como contacto de emergencia a: “${data.email}”?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sí, cambiar',
                    onPress: () => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            showSnackbar('Contacto de emergencia actualizado');
                            reset({ email: '' }); // Clear the form field
                        }, 1000);
                    },
                },
            ]
        );
    };

    return (
        <Screen scrollable>
            <FormProvider {...methods}>
                <IconButton icon="arrow-left" onPress={navigation.goBack} />
                <Text variant="displaySmall" style={styles.title}>
                    Contacto Emergencia
                </Text>
                <Text variant="titleMedium" style={styles.subtitle}>
                    La persona con el siguiente correo es tu contacto de emergencia.
                </Text>
                <Text variant="titleMedium" style={styles.subtitle}>
                    Si lo quieres actualizar, cambia el correo y oprime guardar
                </Text>

                <View>
                    <Controller
                        name="email"
                        control={methods.control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Correo"
                                placeholder="¿Quién es tu contacto de emergencia?"
                                value={value}
                                onChangeText={onChange}
                                error={!!error}
                                style={styles.input}
                                name={'email'} />
                        )}
                    />
                </View>

                <Button
                    mode="contained"
                    onAction={handleSubmit(onSubmit)}
                    disabled={!isValid || loading}
                    loading={loading}
                    style={styles.saveButton}
                >
                    GUARDAR
                </Button>
            </FormProvider>
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 64,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        marginTop: 32,
        marginBottom: 32,
        width: '80%',
        alignSelf: 'center',
    },
    saveButton: {
        alignSelf: 'center',
    },
});
