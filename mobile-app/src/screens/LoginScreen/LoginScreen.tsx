// LoginScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Screen } from '../../components/Screen'; // or wherever your Screen component is
import { Text } from 'react-native-paper';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { SignUpScreenName } from '../SignupScreen/SignupScreen';

export const LoginScreenName = 'Login';

interface LoginFormValues {
    correo: string;
    contrasena: string;
}

// 1) Define your validation schema using Yup
const loginSchema = Yup.object().shape({
    correo: Yup.string()
        .email('Correo inválido')
        .required('Correo es requerido'),
    contrasena: Yup.string()
        .required('Contraseña es requerida'),
});

export function LoginScreen() {


    const navigtion = useNavigation();

    const methods = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            correo: '',
            contrasena: '',
        },
        mode: 'onChange', // triggers validation on each change
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log('Login data:', data);
        // handle login logic here
    };

    const onRegistrate = () => {
        navigtion.navigate(SignUpScreenName);
    };

    const onForgotPassword = () => {
        console.log('OLVIDE MI CONTRASEÑA pressed');
        // navigate to reset password or do something else
    };

    return (
        <Screen>
            {/* 3) Provide the form methods to child components */}
            <FormProvider {...methods}>
                <View style={styles.container}>
                    {/* Title */}
                    <Text variant="displayLarge" style={styles.title}>
                        My Med Buddy
                    </Text>

                    <View style={styles.divider} />

                    {/* Inputs */}
                    <View style={styles.inputContainer}>
                        <View>
                            <TextField
                                name="correo"
                                label="Correo"
                            />
                        </View>
                        <View>
                            <TextField
                                name="contrasena"
                                label="Contraseña"
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Buttons Row */}
                    <View style={styles.buttonRow}>
                        <Button
                            mode="outlined"
                            onAction={onRegistrate}
                            style={styles.button}
                        >
                            REGÍSTRATE
                        </Button>

                        <Button
                            mode="contained"
                            onAction={methods.handleSubmit(onSubmit)}
                            style={[styles.button, styles.loginButton]}
                            disabled={!methods.formState.isValid}
                        >
                            INICIAR SESIÓN
                        </Button>
                    </View>

                    {/* Bottom Link */}
                    <Button
                        mode="text"
                        onAction={onForgotPassword}
                        style={styles.forgotButton}
                    >
                        OLVIDE MI CONTRASEÑA
                    </Button>
                </View>
            </FormProvider>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
        alignItems: 'center',
    },
    title: {
        marginTop: 64,
        marginBottom: 64,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
        gap: 64,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 32,
        marginBottom: 36,
    },
    button: {
        flex: 1,
        marginRight: 8,
    },
    loginButton: {
        marginRight: 0,
    },
    forgotButton: {
        marginTop: 16,
    },
});
