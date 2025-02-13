"use client"
import Link from 'next/link';
import { useState } from 'react';
import AuthDialogs from './AuthDialogs';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <AuthDialogs />
          </div>

          {/* Botão do Menu Mobile */}
          <button 
            className="md:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--accent)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        <div 
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:hidden absolute left-0 right-0 top-full bg-white border-t border-[var(--accent)] shadow-lg z-50`}
        >
          <div className="px-4 py-3 space-y-3">
            <Link 
              href="/about" 
              className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              href="/blog" 
              className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/faq" 
              className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dúvidas
            </Link>
            <Link 
              href="/services" 
              className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Serviços
            </Link>
            <div className="pt-2">
              <AuthDialogs />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 