import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { getFaqs } from '../../actions/faq'
import Footer from '../../../components/Footer'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { FaqClientContent } from '@/components/FaqClientContent'

const FaqSkeleton = () => (
  <div className="space-y-8">
    {[...Array(3)].map((_, groupIndex) => (
      <div key={groupIndex} className="bg-white rounded-lg shadow-md p-6">
        <Skeleton className="h-7 w-48 mb-4" />
        <div className="space-y-4">
          {[...Array(3)].map((_, itemIndex) => (
            <div key={itemIndex} className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default async function FAQ() {
  const result = await getFaqs()

  if (result.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow py-12">
          <div className="container max-w-3xl mx-auto px-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>Erro ao carregar FAQs: {result.error}</AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <Suspense fallback={<FaqSkeleton />}>
              <FaqClientContent faqs={result.faqs || []} />
            </Suspense>
          </ScrollArea>
        </div>
      </main>
      <Footer />
    </div>
  )
}
