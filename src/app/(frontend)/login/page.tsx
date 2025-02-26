import { Metadata } from 'next'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Login | VetPayload',
  description: 'Faça login na sua conta VetPayload',
}

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[var(--primary)]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/logo.png" alt="VetPayload" className="h-8" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;O cuidado que seu pet merece, com a conveniência que você precisa.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre com seu e-mail e senha para acessar sua conta
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
} 