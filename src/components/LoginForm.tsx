"use client"
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from 'next/navigation'
import { login } from '@/app/actions/auth'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

export default function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError('');
    setIsLoading(true);
    setShowSuccess(false);

    try {
      const result = await login({
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        setShowSuccess(true);
        onSuccess?.();
        
        // Delay to show the success message
        setTimeout(() => {
          // Open dashboard in a new tab
          const dashboardWindow = window.open('/dashboard', '_blank');
          
          // Focus on the new window if it was successfully opened
          if (dashboardWindow) {
            dashboardWindow.focus();
          }
          
          // Reset form and success state
          form.reset();
          setShowSuccess(false);
        }, 1500);
      } else {
        setError(result.error || 'Falha ao fazer login. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Falha ao fazer login. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-[var(--primary)] mb-6">
        Entrar na sua Conta
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          <p className="font-medium">Login realizado com sucesso!</p>
          <p className="text-sm">Abrindo o painel em uma nova aba...</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Digite seu e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Digite sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading || showSuccess}>
            {isLoading ? 'Entrando...' : showSuccess ? 'Redirecionando...' : 'Entrar'}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <span className="text-[var(--text-secondary)]">Ainda não tem uma conta? </span>
        <button
          onClick={onRegisterClick}
          className="text-[var(--primary)] hover:underline focus:outline-none"
        >
          Cadastre-se
        </button>
      </div>
    </div>
  )
} 