import React, { useState } from 'react';
import { Box } from '../Box';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordFormValues {
    email: string;
}

// Validation schema: an email field is required
const schema = Yup.object().shape({
    email: Yup.string().email('Correo inválido').required('Correo es requerido'),
});

export const ForgotPasswordSendEmail: React.FC = () => {
    const methods = useForm<ForgotPasswordFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { email: '' },
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
        setLoading(true);

        // Simulate an async operation
        setTimeout(() => {
            // After success, navigate to confirmation screen
            navigate('/forgotPassword/confirmation');
            setLoading(false);
        }, 1500);
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box
                    width="340px"
                    direction="column"
                    alignItems="stretch"
                    sx={{
                        paddingTop: '30px',
                        paddingBottom: '20px',
                        paddingLeft: '30px',
                        paddingRight: '30px',
                    }}
                >
                    {/* Single Field for Correo */}
                    <Box direction="column" alignItems="stretch" gap="20px" elevation={0}>
                        <TextField name="email" label="Correo" />
                    </Box>

                    {/* Buttons Row */}
                    <Box
                        direction="row"
                        alignItems="center"
                        justifyContent='space-between'
                        gap="20px"
                        elevation={0}
                        sx={{ marginTop: '30px' }}
                    >
                        <Button variant="outlined" onAction={handleBack} fullWidth>
                            VOLVER
                        </Button>
                        <Button
                            fullWidth
                            variant="filled"
                            isLoading={loading}
                            onAction={methods.handleSubmit(onSubmit)}
                            disabled={!methods.formState.isValid || loading}
                        >
                            ENVIAR
                        </Button>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};
