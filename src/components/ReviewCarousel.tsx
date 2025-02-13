'use client'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

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

export default function ReviewCarousel({ reviews = [] }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
        Nenhuma avaliação disponível ainda.
      </div>
    )
  }

  const translatePetType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'dog':
        return 'Cachorro'
      case 'cat':
        return 'Gato'
      case 'other':
        return 'Outro'
      default:
        return type
    }
  }

  return (
    <div className="w-full bg-transparent py-8">
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
              <Card className="p-6 h-full bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold text-sm">
                    {review.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)]">{review.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Tutor de {translatePetType(review.petType)}
                        </p>
                      </div>
                      <span className="text-sm text-[var(--text-secondary)] ml-2 whitespace-nowrap">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex gap-0.5 my-2">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-lg ${
                            index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
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
    </div>
  )
}
