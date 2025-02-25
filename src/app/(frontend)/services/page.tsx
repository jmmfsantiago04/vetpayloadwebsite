'use client'
import Link from 'next/link'
import Footer from '../../../components/Footer'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Suspense } from 'react'

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

function ServiceCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <div className="space-y-2 mt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

function ConditionCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2 mb-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6">Nossos Serviços Veterinários Online</h1>
              <p className="text-lg text-[var(--accent)] max-w-2xl mx-auto">
                Cuidados profissionais para seu pet no conforto da sua casa. Escolha o serviço que melhor
                atende às suas necessidades.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </div>
            }>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <Card key={service.id} className="h-full">
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
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* Common Conditions Section */}
        <section className="py-16 bg-[var(--accent)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">
              Condições Comuns que Tratamos
            </h2>
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <ConditionCardSkeleton key={i} />
                ))}
              </div>
            }>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {commonConditions.map((item, index) => (
                  <Card key={index}>
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
                ))}
              </div>
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
            <p className="text-lg text-[var(--accent)] mb-8 max-w-2xl mx-auto">
              Escolha o serviço que melhor atende às suas necessidades e agende sua consulta hoje. Nossos
              veterinários estão aqui para ajudar!
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link
                href="https://wa.me/5571991916499"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entre em Contato
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
