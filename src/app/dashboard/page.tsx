import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard content will go here */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                Welcome to Your Dashboard
              </h2>
              <p className="text-[var(--text-secondary)]">
                This is where you&apos;ll be able to manage your account and access our services.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 