import { Grid2 as Grid } from "@mui/material";
import { Text } from "../../components/Text";
import { SignUpForm } from "../../components/SignupForm";


export const SignUpScreen = () => {

    return (
        <Grid container spacing={8}
            sx={{
                minWidth: '100%',
            }} >
            <Grid size={8}>
                <Grid container direction='column' spacing={4}
                    sx={{
                        alignItems: 'center',
                    }}
                >
                    <Grid>
                        <Text variant='t1' align='center'>Registrando te podrás inscribir a un contacto de emergencia, por ejemplo a un familiar cercano y asi juntos podrán llevar control de tu medicación</Text>
                    </Grid>
                    <Grid>
                        <Text variant='nv' align='center'>En caso de que no quieras aceptar, dejanos saber y le notificaremos a tu contacto de emergencia</Text>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={4}>

                <SignUpForm />
            </Grid>
        </Grid>
    );

};