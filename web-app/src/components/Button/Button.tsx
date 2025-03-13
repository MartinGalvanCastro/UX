import React from 'react';
import { useTheme, makeStyles } from '@mui/material/styles';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'error' | 'warning';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'onClick'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  onAction: () => void;
  sx?: SxProps<Theme>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  isLoading = false,
  disabled,
  children,
  onAction,
  sx,
  ...rest
}) => {
  const theme = useTheme();

  const variantMapping: Record<
    ButtonVariant,
    { muiVariant: 'contained' | 'outlined' | 'text'; color: MuiButtonProps['color']; customSx?: SxProps<Theme> }
  > = {
    filled: { muiVariant: 'contained', color: 'primary' },
    outlined: { muiVariant: 'outlined', color: 'primary' },
    text: { muiVariant: 'text', color: 'primary' },
    error: { muiVariant: 'contained', color: 'error' },
    warning: {
      muiVariant: 'contained',
      color: 'primary',
      customSx: {
        backgroundColor: theme.palette.errorContainer,
        color: theme.palette.getContrastText(theme.palette.errorContainer),
        '&:hover': {
          backgroundColor: theme.palette.errorContainer,
        },
      },
    },
  };

  const { muiVariant, color, customSx } = variantMapping[variant];

  return (
    <MuiButton
      variant={muiVariant}
      color={color}
      disabled={disabled}
      loading={isLoading}
      onClick={onAction}
      sx={{ textTransform: 'uppercase', ...customSx, ...sx }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};