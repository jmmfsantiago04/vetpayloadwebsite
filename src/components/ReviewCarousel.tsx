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
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="sm:basis-1/2 lg:basis-1/3 pl-4">
              <Card className="p-8 h-full bg-white backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg tracking-wide">{review.name}</h3>
                      <p className="text-sm text-[var(--primary)]">
                        Tutor de {translatePetType(review.petType)}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-xl ${
                          index < review.rating ? 'text-yellow-500' : 'text-gray-200'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-base leading-relaxed">
                    &ldquo;{review.review}&rdquo;
                  </blockquote>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <CarouselPrevious 
              className="relative static bg-white/10 hover:bg-white/20 border-0 text-white h-10 w-10 rounded-full transition-all duration-300"
            />
            <CarouselNext 
              className="relative static bg-white/10 hover:bg-white/20 border-0 text-white h-10 w-10 rounded-full transition-all duration-300"
            />
          </div>
        )}
      </Carousel>
    </div>
  )
}
