'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface LoginData {
  email: string
  password: string
}

export async function login(data: LoginData) {
  try {
    console.log('Tentando fazer login do usuário:', data.email)
    const payload = await getPayload({
      config: configPromise,
    })

    const result = await payload.login({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
      },
    })

    // Set the session cookie
    cookies().set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    console.log('Login realizado com sucesso:', result.user.id)

    return {
      success: true,
      error: null,
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err)
    let errorMessage = 'Falha ao fazer login'
    
    if (err instanceof Error) {
      // Translate common error messages
      switch (err.message) {
        case 'Invalid email or password':
          errorMessage = 'E-mail ou senha inválidos'
          break
        case 'User not found':
          errorMessage = 'Usuário não encontrado'
          break
        default:
          errorMessage = 'Falha ao fazer login. Por favor, tente novamente.'
      }
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

export async function register(data: RegisterData) {
  try {
    console.log('Tentando registrar usuário:', data.email)
    const payload = await getPayload({
      config: configPromise,
    })

    const user = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    })

    console.log('Usuário registrado com sucesso:', user.id)

    // Automatically log in the user after registration
    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
      },
    })

    // Set the session cookie
    cookies().set('payload-token', loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return {
      success: true,
      error: null,
    }
  } catch (err) {
    console.error('Erro ao registrar usuário:', err)
    let errorMessage = 'Falha ao registrar usuário'
    
    if (err instanceof Error) {
      // Translate common error messages
      switch (err.message) {
        case 'Email already exists':
          errorMessage = 'Este e-mail já está em uso'
          break
        case 'Invalid email':
          errorMessage = 'E-mail inválido'
          break
        default:
          errorMessage = 'Falha ao registrar usuário. Por favor, tente novamente.'
      }
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
} 