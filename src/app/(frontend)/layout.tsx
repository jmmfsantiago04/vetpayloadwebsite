import React from 'react'
import './styles.css'

export const metadata = {
  title: 'Vet Payload CMS',
  description: 'A modern veterinary management system built with Payload CMS and Next.js',
}

const Header = () => (
  <header className="header">
    <nav className="nav">
      <div className="logo">
        <a href="/">Vet CMS</a>
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  </header>
)

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: info@vetcms.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Vet CMS. All rights reserved.</p>
    </div>
  </footer>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
