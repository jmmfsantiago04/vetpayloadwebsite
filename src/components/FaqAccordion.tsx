'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left text-lg font-medium text-gray-900 hover:no-underline hover:text-primary">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 pt-2 pb-4 px-1">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
} 