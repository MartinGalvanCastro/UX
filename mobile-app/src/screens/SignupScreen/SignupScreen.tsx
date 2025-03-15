import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField/TextField';
import { AppRoutes, useNavigation } from '../../navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, setUser } from '../../redux';

export const SignUpScreenName = 'SignUp';

export interface SignupFormValues {
    name: string;
    email: string;
    password: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Correo inválido').required('Correo es requerido'),
    password: Yup.string().min(8).required('Contraseña es requerida'),
});

export const SignUpScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const methods = useForm<SignupFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data: SignupFormValues) => {
        setLoading(true);

        setTimeout(() => {
            dispatch(setUser(data));
            navigation.navigate(AppRoutes.Onboarding, { step: 1 });
            setLoading(false);
        }, 1000);
    };

    return (
        <Screen scrollable>
            <FormProvider {...methods}>
                <View style={styles.container}>
                    <Text variant="displayLarge" style={styles.title}>
                        Registrate
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.inputContainer}>
                        <View>
                            <TextField
                                name="name"
                                label="Nombre"
                            />
                        </View>
                        <View>
                            <TextField
                                name="email"
                                label="Correo"
                            />
                        </View>
                        <View>
                            <TextField
                                name="password"
                                label="Contraseña"
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.buttonRow}>
                        <Button
                            mode="contained"
                            onAction={methods.handleSubmit(onSubmit)}
                            style={[styles.button, styles.loginButton]}
                            disabled={!methods.formState.isValid}
                        >
                            REGISTRARSE
                        </Button>
                    </View>

                    <Button
                        mode="text"
                        onAction={navigation.goBack}
                        style={styles.forgotButton}
                    >
                        VOLVER
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
        textDecorationLine: 'underline',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
        gap: 32,
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
        alignSelf: 'center',
        marginTop: 16,
    },
});
