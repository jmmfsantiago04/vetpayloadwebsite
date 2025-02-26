import { Suspense } from 'react'
import { ClientPetsTable } from '@/components/ClientPetsTable'
import { AppointmentsTable } from '@/components/AppointmentsTable'
import { getPets } from '@/app/actions/pets'
import { getAppointments } from '@/app/actions/appointments'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShieldAlert, Lock, PawPrint, Calendar } from "lucide-react"
import { auth } from '@/auth'
import { LogoutButton } from '@/components/LogoutButton'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Pets Component
async function PetsSection() {
  const petsResult = await getPets()
  
  if (petsResult.error) {
    throw new Error(petsResult.error)
  }

  return (
    <ClientPetsTable pets={petsResult.data || []} />
  )
}

// Appointments Component
async function AppointmentsSection() {
  const appointmentsResult = await getAppointments()
  
  if (appointmentsResult.error) {
    throw new Error(appointmentsResult.error)
  }

  return (
    <AppointmentsTable appointments={appointmentsResult.data || []} />
  )
}

// Loading components
function PetsLoading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  )
}

function AppointmentsLoading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  )
}

// Error fallback components
const PetsErrorFallback = () => (
  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
    <h3 className="text-red-800 font-medium mb-2">Não foi possível carregar seus pets</h3>
    <p className="text-red-600 text-sm">
      Tente atualizar a página ou volte mais tarde.
    </p>
  </div>
)

const AppointmentsErrorFallback = () => (
  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
    <h3 className="text-red-800 font-medium mb-2">Não foi possível carregar suas consultas</h3>
    <p className="text-red-600 text-sm">
      Tente atualizar a página ou volte mais tarde.
    </p>
  </div>
)

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="container py-8 flex-grow">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive" className="mb-4">
              <Lock className="h-5 w-5" />
              <AlertDescription className="ml-2 text-base">
                Acesso Restrito
              </AlertDescription>
            </Alert>
            <Card>
              <CardHeader>
                <CardTitle>Área do Cliente</CardTitle>
                <CardDescription>
                  Faça login para acessar sua área do cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/login">
                    Fazer Login
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container py-8 flex-grow">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <PawPrint className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl">
                    Olá, {session.user.name || session.user.email?.split('@')[0]}!
                  </CardTitle>
                  <CardDescription className="text-base">
                    Bem-vindo ao seu painel de controle
                  </CardDescription>
                </div>
              </div>
              <LogoutButton />
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <PawPrint className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>Meus Pets</CardTitle>
              </div>
              <CardDescription>
                Lista de todos os seus pets cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary fallback={<PetsErrorFallback />}>
                <Suspense fallback={<PetsLoading />}>
                  <PetsSection />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>Minhas Consultas</CardTitle>
              </div>
              <CardDescription>
                Lista de todas as suas consultas agendadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary fallback={<AppointmentsErrorFallback />}>
                <Suspense fallback={<AppointmentsLoading />}>
                  <AppointmentsSection />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
} 