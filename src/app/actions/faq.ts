'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Category = 'general' | 'services' | 'pricing' | 'technical' | 'privacy'

interface PayloadFaq {
  id: string
  question: string
  answer: string
  order: number
  category: Category
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export async function getFaqs() {
  try {
    console.log('Attempting to fetch FAQs from Payload...')
    const payload = await getPayload({
      config: configPromise,
    })

    const faqs = await payload.find({
      collection: 'faqs',
      limit: 100,
      depth: 0,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    console.log('Successfully fetched FAQs:', faqs)

    // Type assertion since we know the structure
    const typedFaqs = faqs.docs as unknown as PayloadFaq[]

    return {
      faqs: typedFaqs.sort((a, b) => a.order - b.order),
      error: null,
    }
  } catch (err) {
    console.error('Error fetching FAQs:', err)
    return {
      faqs: [] as PayloadFaq[],
      error: err instanceof Error ? err.message : 'Failed to load FAQs',
    }
  }
}

export async function createFaq(data: {
  question: string
  answer: string
  category: Category
  order: number
  isActive: boolean
}) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const faq = await payload.create({
      collection: 'faqs',
      data,
    })
    return { success: true, faq, error: null }
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return { success: false, faq: null, error: 'Failed to create FAQ' }
  }
}

export async function updateFaq(
  id: string,
  data: Partial<{
    question: string
    answer: string
    category: Category
    order: number
    isActive: boolean
  }>,
) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const faq = await payload.update({
      collection: 'faqs',
      id,
      data,
    })
    return { success: true, faq, error: null }
  } catch (error) {
    console.error('Error updating FAQ:', error)
    return { success: false, faq: null, error: 'Failed to update FAQ' }
  }
}

export async function deleteFaq(id: string) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    await payload.delete({
      collection: 'faqs',
      id,
    })
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return { success: false, error: 'Failed to delete FAQ' }
  }
}
