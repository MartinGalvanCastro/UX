import { createTheme } from '@mui/material/styles';
import { commonThemeOptions } from './commonTheme';

declare module '@mui/material/styles' {
  interface Palette {
    primaryContainer: string;
    secondaryContainer: string;
    tertiaryContainer: string;
    errorContainer: string;
    tertiary: {
      main: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    primaryContainer?: string;
    secondaryContainer?: string;
    tertiaryContainer?: string;
    errorContainer?: string;
    tertiary?: {
      main: string;
      contrastText: string;
    };
  }
}

export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#415F91',          // primary from light scheme
      contrastText: '#FFFFFF',   // onPrimary
    },
    secondary: {
      main: '#565F71',          // secondary from light scheme
      contrastText: '#FFFFFF',   // onSecondary
    },
    // For tertiary we’re adding both the main color and its contrast
    tertiary: {
      main: '#705575',          // tertiary from light scheme
      contrastText: '#FFFFFF',   // onTertiary
    },
    error: {
      main: '#BA1A1A',          // error color
      contrastText: '#FFFFFF',   // onError
    },
    background: {
      default: '#F9F9FF',       // background
      paper: '#F9F9FF',         // surface
    },
    text: {
      primary: '#191C20',
      secondary: '#44474E',
    },
    // Container colors
    primaryContainer: '#D6E3FF',
    secondaryContainer: '#DAE2F9',
    tertiaryContainer: '#FAD8FD',
    errorContainer: '#FFDAD6',
  },
});
