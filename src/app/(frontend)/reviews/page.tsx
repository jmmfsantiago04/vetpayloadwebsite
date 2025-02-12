import { getApprovedReviews } from '@/app/actions/review'
import ReviewCarousel from '@/components/ReviewCarousel'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Review {
  id: string
  name: string
  petType: string
  rating: number
  review: string
  date: string
  initials: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export default async function ReviewsPage() {
  const { reviews: approvedReviews, error } = await getApprovedReviews()

  // Transform the reviews before passing them
  const transformedReviews = approvedReviews?.map((review) => ({
    id: review.id,
    name: review.name,
    petType: review.petType.charAt(0).toUpperCase() + review.petType.slice(1),
    rating: review.rating,
    review: review.comment,
    date: formatDate(review.createdAt),
    initials: getInitials(review.name),
  })) || []

  console.log('ReviewsPage transformed reviews:', transformedReviews)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h1>
            <p className="text-lg text-gray-600">
              See what our clients have to say about their experience
            </p>
          </div>

          {error ? (
            <div className="text-center text-red-600 p-8 bg-white rounded-lg shadow-sm">
              Error loading reviews: {error}
            </div>
          ) : (
            <ReviewCarousel reviews={transformedReviews} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 