import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'

const colors = {
  primary:
    'border-primary-light focus:ring-primary-light dark:border-primary-dark dark:focus:ring-primary-dark text-primary-light dark:text-primary-dark',
  primaryLight:
    'border-primaryLight-light focus:ring-primaryLight-light dark:border-primaryLight-dark dark:focus:ring-primaryLight-dark text-primaryLight-light dark:text-primaryLight-dark',
  secondary:
    'border-secondary-light focus:ring-secondary-light dark:border-secondary-dark dark:focus:ring-secondary-dark text-secondary-light dark:text-secondary-dark',
}

const rounded = {
  sm: 'rounded-sm',
  base: 'rounded',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string
  placeholder: string
  isLoading?: boolean
  icon?: IconType
  color?: 'primary' | 'primaryLight' | 'secondary'
  rounded?: 'sm' | 'base' | 'lg' | 'full'
  showError?: boolean
  error?: string
}

export const Input = ({
  type,
  placeholder,
  icon: Icon = undefined,
  color = 'primary',
  rounded: roundedSize = 'base',
  showError = false,
  error = undefined,
  disabled = false,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        {Icon && (
          <span
            className={clsx(
              'absolute top-1/2 left-3 -translate-y-1/2',
              colors[color],
            )}
          >
            <Icon className="h-5 w-5" data-testid="input-icon" />
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={clsx(
            `w-full border py-2 pr-4 ${Icon ? 'pl-10' : 'pl-4'} focus:ring-2 focus:outline-none`,
            'bg-sidebar-light text-textPrimary-light placeholder-textSecondary-light focus:ring-primary-light dark:bg-sidebar-dark dark:text-textPrimary-dark dark:placeholder-textSecondary-dark dark:focus:ring-primary-dark',
            colors[color],
            rounded[roundedSize],
            disabled && 'cursor-none opacity-50',
            `${className}`,
          )}
          disabled={disabled}
          {...props}
        />
      </div>
      {showError && (
        <div className="h-3">
          {error && (
            <div className="text-accentRed relative flex items-center space-x-1 text-xs font-semibold">
              <FiAlertCircle className="h-3 w-3" />
              <span className="mt-0.5">{`${error}`}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
