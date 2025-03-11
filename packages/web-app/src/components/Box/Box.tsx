import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

export interface BoxProps extends Omit<PaperProps, 'elevation'> {
  /** Optional width of the box. Defaults to auto. */
  width?: string | number;
  /** Flex direction. Defaults to 'column'. */
  direction?: React.CSSProperties['flexDirection'];
  /** Justify content along the main axis */
  justifyContent?: React.CSSProperties['justifyContent'];
  /** Align items along the cross axis */
  alignItems?: React.CSSProperties['alignItems'];
  /** Gap between items in the flex container */
  gap?: React.CSSProperties['gap'];
  /** Optional sx overrides */
  sx?: SxProps<Theme>;
}

export const Box: React.FC<BoxProps> = ({
  width = 'auto',
  direction = 'column',
  justifyContent,
  alignItems,
  gap,
  children,
  sx,
  ...rest
}) => {
  return (
    <Paper
      elevation={3}
      {...rest}
      sx={{
        borderRadius: 5,
        display: 'flex',
        flexDirection: direction,
        width,
        justifyContent,
        alignItems,
        gap,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};
