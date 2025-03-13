import React from 'react';
import { Navbar } from './Navbar';
// adjust the import path as needed

export interface AppNavHeaderProps {
    isAuth: boolean;
}

export const AppNavHeader: React.FC<AppNavHeaderProps> = (
    { isAuth = false }: AppNavHeaderProps
) => {

    const navItems = isAuth
        ? [
            { label: 'Historial de tomas', route: '/history' },
            { label: 'Reportes', route: '/reports' },
            { label: 'Agregar alarma', route: '/addAlarm' },
            { label: 'Administrar perfil', route: '/profileAdmin' },
            { label: 'Cerrar Sesión', route: '/logout' },
        ]
        : [];

    return <Navbar items={navItems} />;
};

export default AppNavHeader;
