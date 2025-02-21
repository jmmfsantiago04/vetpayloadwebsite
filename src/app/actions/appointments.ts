'use server'

import { getPayload } from 'payload'
import type { Payload } from 'payload'
import configPromise from '@payload-config'
import { auth } from '@/auth'
import { Appointment } from '@/payload-types'

type CollectionTypes = {
  appointments: any;
  users: any;
}

interface Pet {
  id: string
  name: string
  type: string
}

interface User {
  id: string
  email: string
}

interface AppointmentData {
  id: string
  date: string
  time: string
  pet: Pet
  owner: User
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt?: string
}

export type ActionResponse<T> = {
  data?: T
  error?: string
}

export async function getAppointments(): Promise<ActionResponse<AppointmentData[]>> {
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
        owner: {
          equals: userId
        }
      },
      depth: 2,
      populate: {
        pet: {
          depth: 1
        },
        owner: {
          depth: 1
        }
      }
    })

    return {
      data: response.docs.map(appointment => ({
        id: appointment.id,
        date: appointment.date as string,
        time: appointment.time as string,
        pet: appointment.pet as Pet,
        owner: appointment.owner as User,
        status: appointment.status as AppointmentData['status'],
        notes: appointment.notes as string | undefined,
        createdAt: appointment.createdAt as string,
      }))
    }
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return { error: 'Falha ao buscar consultas' }
  }
}

export async function scheduleAppointment(
  date: string,
  time: string,
  petId: string
): Promise<ActionResponse<AppointmentData>> {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return { error: 'Usuário não autenticado' }
    }

    const payload = await getPayload({
      config: configPromise,
    }) as Payload

    // First get the user ID from the email
    const users = await payload.find({
      collection: 'users' as keyof CollectionTypes,
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

    // Check if there's already an appointment at this time
    const existingAppointments = await payload.find({
      collection: 'appointments' as keyof CollectionTypes,
      where: {
        and: [
          {
            date: {
              equals: date,
            },
          },
          {
            time: {
              equals: time,
            },
          },
          {
            status: {
              not_equals: 'cancelled',
            },
          },
        ],
      },
    })

    if (existingAppointments.totalDocs > 0) {
      return { error: 'Este horário já está reservado' }
    }

    const response = await payload.create({
      collection: 'appointments',
      data: {
        date,
        time,
        pet: petId,
        owner: userId,
        status: 'scheduled' as const,
      },
    })

    // Get the complete appointment data with populated relationships
    const createdAppointment = await payload.findByID({
      collection: 'appointments',
      id: response.id,
      depth: 2,
      populate: {
        pet: {
          depth: 1
        },
        owner: {
          depth: 1
        }
      }
    })

    return {
      data: {
        id: createdAppointment.id,
        date: createdAppointment.date as string,
        time: createdAppointment.time as string,
        pet: createdAppointment.pet as Pet,
        owner: createdAppointment.owner as User,
        status: createdAppointment.status as AppointmentData['status'],
        notes: createdAppointment.notes as string | undefined,
        createdAt: createdAppointment.createdAt as string,
      }
    }
  } catch (error) {
    console.error('Error scheduling appointment:', error)
    return { error: 'Falha ao agendar consulta' }
  }
}

export async function cancelAppointment(id: string): Promise<ActionResponse<void>> {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return { error: 'Usuário não autenticado' }
    }

    const payload = await getPayload({
      config: configPromise,
    })

    await payload.update({
      collection: 'appointments',
      id,
      data: {
        status: 'cancelled' as const,
      },
    })

    return {}
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    return { error: 'Falha ao cancelar consulta' }
  }
} 