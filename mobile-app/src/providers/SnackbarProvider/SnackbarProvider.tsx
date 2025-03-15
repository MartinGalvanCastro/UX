// SnackbarProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar } from 'react-native-paper';

export interface SnackbarContextValue {
    showSnackbar: (
        message: string,
        duration?: number,
        action?: { label: string; onPress: () => void }
    ) => void;
    hideSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [duration, setDuration] = useState(2000);
    const [action, setAction] = useState<{ label: string; onPress: () => void } | undefined>(
        undefined
    );

    const showSnackbar = (
        msg: string,
        dur: number = 2000,
        act?: { label: string; onPress: () => void }
    ) => {
        setMessage(msg);
        setDuration(dur);
        setAction(act);
        setVisible(true);
    };

    const hideSnackbar = () => {
        setVisible(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            <Snackbar visible={visible} onDismiss={hideSnackbar} duration={duration} action={action}>
                {message}
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
