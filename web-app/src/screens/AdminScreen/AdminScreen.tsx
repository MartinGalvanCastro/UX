//import React from "react";
import { Box } from "@mui/material";
import { Text } from "../../components/Text";

interface Link {
    name: string;
    link: string;
}

let links: Link[] = [
    {
        name: "Modificar Perfil",
        link: "/profile"
    },
    {
        name: "Preferencias de Alarma",
        link: "/profileAdmin"
    }
];

export const AdminScreen = () => {
    return (
        <div
            style={{
                width: '100%',
            }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="start"
                minHeight="100vh"
                bgcolor="#F6F6FA"
                pt={3} // Espaciado en la parte superior
                pl={3} // Espaciado en la parte izquierda
                pr={7} // Espaciado en la parte derecha
                >
                <Box
                    sx={{
                    backgroundColor: "white",
                    padding: "16px",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    marginX: "auto",
                    }}
                >

                {
                    links.map((link) => {
                        return (
                            <Text
                                key={link.name}
                                variant="t2"
                                style={{
                                    cursor: "pointer",
                                    marginBottom: "16px",
                                    textDecoration: "underline",
                                }}
                                onClick={() => {
                                    window.location.href = link.link;
                                }}
                            >
                                {link.name}
                            </Text>
                        );
                    })
                }
                </Box>
            </Box>
                   
        </div>);
};