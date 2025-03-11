import React, { useState } from 'react';
import { Box } from '../Box';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux'; // adjust paths as needed
import { setAuth } from '../../redux';               // or whichever action sets isAuth = true

interface LoginFormValues {
    email: string;
    password: string;
}

// Validation schema: requires an email and a 6+ char password
const schema = Yup.object().shape({
    email: Yup.string().email('Correo inválido').required('Correo es requerido'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('Contraseña es requerida'),
});

export const LoginForm: React.FC = () => {
    const methods = useForm<LoginFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { email: '', password: '' },
        mode: 'onChange',
    });

    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    // Get the user data from Redux to compare credentials
    const userInStore = useSelector((state: RootState) => state.user);

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        setLoading(true);

        // Simulate an async operation
        setTimeout(() => {
            // Check if email & password match what's in the store
            if (data.email === userInStore.email && data.password === userInStore.password) {
                // Set isAuth = true
                dispatch(setAuth(true));
                console.log('Login successful');
            } else {
                // Show an error message in the form
                methods.setError('password', {
                    type: 'manual',
                    message: 'Credenciales inválidas',
                });
                methods.setError('email', {
                    type: 'manual',
                    message: 'Credenciales inválidas',
                });
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box
                    width="340px"
                    direction="column"
                    alignItems="stretch"
                    sx={{
                        paddingTop: '50px',
                        paddingBottom: '20px',
                        paddingLeft: '30px',
                        paddingRight: '30px',
                    }}
                >
                    {/* Fields Container */}
                    <Box direction="column" alignItems="stretch" gap="20px" elevation={0}>
                        <TextField name="email" label="Correo" />
                        <TextField name="password" label="Contraseña" type="password" />
                    </Box>

                    {/* Submit Button */}
                    <Button
                        variant="filled"
                        isLoading={loading}
                        onAction={methods.handleSubmit(onSubmit)}
                        disabled={!methods.formState.isValid || loading}
                        sx={{ marginTop: '50px' }}
                    >
                        INICIAR SESIÓN
                    </Button>
                </Box>
            </form>
        </FormProvider>
    );
};