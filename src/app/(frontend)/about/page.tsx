'use client'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ReviewCarousel from '../../../components/ReviewCarousel'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6">About Us</h1>
              <p className="text-lg text-[var(--accent)] max-w-2xl mx-auto">
                Bringing over three decades of veterinary expertise to your doorstep
              </p>
            </div>
          </div>
        </section>

        {/* Doctor Profile Section */}
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
                    With over 30 years of dedicated service in veterinary medicine, Dr. Mauricio
                    Faria has been a trusted name in pet healthcare in Salvador. His journey in
                    veterinary medicine began with a passion for helping animals and has evolved
                    into a mission to make quality pet care more accessible to all.
                  </p>
                  <p>
                    As the founder and lead veterinarian of his successful clinic in Salvador, Dr.
                    Faria has treated thousands of pets, gaining invaluable experience in various
                    aspects of veterinary medicine. His expertise spans from routine care to complex
                    medical procedures, always maintaining the highest standards of veterinary
                    practice.
                  </p>
                  <p>
                    Recognizing the changing needs of pet owners and the advantages of modern
                    technology, Dr. Faria has expanded his services to include online consultations.
                    This innovative approach allows him to reach more pet owners while maintaining
                    the same level of professional care and personal attention that has defined his
                    practice for three decades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16 bg-[var(--accent)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
              Our Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Clinical Experience',
                  description:
                    'Decades of hands-on experience in treating various pet conditions and emergencies.',
                  icon: '🏥',
                },
                {
                  title: 'Modern Approach',
                  description:
                    'Combining traditional veterinary knowledge with modern telemedicine capabilities.',
                  icon: '💻',
                },
                {
                  title: 'Continued Education',
                  description:
                    'Regular participation in veterinary conferences and continuous professional development.',
                  icon: '📚',
                },
              ].map((item, index) => (
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

        {/* Clinic Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                Our Physical Clinic
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[var(--text-secondary)] mb-4">
                    While we offer comprehensive online consultations, our physical clinic in
                    Salvador continues to provide full-service veterinary care. Our modern facility
                    is equipped with state-of-the-art medical equipment and staffed by experienced
                    professionals.
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
                      Open Monday - Saturday
                    </p>
                  </div>
                </div>
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <Image
                    src="/clinic.jpg"
                    alt="Our Veterinary Clinic"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section className="py-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              What Our Clients Say
            </h2>
            <ReviewCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[var(--primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Experience Expert Pet Care</h2>
            <p className="text-lg text-[var(--accent)] mb-8 max-w-2xl mx-auto">
              Book a consultation with Dr. Mauricio Faria and give your pet the care they deserve.
            </p>
            <Link
              href="https://wa.me/5571991916499"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-[var(--primary)] px-8 py-3 rounded-full text-lg hover:bg-[var(--accent)] transition-all transform hover:scale-105"
            >
              Schedule Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
