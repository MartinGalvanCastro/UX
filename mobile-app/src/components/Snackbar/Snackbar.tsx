import React from 'react';
import { Snackbar as RNSnacbkar, type SnackbarProps as RNSnackbarProps } from 'react-native-paper';

export interface Snackbar extends Omit<RNSnackbarProps, 'visible' | 'onDismiss'> {
    visible: boolean;
    message: string;
    duration?: number;
    onDismiss: () => void;
    action?: {
        label: string;
        onPress: () => void;
    };
}

export function Snackbar({
    visible,
    message,
    duration = 2000,
    onDismiss,
    action,
}: Snackbar) {
    return (
        <RNSnacbkar
            visible={visible}
            onDismiss={onDismiss}
            duration={duration}
            action={action}
        >
            {message}
        </RNSnacbkar>
    );
}
