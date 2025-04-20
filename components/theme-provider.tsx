'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * A wrapper component that provides theme context using NextThemesProvider.
 *
 * @param {React.ReactNode} children - The child components to be wrapped with the theme provider.
 * @param {...ThemeProviderProps} props - Additional properties to pass to NextThemesProvider.
 * @returns {JSX.Element} - JSX element representing the ThemeProvider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
