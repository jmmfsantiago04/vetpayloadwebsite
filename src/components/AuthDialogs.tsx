"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Link from 'next/link'
import { handleLogout } from '@/app/actions/auth'

export default function AuthDialogs() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-4">
        <Button variant="outline" disabled>Carregando...</Button>
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/${session.user.id}`}>
          <Button 
            variant="outline"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] border-[var(--text-secondary)] hover:border-[var(--primary)]"
          >
            Painel
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-secondary)]">
            Olá, {session.user.name}
          </span>
          <form action={handleLogout}>
            <Button 
              type="submit"
              variant="outline"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] border-[var(--text-secondary)] hover:border-[var(--primary)]"
            >
              Sair
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] border-[var(--text-secondary)] hover:border-[var(--primary)]"
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogTitle>Entrar na sua Conta</DialogTitle>
          <LoginForm 
            onSuccess={() => {
              setIsLoginOpen(false)
              window.location.reload() // Force a full page reload to update session
            }}
            onRegisterClick={() => {
              setIsLoginOpen(false)
              setIsRegisterOpen(true)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogTrigger asChild>
          <Button>
            Cadastre-se
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogTitle>Criar Conta</DialogTitle>
          <RegisterForm 
            onSuccess={() => {
              setIsRegisterOpen(false)
              window.location.reload() // Force a full page reload to update session
            }}
            onLoginClick={() => {
              setIsRegisterOpen(false)
              setIsLoginOpen(true)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
} 