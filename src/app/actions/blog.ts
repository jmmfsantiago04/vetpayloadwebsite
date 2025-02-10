'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Category = 'Cat Care' | 'Dog Care' | 'Pet Health' | 'Pet Nutrition'

interface Media {
  id: string
  alt: string
  url: string
}

interface PayloadPost {
  id: string
  title: string
  date: string
  category: Category
  imageUrl?: string | Media
  content: any
  slug: string
  createdAt: string
  updatedAt: string
}

export async function getPosts() {
  try {
    console.log('Attempting to fetch Posts from Payload...')
    const payload = await getPayload({
      config: configPromise,
    })

    const posts = await payload.find({
      collection: 'posts',
      limit: 100,
      depth: 1,
      sort: '-date',
    })

    console.log('Successfully fetched Posts:', posts)

    // Type assertion since we know the structure
    const typedPosts = posts.docs as unknown as PayloadPost[]

    return {
      posts: typedPosts,
      error: null,
    }
  } catch (err) {
    console.error('Error fetching Posts:', err)
    return {
      posts: [] as PayloadPost[],
      error: err instanceof Error ? err.message : 'Failed to load Posts',
    }
  }
}

export async function getPostBySlug(slug: string) {
  try {
    console.log('Attempting to fetch Post by slug:', slug)
    const payload = await getPayload({
      config: configPromise,
    })

    const posts = await payload.find({
      collection: 'posts',
      limit: 1,
      depth: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    console.log('Successfully fetched Post:', posts)

    if (posts.docs.length === 0) {
      return {
        post: null,
        error: 'Post not found',
      }
    }

    // Type assertion since we know the structure
    const post = posts.docs[0] as unknown as PayloadPost

    return {
      post,
      error: null,
    }
  } catch (err) {
    console.error('Error fetching Post:', err)
    return {
      post: null,
      error: err instanceof Error ? err.message : 'Failed to load Post',
    }
  }
}
