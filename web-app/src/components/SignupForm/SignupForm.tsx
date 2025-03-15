import React, { useState } from 'react';
import { Box } from '../Box';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { AppDispatch, setAuth } from '../../redux';
import { setUser } from '../../redux';
import { useNavigate } from 'react-router-dom';

interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
}

// Define Yup validation schema
const schema = Yup.object().shape({
    name: Yup.string().required('Nombre es requerido'),
    email: Yup.string().email('Correo inválido').required('Correo es requerido'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('Contraseña es requerida'),
});

export const SignUpForm: React.FC<{ isUpdate?: boolean }> = ({ isUpdate }: { isUpdate?: boolean }) => {
    const methods = useForm<SignUpFormValues>({
        resolver: yupResolver(schema),
        defaultValues: { name: '', email: '', password: '' },
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
        // Simulate async submission with a timeout
        setLoading(true);
        setTimeout(() => {
            dispatch(
                setUser({
                    ...data
                })
            );
            dispatch(setAuth(true));
            setLoading(false);
            navigate('/history');
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
                    {/* Fields Container */}
                    <Box direction="column" alignItems="stretch" gap="20px" elevation={0}>
                        <TextField name="name" label="Nombre" />
                        <TextField name="email" label="Correo" />
                        <TextField name="password" label="Contraseña" type="password" />
                    </Box>
                    {/* Button with extra spacing on top */}
                    <Button
                        variant="filled"
                        isLoading={loading}
                        onAction={methods.handleSubmit(onSubmit)}
                        disabled={!methods.formState.isValid || loading}
                        sx={{ marginTop: '50px' }}
                    >
                        {isUpdate ? 'GUARDAR' : 'REGISTRARSE'}
                    </Button>
                </Box>
            </form>
        </FormProvider>
    );
};

export default SignUpForm;
