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
    console.log('Attempting to login user:', data.email)
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

    console.log('Successfully logged in user:', result.user.id)

    return {
      success: true,
      error: null,
    }
  } catch (err) {
    console.error('Error logging in user:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to login',
    }
  }
}

export async function register(data: RegisterData) {
  try {
    console.log('Attempting to register user:', data.email)
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

    console.log('Successfully registered user:', user.id)

    return {
      success: true,
      error: null,
    }
  } catch (err) {
    console.error('Error registering user:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to register user',
    }
  }
} 