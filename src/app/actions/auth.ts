'use server'

import { signIn, signOut, auth } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'

type AuthState = string | { success: true; userId: string } | undefined;

export async function authenticate(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return 'Por favor, preencha todos os campos'
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      console.error('Sign in error:', result.error)
      return 'E-mail ou senha inválidos'
    }

    // Get the session to get the user ID
    const session = await auth()
    if (!session?.user?.id) {
      console.error('No session user ID')
      return 'Falha ao obter informações do usuário'
    }

    return { success: true, userId: session.user.id }
  } catch (error) {
    console.error('Authentication error:', error)
    return 'Falha ao fazer login. Por favor, tente novamente.'
  }
}

export async function register(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  try {
    const email = formData.get('email')
    const password = formData.get('password')
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')

    if (!email || !password || !firstName || !lastName || 
        typeof email !== 'string' || typeof password !== 'string' ||
        typeof firstName !== 'string' || typeof lastName !== 'string') {
      return 'Por favor, preencha todos os campos'
    }

    const payload = await getPayload({
      config: configPromise,
    })

    // Check if user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingUsers.totalDocs > 0) {
      return 'Este e-mail já está em uso'
    }

    // Create the user
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    })

    // Log the user in
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return 'Falha ao fazer login após o registro. Por favor, tente fazer login manualmente.'
    }

    // Get the session to get the user ID
    const session = await auth()
    if (!session?.user?.id) {
      return 'Falha ao obter informações do usuário após o registro.'
    }

    return { success: true, userId: session.user.id }
  } catch (error) {
    console.error('Registration error:', error)
    return 'Falha ao registrar usuário. Por favor, tente novamente.'
  }
}

export async function handleLogout() {
  try {
    await signOut({ redirect: false })
    redirect('/')
  } catch (error) {
    console.error('Logout error:', error)
    redirect('/')
  }
} 