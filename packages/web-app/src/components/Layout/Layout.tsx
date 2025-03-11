import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { AppNavHeader } from '../Navbar';
import { Text } from '../Text';
import { RootState } from '../../redux';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <AppNavHeader isAuth={isAuth} />

      {/* Content */}
      <div
        style={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          margin: '16px',
          padding: '16px',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {children}
      </div>

      {/* Footer (only if not authenticated) */}
      {!isAuth && (
        <div
          style={{
            padding: '16px',
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.primaryContainer,
          }}
        >
          <ul
            style={{
              marginRight: 10,
              height: '10vh',
              gap: '1rem',
            }}
          >
            <li>
              <Text variant="body">Acerca de nosotros</Text>
            </li>
            <li>
              <Text variant="body">FAQ</Text>
            </li>
          </ul>
        </div>
      )}
    </Paper>
  );
};