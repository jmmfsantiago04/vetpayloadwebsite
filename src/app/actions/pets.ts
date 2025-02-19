'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface PetData {
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  medicalHistory?: string
  userId: string
}

export async function createPet(data: PetData) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const pet = await payload.create({
      collection: 'pets',
      data: {
        name: data.name,
        type: data.type,
        breed: data.breed,
        age: data.age,
        weight: data.weight,
        medicalHistory: data.medicalHistory,
        owner: data.userId,
      },
    })

    return {
      success: true,
      pet,
    }
  } catch (err) {
    console.error('Error creating pet:', err)
    return {
      success: false,
      error: 'Falha ao criar pet. Por favor, tente novamente.',
    }
  }
} 