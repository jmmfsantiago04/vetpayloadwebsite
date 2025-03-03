import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

// Types
export interface Post {
  id: string
  title: string
  slug: string
  category: string
  date: string
  imageUrl?: string | { url: string; alt: string }
}

// Helper functions
function getImageUrl(imageUrl: string | { url: string; alt: string } | undefined): string | null {
  if (!imageUrl) return null
  return typeof imageUrl === 'string' ? imageUrl : imageUrl.url
}

function getImageAlt(post: Post): string {
  if (!post.imageUrl) return ''
  if (typeof post.imageUrl === 'string') return post.title
  return post.imageUrl.alt || post.title
}

// Blog Post Card Component
export function BlogPostCard({ post }: { post: Post }) {
  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
    >
      <Link href={`/blog/${post.slug}`}>
        {post.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <Image
              src={getImageUrl(post.imageUrl)!}
              alt={getImageAlt(post)}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-blue-600">{post.category}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
          <div className="mt-4">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Ler mais →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Blog Post Skeleton Component
export function BlogPostSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative h-48 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded-full bg-gray-200" />
          <div className="h-4 w-24 rounded-full bg-gray-200" />
        </div>
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded-md bg-gray-200" />
          <div className="h-6 w-1/2 rounded-md bg-gray-200" />
        </div>
        <div className="h-4 w-20 rounded-full bg-gray-200" />
      </div>
    </div>
  )
}

// Blog Grid Skeleton Component
export function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <BlogPostSkeleton key={index} />
      ))}
    </div>
  )
}

// Blog Grid Component
interface BlogGridProps {
  posts: Post[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-600">
        Nenhum post disponível no momento.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Suspense key={post.id} fallback={<BlogPostSkeleton />}>
          <BlogPostCard post={post} />
        </Suspense>
      ))}
    </div>
  )
} 