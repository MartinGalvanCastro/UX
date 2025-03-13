import { Grid2 as Grid } from "@mui/material";
import { Text } from "../../components/Text";
import { LoginForm } from "../../components/LoginForm";
import logo from '../../assets/logo.svg';

export const LoginScreen = () => {

    return (
        <Grid container spacing={8}
            sx={{
                minWidth: '100%',
                alignItems: 'center',
            }} >
            <Grid size={6}>
                <Grid container direction='column' spacing={4}
                    sx={{
                        alignItems: 'center',
                    }}
                >
                    <Grid>
                        <img
                            src={logo}
                            alt="My Med Buddy Logo"
                            style={{ width: 200, marginLeft: '1.5rem', marginRight: '1rem' }}
                        />
                    </Grid>
                    <Grid>
                        <Text sx={{
                            fontSize: 57,
                            fontWeight: 400,
                            lineHeight: '72px',
                        }} align='center'>My Med Buddy</Text>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={6}>
                <LoginForm />
            </Grid>
        </Grid>
    );

};