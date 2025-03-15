import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/Button/Button';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField/TextField';
import { AppRoutes, useNavigation } from '../../navigation';
import { AppDispatch, updatePassword } from '../../redux';

interface ForgotPasswordChangeFormValues {
    newPassword: string;
    confirmPassword: string;
}


const schema = Yup.object().shape({
    newPassword: Yup.string().required('La contraseña es requerida'),
    confirmPassword: Yup.string()
        .required('Confirma la contraseña')
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden'),
});

export function ForgotPasswordChangeScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const methods = useForm<ForgotPasswordChangeFormValues>({
        defaultValues: { newPassword: '', confirmPassword: '' },
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data: ForgotPasswordChangeFormValues) => {
        dispatch(updatePassword(data.newPassword));
        navigation.navigate(AppRoutes.Login)
    };

    return (
        <Screen scrollable>
            <FormProvider {...methods}>
                <View style={styles.container}>
                    <Text variant="displayLarge" style={styles.title}>
                        Olvide Mi Contraseña
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.inputContainer}>
                        <TextField name="newPassword" label="Nueva Contraseña" secureTextEntry />
                        <TextField name="confirmPassword" label="Confirma la Contraseña" secureTextEntry />
                    </View>
                    <View style={styles.divider} />
                    <Button
                        disabled={!methods.formState.isValid}
                        mode="contained"
                        onAction={methods.handleSubmit(onSubmit)}
                        style={styles.saveButton}
                    >
                        GUARDAR
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
        marginBottom: 16,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 16,
    },
    inputContainer: {
        width: '100%',
    },
    saveButton: {
        alignSelf: 'center',
    },
});
