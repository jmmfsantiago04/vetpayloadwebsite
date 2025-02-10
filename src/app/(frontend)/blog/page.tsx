import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { getPosts } from '../../actions/blog'

function getImageUrl(imageUrl: string | { url: string; alt: string } | undefined): string | null {
  if (!imageUrl) return null
  return typeof imageUrl === 'string' ? imageUrl : imageUrl.url
}

function getImageAlt(post: any): string {
  if (!post.imageUrl) return ''
  if (typeof post.imageUrl === 'string') return post.title
  return post.imageUrl.alt || post.title
}

export default async function Blog() {
  const { posts, error } = await getPosts()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pet Care Blog</h1>
            <p className="text-lg text-gray-600">
              Discover tips, insights, and stories about pet health and happiness
            </p>
          </div>

          {error ? (
            <div className="text-center text-red-600">Error loading blog posts: {error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-600">No blog posts available at the moment.</div>
          ) : (
            /* Blog Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
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
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-blue-600">{post.category}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                      <div className="mt-4">
                        <span className="text-blue-600 hover:text-blue-700 font-medium">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
