"use client"

import { ClientPetsTable } from '@/components/ClientPetsTable'
import { useEffect, useState } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface Pet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  medicalHistory?: string
}

interface PayloadPet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  medicalHistory: string | null
  owner: string
}

interface PayloadResponse {
  docs: PayloadPet[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export default function DashboardPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const payload = await getPayload({
          config: configPromise,
        })

        const response = await payload.find({
          collection: 'pets',
          where: {
            owner: {
              equals: (payload as any).user?.id,
            },
          },
        }) as PayloadResponse

        setPets(response.docs.map(pet => ({
          id: pet.id,
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          age: pet.age,
          weight: pet.weight,
          medicalHistory: pet.medicalHistory || undefined,
        })))
      } catch (error) {
        console.error('Error fetching pets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPets()
  }, [])

  const handleAddPet = async (pet: Omit<Pet, 'id'>) => {
    try {
      const payload = await getPayload({
        config: configPromise,
      })

      const response = await payload.create({
        collection: 'pets',
        data: {
          ...pet,
          owner: (payload as any).user?.id,
        },
      }) as PayloadPet

      setPets(prev => [...prev, {
        id: response.id,
        name: response.name,
        type: response.type,
        breed: response.breed,
        age: response.age,
        weight: response.weight,
        medicalHistory: response.medicalHistory || undefined,
      }])
    } catch (error) {
      console.error('Error adding pet:', error)
      throw error
    }
  }

  const handleUpdatePet = async (id: string, pet: Partial<Pet>) => {
    try {
      const payload = await getPayload({
        config: configPromise,
      })

      const response = await payload.update({
        collection: 'pets',
        id,
        data: pet,
      }) as PayloadPet

      setPets(prev => prev.map(p => 
        p.id === id ? {
          ...p,
          ...pet,
          medicalHistory: response.medicalHistory || undefined,
        } : p
      ))
    } catch (error) {
      console.error('Error updating pet:', error)
      throw error
    }
  }

  const handleDeletePet = async (id: string) => {
    try {
      const payload = await getPayload({
        config: configPromise,
      })

      await payload.delete({
        collection: 'pets',
        id,
      })

      setPets(prev => prev.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting pet:', error)
      throw error
    }
  }

  const handleUpdateMedicalHistory = async (id: string, history: string) => {
    try {
      const payload = await getPayload({
        config: configPromise,
      })

      const response = await payload.update({
        collection: 'pets',
        id,
        data: {
          medicalHistory: history,
        },
      }) as PayloadPet

      setPets(prev => prev.map(p => 
        p.id === id ? {
          ...p,
          medicalHistory: response.medicalHistory || undefined,
        } : p
      ))
    } catch (error) {
      console.error('Error updating medical history:', error)
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center text-muted-foreground">
            Carregando...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <ClientPetsTable
        pets={pets}
        onAddPet={handleAddPet}
        onUpdatePet={handleUpdatePet}
        onDeletePet={handleDeletePet}
        onUpdateMedicalHistory={handleUpdateMedicalHistory}
      />
    </div>
  )
} 