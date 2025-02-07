import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Cat's Body Language",
    excerpt:
      "Learn to decode your feline friend's subtle signals and what they mean for better communication.",
    date: 'March 15, 2024',
    category: 'Cat Care',
    imageUrl: '/blog/cat-language.jpg',
    slug: 'understanding-cat-body-language',
  },
  {
    id: 2,
    title: 'Essential Vaccinations for Puppies',
    excerpt:
      'A comprehensive guide to keeping your new puppy healthy with the right vaccination schedule.',
    date: 'March 12, 2024',
    category: 'Dog Health',
    imageUrl: '/blog/puppy-health.jpg',
    slug: 'essential-puppy-vaccinations',
  },
  {
    id: 3,
    title: 'Natural Remedies for Pet Anxiety',
    excerpt:
      'Discover safe and effective natural ways to help your pet cope with stress and anxiety.',
    date: 'March 10, 2024',
    category: 'Pet Wellness',
    imageUrl: '/blog/pet-anxiety.jpg',
    slug: 'natural-pet-anxiety-remedies',
  },
  {
    id: 4,
    title: 'The Benefits of Regular Pet Dental Care',
    excerpt: "Why dental hygiene is crucial for your pet's overall health and how to maintain it.",
    date: 'March 8, 2024',
    category: 'Pet Health',
    imageUrl: '/blog/pet-dental.jpg',
    slug: 'pet-dental-care-benefits',
  },
  {
    id: 5,
    title: 'Choosing the Right Pet Food',
    excerpt:
      'Tips for selecting the best nutrition options for your furry friend based on age, breed, and health needs.',
    date: 'March 5, 2024',
    category: 'Pet Nutrition',
    imageUrl: '/blog/pet-food.jpg',
    slug: 'choosing-right-pet-food',
  },
  {
    id: 6,
    title: 'Signs Your Pet Needs Emergency Care',
    excerpt: 'Learn to recognize critical symptoms that require immediate veterinary attention.',
    date: 'March 3, 2024',
    category: 'Emergency Care',
    imageUrl: '/blog/pet-emergency.jpg',
    slug: 'pet-emergency-signs',
  },
]

export default function Blog() {
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

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-blue-600">{post.category}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                    <p className="text-gray-600">{post.excerpt}</p>
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
