import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '../../../../components/Footer'
import RichText from '../../../../components/RichText'
import { getPostBySlug } from '../../../actions/blog'

function getImageUrl(imageUrl: string | { url: string; alt: string } | undefined): string | null {
  if (!imageUrl) return null
  return typeof imageUrl === 'string' ? imageUrl : imageUrl.url
}

function getImageAlt(post: any): string {
  if (!post.imageUrl) return ''
  if (typeof post.imageUrl === 'string') return post.title
  return post.imageUrl.alt || post.title
}

interface PageProps {
  params: {
    slug: string
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { post, error } = await getPostBySlug(params.slug)

  if (error || !post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/blog" className="hover:text-blue-600">
                ← Back to Blog
              </Link>
              <span className="mx-2">•</span>
              <span>{post.category}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(post.imageUrl)!}
                alt={getImageAlt(post)}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <RichText content={post.content} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
