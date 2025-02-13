import type { Metadata } from 'next'
import '../globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
