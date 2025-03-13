import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { Text } from '../Text';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutModal } from '../LogoutModal';
import { useDispatch } from 'react-redux';
import { AppDispatch, logout } from '../../redux';
import logo from '../../assets/logo.svg';

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
    const dispatch = useDispatch<AppDispatch>();

    const activeRoute = location.pathname;
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

    const handleLogoutConfirm = () => {
        dispatch(logout());
        navigate('/login');
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
                    <img
                        src={logo}
                        alt="My Med Buddy Logo"
                        style={{ width: 100, marginLeft: '1.5rem', marginRight: '1rem' }}
                    />
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
            <LogoutModal
                open={logoutModalOpen}
                onClose={handleModalClose}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
};