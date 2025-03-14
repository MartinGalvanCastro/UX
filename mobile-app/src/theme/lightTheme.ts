// theme.ts
import { MD3LightTheme, MD3TypescaleKey, configureFonts } from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/types';

const fontConfig: Record<MD3TypescaleKey, Partial<MD3Type>> = {
    displayLarge: {
       ...MD3LightTheme.fonts.displayLarge,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    displayMedium: {
      ...MD3LightTheme.fonts.displayMedium,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    displaySmall: {
      ...MD3LightTheme.fonts.displaySmall,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    headlineSmall: {
        ...MD3LightTheme.fonts.headlineSmall,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: 'Exo2_500Medium',
      fontWeight: '500',
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: 'Exo2_500Medium',
      fontWeight: '500',
    },
    titleSmall: {
      ...MD3LightTheme.fonts.titleSmall,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontFamily: 'Exo2_500Medium',
      fontWeight: '500',
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    labelSmall: {
      ...MD3LightTheme.fonts.labelSmall,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
    },
    default:{
       ...MD3LightTheme.fonts.default,
      fontFamily: 'Exo2_400Regular',
      fontWeight: '400',
      letterSpacing: 0,
    }
};

export const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#415F91",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D6E3FF",
    onPrimaryContainer: "#001B3E",
    secondary: "#565F71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#DAE2F9",
    onSecondaryContainer: "#131C2B",
    tertiary: "#705575",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FAD8FD",
    onTertiaryContainer: "#28132E",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#F9F9FF",
    onBackground: "#191C20",
    surface: "#F9F9FF",
    onSurface: "#191C20",
    outline: "#74777F",
  },
  fonts: configureFonts({
    config: fontConfig,
    isV3: true
  }),
};
