'use client'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import {
  AnimatedHero,
  AnimatedTitle,
  AnimatedText,
  AnimatedServiceGrid,
  AnimatedServiceCard,
  AnimatedConditionsGrid,
  AnimatedConditionCard,
  AnimatedCTA
} from './AnimatedServiceComponents'

const services = [
  {
    id: 1,
    name: 'Consulta por Vídeo',
    description:
      'Consultas virtuais face a face com veterinários experientes para orientação abrangente no cuidado com seu pet.',
    price: 'R$120',
    duration: '30 minutos',
    features: [
      'Interação por vídeo em tempo real',
      'Avaliação comportamental',
      'Orientação sobre dieta e nutrição',
      'Recomendações de acompanhamento',
      'Prescrição digital quando necessário',
      'Disponibilidade 24/7',
    ],
    icon: '🎥',
    image: '/video-consultation.jpg',
  },
  {
    id: 2,
    name: 'Suporte por Chat',
    description:
      'Mensagens instantâneas com profissionais veterinários para dúvidas rápidas e suporte contínuo no cuidado com seu pet.',
    price: 'R$60',
    duration: 'Ilimitado por 24 horas',
    features: [
      'Resposta rápida',
      'Compartilhamento de fotos',
      'Instruções de cuidados',
      'Orientação sobre medicamentos',
      'Recomendações de dieta',
      'Dicas de prevenção',
    ],
    icon: '💬',
    image: '/chat-support.jpg',
  },
  {
    id: 3,
    name: 'Suporte Emergencial',
    description:
      'Acesso prioritário a veterinários para preocupações urgentes com a saúde do seu pet e orientação imediata.',
    price: 'R$180',
    duration: 'Resposta em 15 min',
    features: [
      'Acesso emergencial 24/7',
      'Atendimento prioritário',
      'Orientação para urgências',
      'Primeiros socorros',
      'Encaminhamento hospitalar se necessário',
      'Acompanhamento posterior',
    ],
    icon: '🚨',
    image: '/emergency-support.jpg',
  },
]

const commonConditions = [
  {
    category: 'Comportamental',
    conditions: ['Ansiedade', 'Agressividade', 'Adestramento', 'Latidos Excessivos'],
  },
  {
    category: 'Digestivo',
    conditions: ['Vômito', 'Diarreia', 'Perda de Apetite', 'Alterações de Peso'],
  },
  {
    category: 'Pele e Pelagem',
    conditions: ['Coceira', 'Alergias', 'Queda de Pelo', 'Hotspots'],
  },
  {
    category: 'Bem-estar Geral',
    conditions: ['Orientação sobre Vacinas', 'Consulta Nutricional', 'Cuidados Preventivos', 'Cuidados com Pets Idosos'],
  },
]

export default function ServicesClientContent() {
  return (
    <>
      {/* Hero Section */}
      <AnimatedHero>
        <div className="text-center">
          <AnimatedTitle>
            Nossos Serviços Veterinários Online
          </AnimatedTitle>
          <AnimatedText>
            Cuidados profissionais para seu pet no conforto da sua casa. Escolha o serviço que melhor
            atende às suas necessidades.
          </AnimatedText>
        </div>
      </AnimatedHero>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedServiceGrid>
            {services.map((service) => (
              <AnimatedServiceCard key={service.id}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="default" className="text-lg px-3 py-1">
                        {service.price}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {service.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
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
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link
                        href="https://wa.me/5571991916499"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Agendar Agora
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedServiceCard>
            ))}
          </AnimatedServiceGrid>
        </div>
      </section>

      {/* Common Conditions Section */}
      <section className="py-16 bg-[var(--accent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">
            Condições Comuns que Tratamos
          </h2>
          <AnimatedConditionsGrid>
            {commonConditions.map((item, index) => (
              <AnimatedConditionCard key={index}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--primary)]">
                      {item.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.conditions.map((condition, idx) => (
                        <li key={idx} className="flex items-center text-[var(--text-secondary)]">
                          <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mr-2"></span>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedConditionCard>
            ))}
          </AnimatedConditionsGrid>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedCTA>
        <AnimatedTitle>Pronto para Começar?</AnimatedTitle>
        <AnimatedText>
          Escolha o serviço que melhor atende às suas necessidades e agende sua consulta hoje. Nossos
          veterinários estão aqui para ajudar!
        </AnimatedText>
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-8"
        >
          <Button asChild size="lg" variant="secondary">
            <Link
              href="https://wa.me/5571991916499"
              target="_blank"
              rel="noopener noreferrer"
            >
              Entre em Contato
            </Link>
          </Button>
        </motion.div>
      </AnimatedCTA>
    </>
  )
} 