import { Suspense } from 'react'
import Footer from '../../../components/Footer'
import { ServiceCardSkeleton, ConditionCardSkeleton } from '@/components/ServiceSkeletons'
import { ServicesClientContent } from '@/components/ServicesClientContent'

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Suspense fallback={
        <div className="flex-grow">
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white py-20">
            {/* Hero Skeleton */}
          </div>
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="py-16 bg-[var(--accent)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <ConditionCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      }>
        <ServicesClientContent />
      </Suspense>
      <Footer />
    </div>
  )
}
