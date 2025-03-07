import { Greetings } from './components/grettings'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="flex h-full w-full">
        <div className="flex h-full flex-1 items-center justify-center">
          {children}
        </div>
        <div className="bg-primary-light dark:bg-primary-dark hidden h-full flex-1 items-center justify-end pr-20 lg:flex">
          <Greetings />
        </div>
      </div>
    </div>
  )
}
