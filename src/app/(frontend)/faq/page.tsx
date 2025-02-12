import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { getFaqs } from '../../actions/faq'
import FaqAccordion from '@/components/FaqAccordion'

type Category = 'general' | 'services' | 'pricing' | 'technical' | 'privacy'

interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  category: Category
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default async function FAQ() {
  const { faqs, error } = await getFaqs()

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-red-600">Error loading FAQs: {error}</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-600">No FAQs available.</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our veterinary services
            </p>
          </div>

          {/* FAQ Accordion */}
          <FaqAccordion faqs={faqs} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
