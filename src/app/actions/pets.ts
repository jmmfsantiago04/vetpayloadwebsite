'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { auth } from '@/auth'

interface Pet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  medicalHistory?: string
}

export type ActionResponse<T> = {
  data?: T
  error?: string
}

export async function getPets(): Promise<ActionResponse<Pet[]>> {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return { error: 'Usuário não autenticado' }
    }

    const payload = await getPayload({
      config: configPromise,
    })

    // First get the user ID from the email
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: session.user.email,
        },
      },
    })

    if (users.totalDocs === 0) {
      return { error: 'Usuário não encontrado' }
    }

    const userId = users.docs[0].id

    const response = await payload.find({
      collection: 'pets',
      where: {
        owner: {
          equals: userId,
        },
      },
    })

    return {
      data: response.docs.map(pet => ({
        id: pet.id,
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        weight: pet.weight,
        medicalHistory: pet.medicalHistory || undefined,
      }))
    }
  } catch (error) {
    console.error('Error fetching pets:', error)
    return { error: 'Falha ao buscar pets' }
  }
}

export async function addPet(pet: Omit<Pet, 'id'>): Promise<ActionResponse<Pet>> {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return { error: 'Usuário não autenticado' }
    }

    const payload = await getPayload({
      config: configPromise,
    })

    // First get the user ID from the email
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: session.user.email,
        },
      },
    })

    if (users.totalDocs === 0) {
      return { error: 'Usuário não encontrado' }
    }

    const userId = users.docs[0].id

    const response = await payload.create({
      collection: 'pets',
      data: {
        ...pet,
        owner: userId,
      },
    })

    return {
      data: {
        id: response.id,
        name: response.name,
        type: response.type,
        breed: response.breed,
        age: response.age,
        weight: response.weight,
        medicalHistory: response.medicalHistory || undefined,
      }
    }
  } catch (error) {
    console.error('Error adding pet:', error)
    return { error: 'Falha ao adicionar pet' }
  }
}

export async function updatePet(id: string, pet: Partial<Pet>): Promise<ActionResponse<Pet>> {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return { error: 'Usuário não autenticado' }
    }

    const payload = await getPayload({
      config: configPromise,
    })

    const response = await payload.update({
      collection: 'pets',
      id,
      data: pet,
    })

    return {
      data: {
        id: response.id,
        name: response.name,
        type: response.type,
        breed: response.breed,
        age: response.age,
        weight: response.weight,
        medicalHistory: response.medicalHistory || undefined,
      }
    }
  } catch (error) {
    console.error('Error updating pet:', error)
    return { error: 'Falha ao atualizar pet' }
  }
}

export async function deletePet(id: string): Promise<ActionResponse<void>> {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return { error: 'Usuário não autenticado' }
    }

    const payload = await getPayload({
      config: configPromise,
    })

    await payload.delete({
      collection: 'pets',
      id,
    })

    return {}
  } catch (error) {
    console.error('Error deleting pet:', error)
    return { error: 'Falha ao excluir pet' }
  }
}

export async function updateMedicalHistory(id: string, history: string): Promise<ActionResponse<Pet>> {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return { error: 'Usuário não autenticado' }
    }

    const payload = await getPayload({
      config: configPromise,
    })

    const response = await payload.update({
      collection: 'pets',
      id,
      data: {
        medicalHistory: history,
      },
    })

    return {
      data: {
        id: response.id,
        name: response.name,
        type: response.type,
        breed: response.breed,
        age: response.age,
        weight: response.weight,
        medicalHistory: response.medicalHistory || undefined,
      }
    }
  } catch (error) {
    console.error('Error updating medical history:', error)
    return { error: 'Falha ao atualizar histórico médico' }
  }
} 