import '@/app/globals.css'
import Footer from '@/components/Footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  )
} 