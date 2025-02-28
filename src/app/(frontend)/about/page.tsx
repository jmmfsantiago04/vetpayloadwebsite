import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Footer from '../../../components/Footer'
import ReviewCarousel from '../../../components/ReviewCarousel'
import DoctorProfile from '../../../components/DoctorProfile'
import ExpertiseSection from '../../../components/ExpertiseSection'
import ClinicInformation from '../../../components/ClinicInformation'
import { getApprovedReviews } from '@/app/actions/review'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Reviews Component
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

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6">Sobre Nós</h1>
              <p className="text-lg text-[var(--accent)] max-w-2xl mx-auto">
                Trazendo mais de três décadas de experiência veterinária até você
              </p>
            </div>
          </div>
        </section>

        {/* Doctor Profile Section */}
        <DoctorProfile />

        {/* Expertise Section */}
        <ExpertiseSection />

        {/* Clinic Information */}
        <ClinicInformation />

        {/* Review Section */}
        <section className="py-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                O Que Nossos Clientes Dizem
              </h2>
              <div className="w-24 h-1 bg-[var(--accent)] mx-auto rounded-full"></div>
            </div>
            <div className="relative px-12">
              <ErrorBoundary fallback={<ReviewsErrorFallback />}>
                <Suspense fallback={<ReviewsLoading />}>
                  <Reviews />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[var(--primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Experimente um Atendimento Veterinário de Excelência
            </h2>
            <p className="text-lg text-[var(--accent)] mb-8 max-w-2xl mx-auto">
              Agende uma consulta com o Dr. Mauricio Faria e ofereça ao seu pet o cuidado que ele merece.
            </p>
            <Link
              href="https://wa.me/5571991916499"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-[var(--primary)] px-8 py-3 rounded-full text-lg hover:bg-[var(--accent)] transition-all transform hover:scale-105"
            >
              Agendar Agora
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
