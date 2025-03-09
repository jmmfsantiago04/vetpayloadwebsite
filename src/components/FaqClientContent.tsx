'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from 'lucide-react'
import { AnimatedFaqContainer, AnimatedFaqCard, AnimatedAccordionItem, AnimatedTitle } from './AnimatedFaqComponents'

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

const categoryLabels: Record<Category, string> = {
  geral: 'Informações Gerais',
  servicos: 'Nossos Serviços',
  precos: 'Valores e Pagamentos',
  tecnico: 'Informações Técnicas',
  privacidade: 'Privacidade e Segurança'
}

export function FaqClientContent({ faqs }: { faqs: FAQ[] }) {
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
    <>
      <AnimatedTitle>
        Perguntas Frequentes
      </AnimatedTitle>
      <AnimatedFaqContainer>
        {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => {
          const categoryKey = category as Category
          const label = categoryLabels[categoryKey] || category

          return (
            <AnimatedFaqCard key={category}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {categoryFaqs.map((faq) => (
                      <AnimatedAccordionItem key={faq.id}>
                        <AccordionItem
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
                      </AnimatedAccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </AnimatedFaqCard>
          )
        })}
      </AnimatedFaqContainer>
    </>
  )
} 