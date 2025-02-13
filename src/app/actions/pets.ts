'use server'

import { cookies } from 'next/headers'

export async function createPet({
  name,
  type,
  breed,
  age,
  weight,
  medicalHistory,
}: {
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  medicalHistory?: string
}) {
  try {
    // Get the current user from the session
    const cookiesList = await cookies()
    const token = cookiesList.get('payload-token')

    if (!token) {
      return {
        success: false,
        error: 'Você precisa estar logado para criar um pet',
      }
    }

    // Get the current user
    const meResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token.value}`,
      },
    })

    if (!meResponse.ok) {
      return {
        success: false,
        error: 'Sessão inválida. Por favor, faça login novamente.',
      }
    }

    const { user } = await meResponse.json()

    if (!user?.id) {
      return {
        success: false,
        error: 'Sessão inválida. Por favor, faça login novamente.',
      }
    }

    // Create the pet
    const createResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token.value}`,
      },
      body: JSON.stringify({
        name,
        breed,
        age,
        weight,
        medicalHistory,
        owner: user.id,
        type,
      }),
    })

    if (!createResponse.ok) {
      throw new Error('Falha ao criar pet')
    }

    return {
      success: true,
    }
  } catch (err) {
    console.error('Error creating pet:', err)
    return {
      success: false,
      error: 'Falha ao criar pet. Por favor, tente novamente.',
    }
  }
} 