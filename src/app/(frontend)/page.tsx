import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ReviewForm from '../../components/ReviewForm'
import ReviewCarousel from '../../components/ReviewCarousel'
import { getApprovedReviews } from '../actions/review'

export default async function Home() {
  const { reviews, error } = await getApprovedReviews()
  
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Professional Vet Care From The Comfort of Your Home
                </h1>
                <p className="text-lg text-[var(--accent)] mb-8">
                  Connect with licensed veterinarians 24/7 for expert pet care advice,
                  consultations, and peace of mind.
                </p>
                <a
                  href="https://wa.me/5571991916499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[var(--secondary)] text-white px-8 py-3 rounded-full text-lg hover:bg-[var(--secondary-light)] transition-all transform hover:scale-105"
                >
                  Get Started →
                </a>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder-vet.jpg"
                  alt="Veterinarian with pet"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Video Consultations',
                  description: 'Face-to-face virtual appointments with experienced vets',
                  icon: '🎥',
                },
                {
                  title: '24/7 Chat Support',
                  description: 'Instant messaging with vet professionals anytime',
                  icon: '💬',
                },
                {
                  title: 'Follow-up Care',
                  description: "Continuous support and monitoring of your pet's health",
                  icon: '🏥',
                },
              ].map((service, index) => (
                <div key={index} className="modern-card p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-[var(--accent)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Book Appointment',
                  description: 'Choose a convenient time slot for your consultation',
                },
                {
                  step: '2',
                  title: 'Meet Your Vet',
                  description: 'Connect with a qualified veterinarian via video call',
                },
                {
                  step: '3',
                  title: 'Get Care Plan',
                  description: 'Receive personalized advice and treatment recommendations',
                },
              ].map((step, index) => (
                <div key={index} className="text-center modern-card bg-white p-8">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-600">Read reviews from pet owners who trust our services</p>
            </div>
            <ReviewCarousel reviews={reviews.map(review => ({
              id: review.id,
              name: review.name,
              petType: review.petType,
              rating: review.rating,
              review: review.comment,
              date: review.createdAt,
              initials: review.name.split(' ').map(n => n[0]).join('').toUpperCase()
            }))} />
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Share Your Experience</h3>
              <ReviewForm />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[var(--primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-[var(--accent)] mb-8">
              Book your first consultation today and give your pet the care they deserve.
            </p>
            <a
              href="https://wa.me/5571991916499"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[var(--secondary)] text-white px-8 py-3 rounded-full text-lg hover:bg-[var(--secondary-light)] transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book Now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
