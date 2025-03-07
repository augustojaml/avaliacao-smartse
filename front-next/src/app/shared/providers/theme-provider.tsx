import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  localStorageHelpers,
  storageKeysHelpers,
} from '../helpers/local-storage-helper'

interface IThemeAppProviderProps {
  isDarkMode?: boolean
  toggleDarkMode: VoidFunction
}

interface IThemeAppProviderChildren {
  children: ReactNode
}

const IThemeAppProviderContext = createContext({} as IThemeAppProviderProps)

export function ThemeAppProvider({ children }: IThemeAppProviderChildren) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      typeof window !== 'undefined' &&
      localStorageHelpers.get(storageKeysHelpers.theme) === 'dark'
    )
  })

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorageHelpers.set(storageKeysHelpers.theme, 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorageHelpers.set(storageKeysHelpers.theme, 'light')
    }
  }, [isDarkMode])

  return (
    <IThemeAppProviderContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </IThemeAppProviderContext.Provider>
  )
}

export const useAppTheme = () => {
  return useContext(IThemeAppProviderContext)
}
