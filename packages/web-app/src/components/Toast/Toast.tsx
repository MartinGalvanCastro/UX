import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { Text } from '../Text';

export interface ToastProps {
  /** Controls whether the toast is open */
  open: boolean;
  /** The message to display */
  message: string;
  /** Duration (in milliseconds) before auto-hiding the toast */
  autoHideDuration?: number;
  /** Callback fired when the toast is closed */
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

/**
 * Toast component based on Material UI's Snackbar and Alert.
 * Uses the primary theme color and wraps the message in our custom Text component.
 */
export const Toast: React.FC<ToastProps> = ({
  open,
  message,
  autoHideDuration = 6000,
  onClose,
}) => {
  const theme = useTheme();
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert
        onClose={onClose}
        variant="filled"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          width: '100%',
        }}
      >
        <Text variant="body">{message}</Text>
      </Alert>
    </Snackbar>
  );
};
