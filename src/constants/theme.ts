/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const NutraColors = {
  primary: '#176B4D',
  primaryDark: '#0F4533',
  primaryContainer: '#176B4D',
  onPrimary: '#FFFFFF',
  primaryFixed: '#A4F3CC',
  primaryFixedDim: '#89D6B1',
  secondary: '#52625C',
  secondaryContainer: '#DDEFE7',
  onSecondaryFixedVariant: '#3A4A44',
  onSecondaryContainer: '#576862',
  background: '#F7F9F6',
  surface: '#FFFFFF',
  surfaceContainerLow: '#ECF6EF',
  surfaceContainer: '#E6F0E9',
  surfaceContainerHigh: '#E0EBE4',
  surfaceContainerHighest: '#DBE5DE',
  border: '#E1E7E3',
  textPrimary: '#17201C',
  textSecondary: '#65736D',
  textMuted: '#98A39E',
  warning: '#D9822B',
  warningContainer: 'rgba(217, 130, 43, 0.12)',
  error: '#C94A4A',
  errorContainer: '#FFDAD6',
} as const;

export const Colors = {
  light: {
    text: '#17201C',
    background: '#F7F9F6',
    backgroundElement: '#ECF6EF',
    backgroundSelected: '#DDEFE7',
    textSecondary: '#65736D',
    primary: '#176B4D',
    border: '#E1E7E3',
    card: '#FFFFFF',
  },
  dark: {
    text: '#ffffff',
    background: '#0e1512',
    backgroundElement: '#1a231f',
    backgroundSelected: '#293630',
    textSecondary: '#98A39E',
    primary: '#89D6B1',
    border: '#2A3630',
    card: '#161F1B',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  xs: 4,
  one: 4,
  sm: 8,
  two: 8,
  md: 16,
  three: 16,
  lg: 24,
  four: 24,
  xl: 32,
  five: 32,
  six: 64,
} as const;

export const Typography = {
  headlineLg: { fontSize: 28, lineHeight: 36, fontWeight: '700' as const, letterSpacing: -0.5 },
  headlineMd: { fontSize: 22, lineHeight: 28, fontWeight: '600' as const, letterSpacing: -0.3 },
  headlineSm: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const, letterSpacing: -0.2 },
  titleMd: { fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
  titleSm: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
  bodyLg: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyMd: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  bodySm: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  labelLg: { fontSize: 13, lineHeight: 16, fontWeight: '600' as const, letterSpacing: 0.2 },
  labelMd: { fontSize: 11, lineHeight: 14, fontWeight: '500' as const, letterSpacing: 0.3 },
  dataMono: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    fontVariant: ['tabular-nums' as const],
    fontFamily: Fonts.mono,
  },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

