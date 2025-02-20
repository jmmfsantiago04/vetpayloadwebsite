import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { SearchInput } from '@/components/SearchInput'
import { Skeleton } from '@/components/ui/skeleton'
import { getPosts } from '../../actions/blog'

interface Post {
  id: string
  title: string
  slug: string
  category: string
  date: string
  imageUrl?: string | { url: string; alt: string }
}

function getImageUrl(imageUrl: string | { url: string; alt: string } | undefined): string | null {
  if (!imageUrl) return null
  return typeof imageUrl === 'string' ? imageUrl : imageUrl.url
}

function getImageAlt(post: Post): string {
  if (!post.imageUrl) return ''
  if (typeof post.imageUrl === 'string') return post.title
  return post.imageUrl.alt || post.title
}

interface SearchBlogProps {
  posts: Post[]
  searchQuery: string
}

function BlogPostCard({ post }: { post: Post }) {
  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug}`}>
        {post.imageUrl && (
          <div className="relative h-48">
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            <Image
              src={getImageUrl(post.imageUrl)!}
              alt={getImageAlt(post)}
              fill
              style={{ objectFit: 'cover' }}
              className="group-hover:opacity-90 transition-opacity"
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

function SearchBlog({ posts, searchQuery }: SearchBlogProps) {
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center text-gray-600">
        {posts.length === 0 ? 'Nenhum post disponível no momento.' : 'Nenhum post corresponde à sua busca.'}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post) => (
        <Suspense key={post.id} fallback={<BlogPostSkeleton />}>
          <BlogPostCard post={post} />
        </Suspense>
      ))}
    </div>
  )
}

const BlogPostSkeleton = () => (
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

const BlogSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <BlogPostSkeleton key={index} />
    ))}
  </div>
)

export default async function Blog({
  searchParams,
}: {
  searchParams?: { q?: string }
}) {
  const result = await getPosts()
  const searchQuery = searchParams?.q || ''

  if (result.error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-red-600">Erro ao carregar posts: {result.error}</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog de Cuidados com Pets</h1>
            <p className="text-lg text-gray-600 mb-6">
              Descubra dicas, insights e histórias sobre saúde e felicidade dos pets
            </p>
            <SearchInput
              placeholder="Buscar posts por título ou categoria..."
              className="mx-auto"
            />
          </div>

          <Suspense fallback={<BlogSkeleton />}>
            <SearchBlog posts={result.posts || []} searchQuery={searchQuery} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
