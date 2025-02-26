import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Footer from '../../../components/Footer'
import ReviewCarousel from '../../../components/ReviewCarousel'
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

// Doctor Profile Section Component
function DoctorProfile() {
  return (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/dr-mauricio.jpg"
                  alt="Dr. Mauricio Faria"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                  Dr. Mauricio Faria
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)]">
                  <p>
                    Com mais de 30 anos de serviço dedicado à medicina veterinária, o Dr. Mauricio
                    Faria é um nome respeitado no cuidado com animais em Salvador. Sua jornada na
                    medicina veterinária começou com uma paixão por ajudar animais e evoluiu para
                    uma missão de tornar o atendimento veterinário de qualidade mais acessível a todos.
                  </p>
                  <p>
                    Como fundador e veterinário chefe de sua clínica de sucesso em Salvador, Dr.
                    Faria já tratou milhares de pets, adquirindo uma experiência inestimável em vários
                    aspectos da medicina veterinária. Sua expertise abrange desde cuidados de rotina até
                    procedimentos médicos complexos, sempre mantendo os mais altos padrões da prática veterinária.
                  </p>
                  <p>
                    Reconhecendo as necessidades em constante mudança dos tutores de pets e as vantagens da
                    tecnologia moderna, Dr. Faria expandiu seus serviços para incluir consultas online.
                    Essa abordagem inovadora permite que ele alcance mais tutores de pets enquanto mantém
                    o mesmo nível de atendimento profissional e atenção personalizada que tem definido
                    sua prática por três décadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

// Expertise Section Component
function ExpertiseSection() {
  const expertiseItems = [
                {
                  title: 'Experiência Clínica',
                  description:
                    'Décadas de experiência prática no tratamento de diversas condições e emergências de pets.',
                  icon: '🏥',
                },
                {
                  title: 'Abordagem Moderna',
                  description:
                    'Combinando conhecimento veterinário tradicional com recursos modernos de telemedicina.',
                  icon: '💻',
                },
                {
                  title: 'Educação Continuada',
                  description:
                    'Participação regular em congressos veterinários e desenvolvimento profissional contínuo.',
                  icon: '📚',
                },
  ]

  return (
    <section className="py-16 bg-[var(--accent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
          Nossa Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

// Clinic Information Section Component
function ClinicInformation() {
  return (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Nossa Clínica Física
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[var(--text-secondary)] mb-4">
                    Embora ofereçamos consultas online abrangentes, nossa clínica física em
                    Salvador continua fornecendo atendimento veterinário completo. Nossas instalações
                    modernas são equipadas com equipamentos médicos de última geração e contam com
                    profissionais experientes.
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center text-[var(--text-secondary)]">
                      <svg
                        className="w-5 h-5 text-[var(--primary)] mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Salvador, Bahia
                    </p>
                    <p className="flex items-center text-[var(--text-secondary)]">
                      <svg
                        className="w-5 h-5 text-[var(--primary)] mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Aberto de Segunda a Sábado
                    </p>
                  </div>
                </div>
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    src="/clinic.jpg"
                    alt="Nossa Clínica Veterinária"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

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
