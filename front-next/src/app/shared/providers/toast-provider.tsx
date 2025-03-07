'use client'

import * as Toast from '@radix-ui/react-toast'
import { clsx } from 'clsx'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi'

interface CustomToastContextProps {
  showToast: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    position?: 'top-right' | 'bottom-right',
  ) => void
}

const CustomToastContext = createContext<CustomToastContextProps | undefined>(
  undefined,
)

export const CustomToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>(
    'success',
  )
  const [position, setPosition] = useState<'top-right' | 'bottom-right'>(
    'bottom-right',
  )
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    position: 'top-right' | 'bottom-right' = 'bottom-right',
  ) => {
    setMessage(message)
    setType(type)
    setPosition(position)
    setOpen(false)
    setTimeout(() => setOpen(true), 10)
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [open])

  const icons = {
    success: <FiCheckCircle className="text-accentGreen h-5 w-5" />,
    error: <FiXCircle className="text-accentRed h-5 w-5" />,
    info: <FiInfo className="text-primaryLight h-5 w-5" />,
    warning: <FiAlertTriangle className="text-accentOrange h-5 w-5" />,
  }

  const backgroundError = {
    success: 'bg-sidebar-light dark:bg-sidebar-dark text-accentGreen',
    error: 'bg-white/50 text-accentRed',
    info: 'bg-sidebar-light dark:bg-sidebar-dark text-primaryLight',
    warning: 'bg-sidebar-light dark:bg-sidebar-dark text-accentOrange',
  }

  const borderColors = {
    success: 'border-l-4 border-accentGreen',
    error: 'border-l-4 border-accentRed',
    info: 'border-l-4 border-primaryLight',
    warning: 'border-l-4 border-accentOrange',
  }

  return (
    <CustomToastContext.Provider value={{ showToast }}>
      {children}

      {isMounted &&
        createPortal(
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              id="appToast"
              open={open}
              onOpenChange={setOpen}
              className={clsx(
                'fixed flex w-full max-w-sm items-center gap-3 rounded-lg px-4 py-3 shadow-lg',
                borderColors[type],
                backgroundError[type],
                position === 'top-right' ? 'top-8 right-8' : 'right-8 bottom-8',
              )}
            >
              {icons[type]}
              <div>
                <Toast.Title className="text-lg font-bold">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Toast.Title>
                <Toast.Description className="text-sm font-semibold">
                  {message}
                </Toast.Description>
              </div>
              <Toast.Action
                asChild
                altText="Fechar"
                className="ml-auto cursor-pointer"
              >
                <button onClick={() => setOpen(false)}>✕</button>
              </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="fixed right-0 bottom-0 m-4 flex w-96 flex-col gap-2" />
          </Toast.Provider>,
          document.body,
        )}
    </CustomToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(CustomToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
