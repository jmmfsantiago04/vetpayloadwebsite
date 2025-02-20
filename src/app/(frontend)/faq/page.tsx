import { Suspense } from 'react'
import { SearchInput } from '@/components/SearchInput'
import { Skeleton } from '@/components/ui/skeleton'
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

interface SearchFaqsProps {
  faqs: FAQ[]
  searchQuery: string
}

function SearchFaqs({ faqs, searchQuery }: SearchFaqsProps) {
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filteredFaqs.length === 0) {
    return (
      <div className="text-center text-gray-600">
        {faqs.length === 0 ? 'Nenhuma FAQ disponível.' : 'Nenhuma FAQ corresponde à sua busca.'}
      </div>
    )
  }

  return <FaqAccordion faqs={filteredFaqs} />
}

const FaqSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div 
        key={index} 
        className="bg-white rounded-lg p-6 animate-pulse"
        style={{
          animationDelay: `${index * 100}ms`
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2 flex-1 mr-4">
            <div className="h-5 w-3/4 rounded-md bg-gray-200" />
            <div className="h-5 w-1/2 rounded-md bg-gray-200" />
          </div>
          <div className="h-6 w-6 rounded-full bg-gray-200 flex-shrink-0" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-gray-200" />
          <div className="h-4 w-5/6 rounded-md bg-gray-200" />
          <div className="h-4 w-4/6 rounded-md bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
)

export default async function FAQ({
  searchParams,
}: {
  searchParams?: { q?: string }
}) {
  const result = await getFaqs()
  const searchQuery = searchParams?.q || ''

  if (result.error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-red-600">Erro ao carregar FAQs: {result.error}</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Encontre respostas para as perguntas mais comuns sobre nossos serviços veterinários
            </p>
            <SearchInput
              placeholder="Buscar nas perguntas frequentes..."
              className="mx-auto"
            />
          </div>

          <Suspense fallback={<FaqSkeleton />}>
            <SearchFaqs faqs={result.faqs || []} searchQuery={searchQuery} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
