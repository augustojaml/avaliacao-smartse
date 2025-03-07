import type { Metadata } from 'next'

import './globals.css'
import { AppProvider } from './shared/providers/app-provider'

export const metadata: Metadata = {
  title: 'Online Auction',
  description: 'The best online auction platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`font-display bg-background-light dark:bg-background-dark h-screen overflow-hidden antialiased`}
        >
          {children}
        </body>
      </AppProvider>
    </html>
  )
}
