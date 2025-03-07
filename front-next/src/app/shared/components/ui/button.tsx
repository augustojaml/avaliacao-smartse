import clsx from 'clsx'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const sizes = {
  sm: 'py-1 px-2 text-sm',
  base: 'py-2.5 px-4 text-base',
  lg: 'py-4 px-6 text-lg',
}

const variants = {
  contained: 'text-white',
  outlined: 'border-2 bg-transparent',
  ghost: 'bg-transparent',
}

const colors = {
  primary: {
    contained:
      'bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90',
    outlined:
      'border-primary-light text-primary-light dark:border-primary-dark dark:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10',
    ghost:
      'text-primary-light dark:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10',
  },
  primaryLight: {
    contained:
      'bg-primaryLight-light dark:bg-primaryLight-dark hover:bg-primaryLight-light/90 dark:hover:bg-primaryLight-dark/90',
    outlined:
      'border-primaryLight-light text-primaryLight-light dark:border-primaryLight-dark dark:text-primaryLight-dark hover:bg-primaryLight-light/10 dark:hover:bg-primaryLight-dark/10',
    ghost:
      'text-primaryLight-light dark:text-primaryLight-dark hover:bg-primaryLight-light/10 dark:hover:bg-primaryLight-dark/10',
  },
  secondary: {
    contained:
      'bg-secondary-light dark:bg-secondary-dark hover:bg-secondary-light/90 dark:hover:bg-secondary-dark/90',
    outlined:
      'border-secondary-light text-secondary-light dark:border-secondary-dark dark:text-secondary-dark hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10',
    ghost:
      'text-secondary-light dark:text-secondary-dark hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10',
  },
  accentGreen: {
    contained: 'bg-accentGreen hover:bg-accentGreen/90',
    outlined: 'border-accentGreen text-accentGreen hover:bg-accentGreen/10',
    ghost: 'text-accentGreen hover:bg-accentGreen/10',
  },
  accentRed: {
    contained: 'bg-accentRed hover:bg-accentRed/90',
    outlined: 'border-accentRed text-accentRed hover:bg-accentRed/10',
    ghost: 'text-accentRed hover:bg-accentRed/10',
  },
  accentPurple: {
    contained: 'bg-accentPurple hover:bg-accentPurple/90',
    outlined: 'border-accentPurple text-accentPurple hover:bg-accentPurple/10',
    ghost: 'text-accentPurple hover:bg-accentPurple/10',
  },
  accentOrange: {
    contained: 'bg-accentOrange hover:bg-accentOrange/90',
    outlined: 'border-accentOrange text-accentOrange hover:bg-accentOrange/10',
    ghost: 'text-accentOrange hover:bg-accentOrange/10',
  },
  accentLime: {
    contained: 'bg-accentLime hover:bg-accentLime/90',
    outlined: 'border-accentLime text-accentLime hover:bg-accentLime/10',
    ghost: 'text-accentLime hover:bg-accentLime/10',
  },
  white: {
    contained: 'bg-white text-black hover:bg-gray-200',
    outlined: 'border-white text-white hover:bg-white/10',
    ghost: 'text-white hover:bg-white/10',
  },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  isLoading?: boolean
  size?: 'sm' | 'base' | 'lg'
  rounded?: 'sm' | 'base' | 'lg' | 'full'
  variant?: 'contained' | 'outlined' | 'ghost'
  fullWidth?: boolean
  align?: 'left' | 'center' | 'right'
  color?:
    | 'primary'
    | 'primaryLight'
    | 'secondary'
    | 'accentGreen'
    | 'accentRed'
    | 'accentPurple'
    | 'accentOrange'
    | 'accentLime'
    | 'white'
  icon?: IconType
}

export const Button = ({
  children,
  isLoading,
  size = 'base',
  rounded = 'lg',
  variant = 'contained',
  color = 'primary',
  fullWidth,
  align = 'center',
  icon: Icon = undefined,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const disabledStatus = isLoading || disabled

  return (
    <button
      className={clsx(
        `${disabledStatus ? 'cursor-not-allowed' : 'cursor-pointer'} relative flex items-center gap-2 rounded-${rounded} font-semibold transition ${disabledStatus ? 'opacity-50' : 'opacity-100'}`,
        sizes[size],
        variants[variant],
        colors[color]?.[variant],
        fullWidth && 'w-full',
        align && `justify-${align}`,
        className,
      )}
      disabled={isLoading ?? disabled}
      {...props}
    >
      <div
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex items-center gap-2`}
      >
        {Icon && <Icon className="h-5 w-5" data-testid="button-icon" />}
        {children}
      </div>
      <span
        className={`absolute flex items-center justify-center gap-2 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
        <AiOutlineLoading3Quarters
          className={`h-5 w-5 animate-spin`}
          data-testid="loading-icon"
        />
      </span>
    </button>
  )
}
