import { Metadata } from 'next'
import PetForm from '@/components/PetForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Painel - VetPay',
  description: 'Gerencie seus pets e consultas',
}

export default async function DefaultDashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  redirect(`/dashboard/${session.user.id}`)
} 