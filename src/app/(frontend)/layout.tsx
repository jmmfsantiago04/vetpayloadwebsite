import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'My Vet Site',
  description: 'Your trusted partner in pet care',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
