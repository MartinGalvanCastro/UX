import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField/TextField';
import { AppRoutes, useNavigation } from '../../navigation';
import { setAuth, type AppDispatch, type RootState } from '../../redux';

export const LoginScreenName = 'Login';

interface LoginFormValues {
    email: string;
    password: string;
}

// Define your validation schema using Yup
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email no válido')
        .required('Email es requerido'),
    password: Yup.string()
        .required('Contraseña es requerida'),
});

export function LoginScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const { email, password } = useSelector((state: RootState) => state.user);

    const methods = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data: LoginFormValues) => {
        setLoading(true);

        setTimeout(() => {
            if (data.email !== email || data.password !== password) {
                methods.setError('password', {
                    type: 'manual',
                    message: 'Credenciales inválidas',
                });
                methods.setError('email', {
                    type: 'manual',
                    message: 'Credenciales inválidas',
                });
            } else {
                navigation.navigate(AppRoutes.AlarmList);
                dispatch(setAuth(true));
            }
            setLoading(false);
        }, 1000);
    };

    const onRegister = () => {
        navigation.navigate(AppRoutes.SignUp);
    };

    const onForgotPassword = () => {
        navigation.navigate(AppRoutes.ForgotPasswordSendEmail);
    };

    return (
        <Screen>
            <FormProvider {...methods}>
                <View style={styles.container}>
                    <Text variant="displayLarge" style={styles.title}>
                        My Med Buddy
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.inputContainer}>
                        <View>
                            <TextField
                                name="email"
                                label="Email"
                            />
                        </View>
                        <View>
                            <TextField
                                name="password"
                                label="Password"
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.buttonRow}>
                        <Button
                            mode="outlined"
                            onAction={onRegister}
                            style={styles.button}
                        >
                            REGISTRARSE
                        </Button>

                        <Button
                            mode="contained"
                            onAction={methods.handleSubmit(onSubmit)}
                            style={[styles.button, styles.loginButton]}
                            disabled={loading || !methods.formState.isValid}
                            loading={loading}
                        >
                            INICIAR SESIÓN
                        </Button>
                    </View>

                    <Button
                        mode="text"
                        onAction={onForgotPassword}
                        style={styles.forgotButton}
                    >
                        OLVIDÉ MI CONTRASEÑA
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
        alignSelf: 'center',
    },
});