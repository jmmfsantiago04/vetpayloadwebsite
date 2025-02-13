'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createPet } from '@/app/actions/pets'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  type: z.enum(['dog', 'cat', 'other'], {
    required_error: 'Por favor, selecione um tipo de animal.',
  }),
  breed: z.string().min(2, {
    message: 'A raça deve ter pelo menos 2 caracteres.',
  }),
  age: z.number().min(0).max(30, {
    message: 'A idade deve estar entre 0 e 30 anos.',
  }),
  weight: z.number().min(0).max(100, {
    message: 'O peso deve estar entre 0 e 100 kg.',
  }),
  medicalHistory: z.string().optional(),
})

export default function PetForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: undefined,
      breed: '',
      age: 0,
      weight: 0,
      medicalHistory: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await createPet(values)

      if (result.success) {
        setSuccess(true)
        form.reset()
      } else {
        setError(result.error || 'Falha ao criar pet')
      }
    } catch (err) {
      setError('Falha ao criar pet. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center p-6">
        <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Pet Adicionado com Sucesso!</h3>
        <p className="text-[var(--text-secondary)] mb-4">Seu pet foi adicionado ao seu perfil.</p>
        <Button
          onClick={() => {
            setSuccess(false)
            form.reset()
          }}
          className="bg-[var(--primary)] hover:bg-[var(--primary-light)]"
        >
          Adicionar Outro Pet
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        {/* Nome do Pet */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Pet</FormLabel>
              <FormControl>
                <input
                  {...field}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="Digite o nome do seu pet"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipo de Animal */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Animal</FormLabel>
              <div className="flex gap-4">
                {[
                  { value: 'dog', label: 'Cachorro', icon: '🐕' },
                  { value: 'cat', label: 'Gato', icon: '🐈' },
                  { value: 'other', label: 'Outro', icon: '🐾' },
                ].map((type) => (
                  <label
                    key={type.value}
                    className={`flex-1 p-4 border rounded-xl cursor-pointer transition-all ${
                      field.value === type.value
                        ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]'
                        : 'border-gray-200 hover:border-[var(--primary)]'
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      value={type.value}
                      checked={field.value === type.value}
                      onChange={() => field.onChange(type.value)}
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="font-medium">{type.label}</div>
                    </div>
                  </label>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Raça */}
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raça</FormLabel>
              <FormControl>
                <input
                  {...field}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="Digite a raça do seu pet"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Idade */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade (anos)</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    min="0"
                    max="30"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Peso */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Histórico Médico */}
        <FormField
          control={form.control}
          name="medicalHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Histórico Médico (Opcional)</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="Digite qualquer histórico médico relevante..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary-light)]"
          disabled={isLoading}
        >
          {isLoading ? 'Adicionando Pet...' : 'Adicionar Pet'}
        </Button>
      </form>
    </Form>
  )
} 