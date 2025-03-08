import { ToggleThemeButton } from '@/app/shared/components/ui/toggle-theme-button'
import { LoginForm } from './components/login-form'

export default function Login() {
  return (
    <div className="bg-cardBackground-light dark:bg-cardBackground-dark z-20 flex max-w-sm flex-col items-center space-y-2 rounded-lg p-8 shadow-lg">
      <div className="flex flex-col items-center">
        <h1 className="text-primary-light dark:text-primary-dark cursor-pointer text-2xl font-bold">
          ArremateX
        </h1>
        <h2 className="text-textPrimary-light dark:text-textPrimary-dark mb-6 font-bold">
          Acesse sua conta
        </h2>
      </div>
      <p className="text-textPrimary-light dark:text-textPrimary-dark mb-4 text-center text-sm">
        Faça login para acompanhar ou dar lances em tempo real e enviar lances
      </p>
      <LoginForm />
      <div className="flex w-full items-center justify-center">
        <ToggleThemeButton />
      </div>
    </div>
  )
}
