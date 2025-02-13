import { Metadata } from 'next'
import PetForm from '@/components/PetForm'

export const metadata: Metadata = {
  title: 'Painel - VetPay',
  description: 'Gerencie seus pets e consultas',
}

export default function DashboardPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Gerenciamento de Pets</h1>
          <p className="text-[var(--text-secondary)] mt-2">Adicione e gerencie as informações dos seus pets</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="modern-card p-6">
            <PetForm />
          </div>
        </div>
      </div>
    </div>
  )
} 