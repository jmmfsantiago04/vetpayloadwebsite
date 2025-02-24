import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { getFaqs } from '../../actions/faq'
import Footer from '../../../components/Footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HelpCircle, AlertCircle } from 'lucide-react'

type Category = 'geral' | 'servicos' | 'precos' | 'tecnico' | 'privacidade'

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

const defaultColors = {
  bg: 'bg-white',
  text: 'text-gray-900',
  border: 'border-gray-200'
}

const categoryLabels: Record<Category, string> = {
  geral: 'Informações Gerais',
  servicos: 'Nossos Serviços',
  precos: 'Valores e Pagamentos',
  tecnico: 'Informações Técnicas',
  privacidade: 'Privacidade e Segurança'
}

const categoryIcons: Record<Category, string> = {
  geral: '🔍',
  servicos: '🏥',
  precos: '💰',
  tecnico: '⚙️',
  privacidade: '🔒'
}

const categoryColors: Record<Category, { bg: string, text: string, border: string }> = {
  geral: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200'
  },
  servicos: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200'
  },
  precos: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200'
  },
  tecnico: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200'
  },
  privacidade: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200'
  }
}

function FaqContent({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma FAQ disponível.</p>
        </CardContent>
      </Card>
    )
  }

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category as Category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<Category, FAQ[]>)

  return (
    <div className="space-y-8">
      {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => {
        const categoryKey = category as Category
        const label = categoryLabels[categoryKey] || category

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-xl">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {categoryFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border-none shadow-none data-[state=open]:bg-gray-50/50 rounded-md"
                  >
                    <AccordionTrigger className="hover:bg-gray-50/50 rounded-md transition-all px-4 py-3 hover:no-underline">
                      <span className="text-left font-medium text-gray-900">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-gray-700">
                      <div className="pb-3">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const FaqSkeleton = () => (
  <div className="space-y-8">
    {[...Array(3)].map((_, groupIndex) => (
      <Card key={groupIndex}>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, itemIndex) => (
              <div key={itemIndex} className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-12">
            Perguntas Frequentes
          </h1>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <Suspense fallback={<FaqSkeleton />}>
              <FaqContent faqs={result.faqs || []} />
            </Suspense>
          </ScrollArea>
        </div>
      </main>
      <Footer />
    </div>
  )
}
