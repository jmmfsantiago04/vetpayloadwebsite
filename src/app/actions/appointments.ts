'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { auth } from '@/auth'

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  status: 'agendada' | 'confirmada' | 'concluida' | 'cancelada'
  notes?: string
  pet: {
    id: string
    name: string
  }
}

interface ActionResponse<T> {
  data?: T
  error?: string
}

export async function getAppointments(): Promise<ActionResponse<Appointment[]>> {
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
      collection: 'appointments',
      where: {
        user: {
          equals: userId,
        },
      },
      depth: 1, // To populate the pet relationship
    })

    return {
      data: response.docs.map(appointment => ({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        status: appointment.status,
        notes: appointment.notes,
        pet: {
          id: appointment.pet.id,
          name: appointment.pet.name,
        },
      }))
    }
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return { error: 'Falha ao buscar consultas' }
  }
} 