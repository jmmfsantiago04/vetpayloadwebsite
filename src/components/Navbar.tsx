'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Links da Esquerda - Ocultos no Mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Sobre
            </Link>
            <Link
              href="/blog"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Dúvidas
            </Link>
          </div>

          {/* Logo Central */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors"
            >
              VetPay
            </Link>
          </div>

          {/* Links da Direita - Ocultos no Mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/services"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Serviços
            </Link>
            <Link
              href="/cliente/dashboard"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Área do Cliente
            </Link>
            {!session && (
              <Link
                href="/login"
                className="bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-light)] transition-colors font-medium"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Botão do Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/about"
                onClick={handleLinkClick}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
              >
                Sobre
              </Link>
              <Link
                href="/blog"
                onClick={handleLinkClick}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
              >
                Blog
              </Link>
              <Link
                href="/faq"
                onClick={handleLinkClick}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
              >
                Dúvidas
              </Link>
              <Link
                href="/services"
                onClick={handleLinkClick}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
              >
                Serviços
              </Link>
              <Link
                href="/cliente/dashboard"
                onClick={handleLinkClick}
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
              >
                Área do Cliente
              </Link>
              {!session && (
                <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-light)] transition-colors font-medium inline-block text-center"
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
