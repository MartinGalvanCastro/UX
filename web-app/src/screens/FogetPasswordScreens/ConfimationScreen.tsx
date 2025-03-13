import { useEffect } from "react";
import { Text } from "../../components/Text";
import { Grid2 as Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const ConfirmationScreen = () => {

    const navigate = useNavigate();


    useEffect(() => {
        setTimeout(() => {
            navigate('/forgotPassword/changePassword')
        }, 3000)
    }, [])

    return (
        <Grid container spacing={8} direction="column" sx={{
            minWidth: '100%',
            alignItems: 'center'
        }}>
            <Grid>
                <Text variant='t1' align='center'
                    sx={{
                        fontSize: 45
                    }}>Te hemos enviado un correo electrónico a la dirección que nos indicaste.</Text>
            </Grid>
            <Grid>
                <Text variant="t1" align="center" sx={{
                    fontSize: 45
                }}>Revisa tu bandeja de entrada o spam para restablecer tu contraseña.</Text>
            </Grid>
        </Grid>
    )
};