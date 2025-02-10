'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { getApprovedReviews } from '@/app/actions/review'

interface Review {
  id: string
  name: string
  petType: string
  rating: number
  review: string
  date: string
  initials: string
}

const plugin = Autoplay({ delay: 3000, stopOnInteraction: false })

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

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadReviews() {
      const { reviews: approvedReviews, error } = await getApprovedReviews()
      setIsLoading(false)

      if (!error && approvedReviews.length > 0) {
        // Transform Payload reviews to match the review card format
        const transformedReviews: Review[] = approvedReviews.map((review) => ({
          id: review.id,
          name: review.name,
          petType: review.petType.charAt(0).toUpperCase() + review.petType.slice(1),
          rating: review.rating,
          review: review.comment,
          date: formatDate(review.createdAt),
          initials: getInitials(review.name),
        }))
        setReviews(transformedReviews)
      }
    }

    loadReviews()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center text-gray-500">
        Loading reviews...
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center text-gray-500">
        No reviews available yet. Be the first to share your experience!
      </div>
    )
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin]}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="sm:basis-1/2 lg:basis-1/3 pl-4">
            <Card className="p-6 h-full bg-white shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold text-sm">
                  {review.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">{review.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{review.petType} Owner</p>
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] ml-2 whitespace-nowrap">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex gap-0.5 my-2">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-lg ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-[var(--text-primary)] mt-3">
                    &ldquo;{review.review}&rdquo;
                  </blockquote>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {reviews.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      )}
    </Carousel>
  )
}
