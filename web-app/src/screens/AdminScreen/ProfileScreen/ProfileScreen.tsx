import { Box } from "@mui/material"
import { SignUpForm } from "../../../components/SignupForm"
import { BackLink } from "../../../components/BackLink"


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
                    <BackLink text="Modificar Perfil" />
                </Box>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <SignUpForm isUpdate />
                </div>
            </Box>
        </div>
    )
}