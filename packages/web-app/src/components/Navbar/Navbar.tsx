// components/Navbar/index.tsx
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { Text } from '../Text'; // your custom Text component
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../Modal'; // your custom Modal component
import { Paper as MuiPaper } from '@mui/material'; // used for modal close button

export interface NavItem {
    label: string;
    route: string;
}

export interface NavbarProps {
    /** Array of navigation items; if empty, no nav items are shown */
    items: NavItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ items }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const activeRoute = location.pathname;

    // Determine if nav items exist
    const hasNavItems = items && items.length > 0;

    // State to control the logout modal
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    // Left section: Only clickable if nav items exist
    const handleLeftClick = () => {
        if (hasNavItems) {
            navigate('/history');
        }
    };

    // Handle nav item clicks; for '/logout', show modal
    const handleItemClick = (item: NavItem) => {
        if (item.route === '/logout') {
            setLogoutModalOpen(true);
        } else {
            navigate(item.route);
        }
    };

    const handleModalClose = () => {
        setLogoutModalOpen(false);
    };

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    height: '10vh',
                    backgroundColor: theme.palette.primaryContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    padding: hasNavItems ? '0.5rem 1rem' : '1rem 1.5rem',
                }}
            >
                {/* Left Section: Logo + App Name */}
                <div
                    onClick={handleLeftClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: hasNavItems ? 'pointer' : 'default',
                    }}
                >
                    {/** Insert logo if available (SVG, etc.) */}
                    <Text
                        variant="body"
                        sx={{
                            fontWeight: 700,
                            fontSize: hasNavItems ? undefined : '1.5rem',
                        }}
                    >
                        My Med Buddy
                    </Text>
                </div>

                {hasNavItems && (
                    <>
                        {/* Vertical Separator */}
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mx: 2, backgroundColor: theme.palette.divider }}
                        />

                        {/* Right Section: Navigation Items */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {items.map((item) => {
                                // Do not mark "Cerrar Sesión" as active
                                const isActive = item.route !== '/logout' && item.route === activeRoute;
                                return (
                                    <div
                                        key={item.route}
                                        onClick={() => handleItemClick(item)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Text
                                            variant="body"
                                            sx={{
                                                color: isActive
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.primary,
                                                fontWeight: isActive ? 700 : 400,
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                                fontSize: hasNavItems ? undefined : '1.5rem',
                                            }}
                                        >
                                            {item.label}
                                        </Text>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </Paper>

            {/* Logout Modal */}
            <Modal open={logoutModalOpen} onClose={handleModalClose} width="400px">
                <Text variant="body" sx={{ mb: 2 }}>
                    La funcionalidad de Cerrar Sesión aún no está implementada.
                </Text>
                <MuiPaper
                    onClick={handleModalClose}
                    sx={{
                        padding: '8px 16px',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: 1,
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                >
                    Cerrar
                </MuiPaper>
            </Modal>
        </>
    );
};