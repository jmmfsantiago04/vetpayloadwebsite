import { ClientPetsTable } from '@/components/ClientPetsTable'
import { getPets } from '@/app/actions/pets'
import { getAppointments } from '@/app/actions/appointments'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ShieldAlert, Lock, PawPrint, Calendar as CalendarIcon, Clock } from "lucide-react"
import { auth } from '@/auth'
import { LogoutButton } from '@/components/LogoutButton'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentScheduler } from '@/components/AppointmentScheduler'
import { AppointmentsTable } from '@/components/AppointmentsTable'

export default async function DashboardPage() {
  const session = await auth()
  const petsResult = await getPets()
  const appointmentsResult = await getAppointments()

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive" className="mb-4">
              <Lock className="h-5 w-5" />
              <AlertDescription className="ml-2 text-base">
                Acesso Restrito
              </AlertDescription>
            </Alert>
            <Card>
              <CardHeader>
                <CardTitle>Área Exclusiva para Clientes</CardTitle>
                <CardDescription>
                  Você precisa estar logado para acessar o painel de controle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Por favor, faça login ou crie uma conta para continuar.
                </p>
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <Link href="/cliente/login">
                      Fazer Login
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/cliente/register">
                      Criar Conta
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (petsResult.error || appointmentsResult.error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive" className="mb-4">
              <ShieldAlert className="h-5 w-5" />
              <AlertDescription className="ml-2 text-base">
                Erro ao Carregar Dados
              </AlertDescription>
            </Alert>
            <Card>
              <CardHeader>
                <CardTitle>Ops! Algo deu errado</CardTitle>
                <CardDescription>
                  Não foi possível carregar seus dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {petsResult.error || appointmentsResult.error}. Por favor, tente novamente em alguns instantes.
                  Se o problema persistir, entre em contato com o suporte.
                </p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="w-full"
                >
                  Tentar Novamente
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle>Consultas Agendadas</CardTitle>
                </div>
                <CardDescription>
                  Acompanhe suas consultas agendadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsTable appointments={appointmentsResult.data || []} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle>Agendar Consulta</CardTitle>
                </div>
                <CardDescription>
                  Escolha uma data e horário para a consulta do seu pet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentScheduler pets={petsResult.data || []} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 