import { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PetForm from '@/components/PetForm'

export const metadata: Metadata = {
  title: 'Painel - VetPay',
  description: 'Gerencie seus pets e consultas',
}

interface DashboardPageProps {
  params: {
    userId: string
  }
}

export default async function DashboardPage(props: DashboardPageProps) {
  const session = await auth()
  const { userId } = props.params

  // If not logged in, redirect to home
  if (!session) {
    redirect('/')
  }

  // If trying to access another user's dashboard, redirect to own dashboard
  if (session.user.id !== userId) {
    redirect(`/dashboard/${session.user.id}`)
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Bem-vindo, {session.user.name}
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Gerencie seus pets e consultas
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="modern-card p-6">
            <PetForm userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
} 