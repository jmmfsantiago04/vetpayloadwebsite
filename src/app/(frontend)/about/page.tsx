import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../../components/Footer'
import DoctorProfile from '../../../components/DoctorProfile'
import ExpertiseSection from '../../../components/ExpertiseSection'
import ClinicInformation from '../../../components/ClinicInformation'
import ReviewsSection from '../../../components/Reviews'
import { AnimatedSection, AnimatedText, AnimatedButton } from '../../../components/AnimatedAboutContent'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <main className="flex-grow">
        {/* Hero Section */}
        <AnimatedSection type="hero">
          <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <AnimatedText>
                  <h1 className="text-4xl font-bold mb-6">
                    Sobre Nós
                  </h1>
                </AnimatedText>
                <AnimatedText>
                  <p className="text-lg text-[var(--accent)] max-w-2xl mx-auto">
                    Trazendo mais de três décadas de experiência veterinária até você
                  </p>
                </AnimatedText>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Doctor Profile Section */}
        <AnimatedSection type="section">
          <DoctorProfile />
        </AnimatedSection>

        {/* Expertise Section */}
        <AnimatedSection type="section">
          <ExpertiseSection />
        </AnimatedSection>

        {/* Clinic Information */}
        <AnimatedSection type="section">
          <ClinicInformation />
        </AnimatedSection>

        {/* Review Section */}
        <section className="py-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection type="section">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">
                  O Que Nossos Clientes Dizem
                </h2>
                <div className="w-24 h-1 bg-[var(--accent)] mx-auto rounded-full"></div>
              </div>
            </AnimatedSection>
            <div className="relative px-12">
              <ReviewsSection />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AnimatedSection type="stagger">
          <section className="py-16 bg-[var(--primary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <AnimatedText>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Experimente um Atendimento Veterinário de Excelência
                </h2>
              </AnimatedText>
              <AnimatedText>
                <p className="text-lg text-[var(--accent)] mb-8 max-w-2xl mx-auto">
                  Agende uma consulta com o Dr. Mauricio Faria e ofereça ao seu pet o cuidado que ele merece.
                </p>
              </AnimatedText>
              <AnimatedButton>
                <Link
                  href="https://wa.me/5571991916499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-[var(--primary)] px-8 py-3 rounded-full text-lg hover:bg-[var(--accent)] transition-colors"
                >
                  Agendar Agora
                </Link>
              </AnimatedButton>
            </div>
          </section>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
