import { Suspense } from 'react'
import Footer from '../../../components/Footer'
import { ServiceCardSkeleton, ConditionCardSkeleton } from '@/components/ServiceSkeletons'
import ServicesClientContent from '@/components/ServicesClientContent'

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <main className="flex-grow">
        <Suspense fallback={
          <div className="space-y-16">
            {/* Service Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {[1, 2, 3].map((i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
            
            {/* Conditions Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {[1, 2, 3, 4].map((i) => (
                <ConditionCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }>
          <ServicesClientContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
