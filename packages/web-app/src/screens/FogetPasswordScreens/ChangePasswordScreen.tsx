import { Grid2 as Grid } from "@mui/material";
import { Text } from "../../components/Text";
import { ChangePasswordForm } from "../../components/ForgotPasswordForm";


export const ChangePasswordScreen = () => {

    return (
        <Grid container spacing={8}
            sx={{
                minWidth: '100%',
                alignItems: 'center',
            }} >
            <Grid size={6}>
                <Text variant='t1' align='center'>Recupera tu contraseña</Text>
            </Grid>
            <Grid size={6}>
                <ChangePasswordForm />
            </Grid>
        </Grid>
    );

};