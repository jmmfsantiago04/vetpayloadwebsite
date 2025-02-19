"use client"

import { useState } from 'react'
import { useActionState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { register } from '@/app/actions/auth'

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
  firstName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

type RegisterState = string | { success: true; userId: string } | undefined;

export default function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const [state, formAction] = useActionState<RegisterState, FormData>(register, undefined)
  const [isPending, setIsPending] = useState(false)

  if (typeof state === 'object' && state.success) {
    onSuccess?.()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  return (
    <div className="w-full">
      {typeof state === 'string' && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {state}
        </div>
      )}

      <Form {...form}>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite seu nome" 
                      {...field}
                      name="firstName"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite seu sobrenome" 
                      {...field}
                      name="lastName"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Digite seu e-mail" 
                    {...field}
                    name="email"
                    disabled={isPending}
                  />
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
                  <Input 
                    type="password" 
                    placeholder="Digite sua senha" 
                    {...field}
                    name="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Registrando...' : 'Criar Conta'}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <span className="text-[var(--text-secondary)]">Já tem uma conta? </span>
        <button
          onClick={onLoginClick}
          className="text-[var(--primary)] hover:underline focus:outline-none"
          disabled={isPending}
        >
          Entrar
        </button>
      </div>
    </div>
  )
} 