import { Suspense } from 'react'
import Footer from '../../../components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { getPosts } from '../../actions/blog'
import { BlogGrid, BlogSkeleton } from '../../../components/BlogComponents'

// Blog Posts Component
async function BlogPosts() {
  const result = await getPosts()

  if (result.error) {
    throw new Error(result.error)
  }

  return <BlogGrid posts={result.posts || []} />
}

// Error fallback component
const BlogErrorFallback = () => (
  <div className="p-8 rounded-lg bg-red-50 border border-red-200">
    <h3 className="text-red-800 font-medium mb-2">Não foi possível carregar os posts</h3>
    <p className="text-red-600">
      Estamos com dificuldades para carregar o conteúdo do blog. Por favor, tente novamente mais tarde.
    </p>
  </div>
)

export default function Blog() {
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
          </div>

          <ErrorBoundary fallback={<BlogErrorFallback />}>
            <Suspense fallback={<BlogSkeleton />}>
              <BlogPosts />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  )
}
