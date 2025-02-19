"use client"

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { authenticate } from '@/app/actions/auth'
import { useSession } from 'next-auth/react'

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

type AuthState = string | { success: true; userId: string } | undefined;

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Entrando...' : 'Entrar'}
    </Button>
  )
}

export default function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const { update: updateSession } = useSession()
  const [state, formAction] = useFormState(authenticate, undefined)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  if (typeof state === 'object' && state.success) {
    updateSession()
    onSuccess?.()
  }

  async function clientAction(formData: FormData) {
    form.trigger()
    if (form.formState.isValid) {
      formAction(formData)
    }
  }

  return (
    <div className="w-full">
      {typeof state === 'string' && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {state}
        </div>
      )}

      <Form {...form}>
        <form action={clientAction} className="space-y-4">
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton />
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