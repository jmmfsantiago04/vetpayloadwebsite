"use client"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    petType: "Dog",
    rating: 5,
    review: "Amazing service! The vet was so patient with my anxious dog during the video consultation. Really helpful advice!",
    date: "2 days ago",
    initials: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    petType: "Cat",
    rating: 5,
    review: "Quick and professional response when my cat needed urgent care. The online consultation saved us an unnecessary trip to the emergency vet.",
    date: "1 week ago",
    initials: "MC"
  },
  {
    id: 3,
    name: "Emma Davis",
    petType: "Bird",
    rating: 5,
    review: "The follow-up care for my parakeet was excellent. The vet provided detailed instructions and was available for all my questions.",
    date: "2 weeks ago",
    initials: "ED"
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    petType: "Dog",
    rating: 4,
    review: "Very convenient service. Got the help I needed for my puppy's dietary concerns without leaving home.",
    date: "3 weeks ago",
    initials: "CR"
  }
];

const plugin = Autoplay({ delay: 3000, stopOnInteraction: false })

export default function ReviewCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
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
      <div className="flex items-center justify-center gap-2 mt-4">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
} 