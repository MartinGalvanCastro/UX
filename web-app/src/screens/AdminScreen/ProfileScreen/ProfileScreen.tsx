import { Box, IconButton, Typography } from "@mui/material"
import { SignUpForm } from "../../../components/SignupForm"


export const ProfileScreen = () => {
    return (
        <div
            style={{
                width: '100%',
            }}
        >
            <Box
            sx={{
                height: "100%",
                paddingLeft: "5vw",
                width: "100%",
            }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <IconButton sx={{ mr: 1 }}>
                    
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold">
                        Modificar Perfil
                    </Typography>
                </Box>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <SignUpForm />
                </div>
            </Box>
        </div>
    )
}