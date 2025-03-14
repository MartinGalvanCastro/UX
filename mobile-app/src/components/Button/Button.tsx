import React from 'react';
import { Button as RNButton, ButtonProps as RNButtonProps, useTheme } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { PropsWithChildren } from 'react';

type ButtonMode = "text" | "outlined" | "contained" | "elevated" | "contained-tonal" | "error" | "warning"

export interface ButtonProps extends Omit<RNButtonProps, 'mode' | 'onClick' | 'title'> {
    isLoading?: boolean;
    onAction: () => void;
    mode: ButtonMode;
}


export function Button({
    mode,
    isLoading = false,
    onAction,
    style,
    children,
    ...rest
}: PropsWithChildren<ButtonProps>) {
    const theme = useTheme();

    // Map custom variants to RNButton's mode and color
    let buttonColor: string | undefined
    let textColor: string | undefined

    switch (mode) {
        case 'text':
            textColor = theme.colors.primary;
            break;
        case 'error':
            mode = 'contained';
            buttonColor = theme.colors.error;
            textColor = theme.colors.onError;
            break;
        case 'warning':
            mode = 'contained';
            buttonColor = theme.colors.errorContainer;
            textColor = theme.colors.onErrorContainer;
            break;
        default:
            break;
    }


    return (
        <RNButton
            buttonColor={buttonColor}
            loading={isLoading}
            onPress={onAction}
            mode={mode}
            style={style}
            {...rest}
        >
            <Text variant="bodyMedium" style={{ color: textColor, textDecorationLine: mode === 'text' ? 'underline' : undefined }}>{children}</Text>
        </RNButton>


    );
}
