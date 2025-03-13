import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux'; // adjust path
import { updateName, updateEmail, updatePassword } from '../../redux'; // your store actions
import { TextField } from '../TextField';
import { Button } from '../Button';
import { Toast } from '../Toast';
import { Box } from '../Box'; // optional container
export interface UpdateProfileFormValues {
    name: string;
    email: string;
    password: string;
}

export const schema = Yup.object().shape({
    name: Yup.string()
        .required('Nombre es requerido'),
    email: Yup.string()
        .email('Correo inválido')
        .required('Correo es requerido'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('Contraseña es requerida'),
});

export function UpdateProfileForm() {
    // Get current user data from store
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const methods = useForm<UpdateProfileFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);

    const onSubmit: SubmitHandler<UpdateProfileFormValues> = (data) => {
        setLoading(true);
        // Simulate a short async operation
        setTimeout(() => {
            // Dispatch updates individually (or use a single action if desired)
            dispatch(updateName(data.name));
            dispatch(updateEmail(data.email));
            dispatch(updatePassword(data.password));

            setLoading(false);
            setToastOpen(true);
        }, 1500);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const {
        handleSubmit,
        formState: { isValid },
    } = methods;

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    width: '340px',
                    paddingTop: '50px',
                    paddingBottom: '20px',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Nombre Field */}
                    <TextField name="name" label="Nombre" />
                    {/* Correo Field */}
                    <TextField name="email" label="Correo" />
                    {/* Contraseña Field */}
                    <TextField name="password" label="Contraseña" type="password" />

                    <Button
                        variant="filled"
                        onAction={handleSubmit(onSubmit)}
                        isLoading={loading}
                        disabled={!isValid || loading}
                        sx={{ marginTop: '30px' }}
                    >
                        GUARDAR
                    </Button>
                </form>
            </Box>

            <Toast
                open={toastOpen}
                message="Datos actualizados con éxito"
                autoHideDuration={2000}
                onClose={handleToastClose}
            />
        </FormProvider>
    );
}
