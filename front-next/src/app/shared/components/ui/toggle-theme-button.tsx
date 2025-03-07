'use client'

import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useAppTheme } from '../../providers/theme-provider'
import { Button } from './button'

export const ToggleThemeButton = () => {
  const { isDarkMode, toggleDarkMode } = useAppTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button variant="ghost" onClick={toggleDarkMode}>
      {isDarkMode ? <FaSun /> : <FaMoon />}{' '}
      {isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
    </Button>
  )
}
