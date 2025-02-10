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
    console.log('Attempting to submit review:', data)
    const payload = await getPayload({
      config: configPromise,
    })

    const review = await payload.create({
      collection: 'reviews',
      data: {
        ...data,
        isApproved: false, // All new reviews start as unapproved
      },
    })

    console.log('Successfully submitted review:', review)

    return {
      success: true,
      error: null,
    }
  } catch (err) {
    console.error('Error submitting review:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to submit review',
    }
  }
}

export async function getApprovedReviews() {
  try {
    console.log('Attempting to fetch approved reviews...')
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
      limit: 10, // Limit to most recent 10 approved reviews
    })

    console.log('Successfully fetched approved reviews:', reviews)

    return {
      reviews: reviews.docs as PayloadReview[],
      error: null,
    }
  } catch (err) {
    console.error('Error fetching reviews:', err)
    return {
      reviews: [],
      error: err instanceof Error ? err.message : 'Failed to load reviews',
    }
  }
}
