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

export default async function DashboardPage() {
  const session = await auth()
  const petsResult = await getPets()
  const appointmentsResult = await getAppointments()

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
              <ClientPetsTable
                pets={petsResult.data || []}
              />
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
              <AppointmentsTable
                appointments={appointmentsResult.data || []}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
} 