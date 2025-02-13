'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface ReviewData {
  name: string
  email: string
  rating: number
  comment: string
  petType: 'dog' | 'cat' | 'other'
}

interface PayloadReview {
  id: string
  name: string
  rating: number
  comment: string
  petType: 'dog' | 'cat' | 'other'
  isApproved: boolean
  createdAt: string
}

export async function submitReview(data: ReviewData) {
  try {
    console.log('Tentando enviar avaliação:', data)
    const payload = await getPayload({
      config: configPromise,
    })

    const review = await payload.create({
      collection: 'reviews',
      data: {
        ...data,
        isApproved: true, // Auto-aprova avaliações - altere isso se quiser aprovação manual
      },
    })

    console.log('Avaliação enviada com sucesso:', review)

    return {
      success: true,
      error: null,
    }
  } catch (err) {
    console.error('Erro ao enviar avaliação:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Falha ao enviar avaliação',
    }
  }
}

export async function getApprovedReviews() {
  try {
    console.log('Tentando buscar avaliações aprovadas...')
    const payload = await getPayload({
      config: configPromise,
    })

    const reviews = await payload.find({
      collection: 'reviews',
      where: {
        isApproved: {
          equals: true,
        },
      },
      sort: '-createdAt',
      limit: 10, // Limita para as 10 avaliações mais recentes
    })

    console.log('Avaliações aprovadas buscadas com sucesso:', reviews)

    return {
      reviews: reviews.docs as PayloadReview[],
      error: null,
    }
  } catch (err) {
    console.error('Erro ao buscar avaliações:', err)
    return {
      reviews: [],
      error: err instanceof Error ? err.message : 'Falha ao carregar avaliações',
    }
  }
}
