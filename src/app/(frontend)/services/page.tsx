'use client'
import Link from 'next/link'
import Footer from '../../../components/Footer'

const services = [
  {
    id: 1,
    name: 'Video Consultation',
    description:
      'Face-to-face virtual appointments with experienced veterinarians for comprehensive pet care guidance.',
    price: 'R$120',
    duration: '30 minutes',
    features: [
      'Real-time video interaction',
      'Behavioral assessment',
      'Diet and nutrition advice',
      'Follow-up recommendations',
      'Digital prescription if needed',
      '24/7 availability',
    ],
    icon: '🎥',
    image: '/video-consultation.jpg',
  },
  {
    id: 2,
    name: 'Chat Support',
    description:
      'Instant messaging with veterinary professionals for quick questions and ongoing pet care support.',
    price: 'R$60',
    duration: 'Unlimited for 24 hours',
    features: [
      'Quick response time',
      'Photo sharing capability',
      'Care instructions',
      'Medication guidance',
      'Diet recommendations',
      'Prevention tips',
    ],
    icon: '💬',
    image: '/chat-support.jpg',
  },
  {
    id: 3,
    name: 'Emergency Support',
    description:
      'Priority access to veterinarians for urgent pet health concerns and immediate guidance.',
    price: 'R$180',
    duration: 'Priority 15-min response',
    features: [
      '24/7 emergency access',
      'Priority response',
      'Urgent care guidance',
      'Emergency first aid',
      'Hospital referral if needed',
      'Follow-up check',
    ],
    icon: '🚨',
    image: '/emergency-support.jpg',
  },
]

const commonConditions = [
  {
    category: 'Behavioral',
    conditions: ['Anxiety', 'Aggression', 'House Training', 'Excessive Barking'],
  },
  {
    category: 'Digestive',
    conditions: ['Vomiting', 'Diarrhea', 'Loss of Appetite', 'Weight Changes'],
  },
  {
    category: 'Skin & Coat',
    conditions: ['Itching', 'Rashes', 'Hair Loss', 'Hot Spots'],
  },
  {
    category: 'General Wellness',
    conditions: ['Vaccination Advice', 'Diet Consultation', 'Preventive Care', 'Senior Pet Care'],
  },
]

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6">Our Online Veterinary Services</h1>
              <p className="text-lg text-[var(--accent)] max-w-2xl mx-auto">
                Professional pet care from the comfort of your home. Choose the service that best
                fits your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-[var(--primary)] opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-4">{service.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-[var(--primary)]">
                        {service.price}
                      </span>
                      <span className="text-sm text-[var(--text-secondary)]">
                        {service.duration}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-[var(--text-secondary)]">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="https://wa.me/5571991916499"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[var(--primary)] text-white text-center py-3 rounded-xl hover:bg-[var(--primary-light)] transition-all transform hover:scale-[1.02]"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Conditions Section */}
        <section className="py-16 bg-[var(--accent)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">
              Common Conditions We Help With
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {commonConditions.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-4">
                    {item.category}
                  </h3>
                  <ul className="space-y-2">
                    {item.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-center text-[var(--text-secondary)]">
                        <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mr-2"></span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-[var(--accent)] mb-8 max-w-2xl mx-auto">
              Choose the service that best fits your needs and book your consultation today. Our
              veterinarians are here to help!
            </p>
            <Link
              href="https://wa.me/5571991916499"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-[var(--primary)] px-8 py-3 rounded-full text-lg hover:bg-[var(--accent)] transition-all transform hover:scale-105"
            >
              Contact Us Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
