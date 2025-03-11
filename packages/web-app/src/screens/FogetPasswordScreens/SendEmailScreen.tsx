import { Grid2 as Grid } from "@mui/material";
import { Text } from "../../components/Text";
import { ForgotPasswordSendEmail } from "../../components/ForgotPasswordForm";


export const SendEmailScreen = () => {

    return (
        <Grid container spacing={8}
            sx={{
                minWidth: '100%',
                alignItems: 'center',
            }} >
            <Grid size={6}>
                <Text variant='t1' sx={{
                    fontWeight: 'regular',
                }} align='center'>Ingresa el correo con el que te registraste para recuperar tu contraseña</Text>
            </Grid>
            <Grid size={6}>
                <ForgotPasswordSendEmail />
            </Grid>
        </Grid>
    );

};