'use client'

import { useAuth } from '@/app/shared/hooks/use-auth'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { Button } from '../../shared/components/ui/button'
import { ToggleThemeButton } from '../../shared/components/ui/toggle-theme-button'

export const AuctionHeader = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { user } = useAuth()

  const handleNavigateToHome = () => {}

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <header className="bg-cardBackground-light dark:bg-cardBackground-dark fixed top-0 z-50 flex h-20 w-full items-center border-b border-gray-200 px-8 shadow-sm dark:border-gray-700">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
        <Link href="/dashboard">
          <Button
            onClick={handleNavigateToHome}
            variant="ghost"
            className="text-primary-light dark:text-primary-dark cursor-pointer text-2xl font-bold"
          >
            ArremateX
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <ToggleThemeButton />

          <DropdownMenu.Root open={openMenu} onOpenChange={setOpenMenu}>
            <DropdownMenu.Trigger asChild>
              <img
                src={'https://i.pravatar.cc/150'}
                alt="User avatar"
                className="h-10 w-10 cursor-pointer rounded-full object-cover"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-cardBackground-light dark:bg-cardBackground-dark relative right-12 w-64 space-y-2 rounded-lg border border-gray-200 p-2 text-left shadow-md dark:border-gray-700">
              <DropdownMenu.Item className="text-textPrimary-light dark:text-textPrimary-dark p-2 font-medium">
                <div className="flex flex-col">
                  <strong>{user?.fullName}</strong>
                  <span className="text-textSecondary-light dark:text-textSecondary-dark text-sm">
                    {user?.role === 'admin' ? 'Administrador' : 'Participante'}
                  </span>
                </div>
              </DropdownMenu.Item>

              <div className="h-1" />
              <DropdownMenu.Separator className="border-textSecondary-light dark:border-textSecondary-dark my-2 border-t" />
              <Button
                icon={FiLogOut}
                color="accentRed"
                fullWidth
                align="left"
                variant="ghost"
                onClick={handleSignOut}
              >
                {'Sair'}
              </Button>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}
