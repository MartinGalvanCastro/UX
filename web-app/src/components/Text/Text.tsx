import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

/**
 * These short variant names map to your design:
 * - t1:  Título 1er Nivel
 * - t2:  Título 2do Nivel
 * - tp:  Títulos Principales
 * - nv:  Nombres de las vistas
 * - am:  Acciones App Móvil
 * - aw:  Acciones App Web
 * - ts:  Tab seleccionado (web)
 * - tu:  Tab no seleccionado (web)
 * - body: Default body text
 */
export type TextVariant = 
  | 't1'
  | 't2'
  | 'tp'
  | 'nv'
  | 'am'
  | 'aw'
  | 'ts'
  | 'tu'
  | 'body';

export interface TextProps extends Omit<TypographyProps, 'variant'> {
  variant?: TextVariant;
}

/**
 * Style definitions for each variant.
 * Adjust fontSize, lineHeight, fontWeight, and color
 * based on your exact design specs.
 */
const styleMap: Record<TextVariant, SxProps<Theme>> = {
  t1: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '40px',
  },
  t2: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
  },
  tp: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '28px',
  },
  nv: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
  },
  am: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
  },
  aw: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
  },
  ts: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '18px',
    // color: '#...' if you need a special color
  },
  tu: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    // color: '#...' if you need a special color
  },
  body: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
  },
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  sx,
  children,
  ...props
}) => {
  return (
    <Typography sx={{ ...styleMap[variant], ...sx }} {...props}>
      {children}
    </Typography>
  );
};
