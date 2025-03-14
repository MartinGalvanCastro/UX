import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

export const SignUpScreenName = 'SignUp';

export interface SignupFormValues {
    nombre: string;
    correo: string;
    contrasena: string;
}

const schema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    correo: Yup.string().email('Correo inválido').required('Correo es requerido'),
    contrasena: Yup.string().min(8).required('Contraseña es requerida'),
});

export const SignUpScreen = () => {

    const navigate = useNavigation();


    const methods = useForm<SignupFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            nombre: '',
            correo: '',
            contrasena: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data: SignupFormValues) => {
        console.log();
    };

    const onGoBack = () => {
        navigate.goBack();
    }

    return <></>

};