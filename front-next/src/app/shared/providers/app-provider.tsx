'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { queryClient } from '../libs/react-query-lib'
import { ThemeAppProvider } from './theme-provider'
import { CustomToastProvider } from './toast-provider'
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeAppProvider>
      <CustomToastProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </CustomToastProvider>
    </ThemeAppProvider>
  )
}
