"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthDialogs() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

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
          <LoginForm 
            onSuccess={() => setIsLoginOpen(false)}
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
            Register
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <RegisterForm 
            onSuccess={() => setIsRegisterOpen(false)}
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