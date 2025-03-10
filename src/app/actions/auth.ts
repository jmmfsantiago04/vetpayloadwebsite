'use server'

import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

declare module 'next-auth' {
  interface Session {
    payloadToken?: string
    user: {
      id: string
      email: string
      name: string
    }
  }
  interface User {
    payloadToken?: string
  }
}

export async function authenticate(
  prevState: any,
  formData: FormData,
) {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return 'Por favor, preencha todos os campos'
    }

    // Try to authenticate with Payload first
    try {
      const payload = await getPayload({
        config: configPromise,
      })

      await payload.login({
        collection: 'users',
        data: {
          email,
          password,
        },
      })
    } catch (error) {
      console.error('Payload login error:', error)
      return 'E-mail ou senha inválidos'
    }

    // Then handle NextAuth session
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return 'E-mail ou senha inválidos'
    }

    return { success: true }
  } catch (error) {
    console.error('Authentication error:', error)
    if (error instanceof AuthError) {
      return 'E-mail ou senha inválidos'
    }
    return 'Falha ao fazer login. Por favor, tente novamente.'
  }
}

export async function register(
  prevState: any,
  formData: FormData,
) {
  try {
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')

    if (!email || !password || !name || 
        typeof email !== 'string' || typeof password !== 'string' ||
        typeof name !== 'string') {
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
        name,
        role: 'cliente', // Set default role
      },
    })

    // Log the user in
    try {
      await payload.login({
        collection: 'users',
        data: {
          email,
          password,
        },
      })

      await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      return { success: true }
    } catch (error) {
      console.error('Login after registration error:', error)
      return 'Conta criada, mas falha ao fazer login. Por favor, tente fazer login manualmente.'
    }
  } catch (error) {
    console.error('Registration error:', error)
    return 'Falha ao registrar usuário. Por favor, tente novamente.'
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' })
} 