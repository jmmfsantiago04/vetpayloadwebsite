import type { Metadata } from 'next'
import '../globals.css'
import { Providers } from '../providers'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'VetPay - Atendimento Veterinário Online',
  description: 'Seu parceiro de confiança no cuidado com pets',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col bg-[var(--background)]">
            <Navbar />
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  )
}
