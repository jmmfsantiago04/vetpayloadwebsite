import { Suspense } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import ReviewCarousel from './ReviewCarousel'
import { getApprovedReviews } from '@/app/actions/review'

// Dynamic Reviews Component
async function Reviews() {
  const { reviews, error } = await getApprovedReviews()
  
  if (error) {
    throw new Error(error)
  }
  
  const transformedReviews = reviews?.map(review => ({
    id: review.id,
    name: review.name,
    petType: review.petType,
    rating: review.rating,
    review: review.comment,
    date: review.createdAt,
    initials: review.name.split(' ').map(n => n[0]).join('').toUpperCase()
  })) || []

  return <ReviewCarousel reviews={transformedReviews} />
}

// Loading component for Reviews
function ReviewsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-white/20 w-64 mx-auto mb-8 rounded"></div>
      <div className="h-48 bg-white/10 rounded-lg max-w-2xl mx-auto"></div>
    </div>
  )
}

// Error fallback for Reviews
const ReviewsErrorFallback = () => (
  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
    <h3 className="text-red-800 font-medium mb-2">Não foi possível carregar as avaliações</h3>
    <p className="text-red-600 text-sm">
      Estamos com dificuldades para carregar as avaliações. Por favor, tente novamente mais tarde.
    </p>
  </div>
)

interface ReviewsSectionProps {
  title?: string
  className?: string
}

export default function ReviewsSection({ title, className = '' }: ReviewsSectionProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-semibold text-white text-center mb-8">
          {title}
        </h3>
      )}
      <ErrorBoundary fallback={<ReviewsErrorFallback />}>
        <Suspense fallback={<ReviewsLoading />}>
          <Reviews />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
} 