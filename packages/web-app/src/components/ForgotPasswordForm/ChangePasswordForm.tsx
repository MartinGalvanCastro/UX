import React, { useState } from 'react';
import { Box } from '../Box';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux'; // adjust path as needed
import { updatePassword } from '../../redux'; // your Redux action that updates the user's password

interface ChangePasswordFormValues {
    password: string;
    confirmPassword: string;
}

// Validation schema to ensure both passwords match
const schema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('Contraseña es requerida'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Confirmar contraseña es requerido'),
});

export const ChangePasswordForm: React.FC = () => {
    const methods = useForm<ChangePasswordFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { password: '', confirmPassword: '' },
        mode: 'onChange',
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<ChangePasswordFormValues> = (data) => {
        setLoading(true);
        // Simulate async submission with a timeout
        setTimeout(() => {
            // Dispatch the Redux action to update the password
            dispatch(updatePassword(data.password));
            setLoading(false);
            // Navigate to /login after success
            navigate('/login');
        }, 2000);
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
                    {/* Inner container with no elevation */}
                    <Box direction="column" alignItems="stretch" gap="20px" elevation={0}>
                        <TextField name="password" label="Contraseña" type="password" />
                        <TextField name="confirmPassword" label="Confirmar Contraseña" type="password" />
                    </Box>

                    {/* Submit button */}
                    <Button
                        variant="filled"
                        isLoading={loading}
                        onAction={methods.handleSubmit(onSubmit)}
                        disabled={!methods.formState.isValid || loading}
                        sx={{ marginTop: '50px' }}
                    >
                        GUARDAR
                    </Button>
                </Box>
            </form>
        </FormProvider>
    );
};