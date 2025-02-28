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
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { submitReview } from '@/app/actions/review'
import { toast } from "sonner"

const MAX_NAME_LENGTH = 50
const MAX_REVIEW_LENGTH = 200

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres.',
    })
    .max(MAX_NAME_LENGTH, {
      message: `O nome não deve exceder ${MAX_NAME_LENGTH} caracteres.`,
    }),
  email: z.string().email({
    message: 'Por favor, insira um endereço de e-mail válido.',
  }),
  petType: z.enum(['dog', 'cat', 'other'], {
    required_error: 'Por favor, selecione um tipo de animal.',
  }),
  rating: z
    .number()
    .min(1, {
      message: 'Por favor, selecione uma avaliação.',
    })
    .max(5),
  review: z
    .string()
    .min(10, {
      message: 'A avaliação deve ter pelo menos 10 caracteres.',
    })
    .max(MAX_REVIEW_LENGTH, {
      message: `A avaliação não deve exceder ${MAX_REVIEW_LENGTH} caracteres.`,
    }),
})

export default function ReviewForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      petType: undefined,
      rating: 0,
      review: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setErrorMessage('')
    setShowErrorDialog(false)
    setShowSuccessDialog(false)

    try {
      const result = await submitReview({
        name: values.name,
        email: values.email,
        petType: values.petType,
        rating: values.rating,
        comment: values.review,
      })

      if (result.success) {
        toast.success('Avaliação enviada!', {
          description: 'Agradecemos seu feedback.'
        })
        setShowSuccessDialog(true)
        form.reset()
      } else {
        setErrorMessage(result.error || 'Falha ao enviar avaliação')
        setShowErrorDialog(true)
      }
    } catch (err) {
      setErrorMessage('Falha ao enviar avaliação. Por favor, tente novamente.')
      setShowErrorDialog(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-[120px] w-full" />
        </div>

        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      placeholder="Digite seu nome"
                    />
                  </FormControl>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {field.value.length}/{MAX_NAME_LENGTH} caracteres
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      placeholder="Digite seu e-mail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tipo de Animal */}
          <FormField
            control={form.control}
            name="petType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Animal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de animal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white z-10">
                    <SelectItem 
                      value="dog" 
                      className="hover:bg-[var(--primary)] hover:text-white cursor-pointer transition-all duration-200 rounded-sm"
                    >
                      Cachorro
                    </SelectItem>
                    <SelectItem 
                      value="cat" 
                      className="hover:bg-[var(--primary)] hover:text-white cursor-pointer transition-all duration-200 rounded-sm"
                    >
                      Gato
                    </SelectItem>
                    <SelectItem 
                      value="other" 
                      className="hover:bg-[var(--primary)] hover:text-white cursor-pointer transition-all duration-200 rounded-sm"
                    >
                      Outro
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Avaliação */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avaliação</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-3xl transition-colors ${
                          star <= field.value ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-500 focus:outline-none`}
                        onClick={() => field.onChange(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Avaliação */}
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sua Avaliação</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Compartilhe sua experiência..."
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <div className="text-xs text-[var(--text-secondary)]">
                  {field.value.length}/{MAX_REVIEW_LENGTH} caracteres
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar Avaliação'}
          </Button>
        </form>
      </Form>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Erro</AlertDialogTitle>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Sucesso!</AlertDialogTitle>
            <AlertDialogDescription>
              Sua avaliação foi enviada com sucesso! Agradecemos seu feedback.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
