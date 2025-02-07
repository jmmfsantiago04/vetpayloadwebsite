import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Vet CMS</h1>
          <p>Modern veterinary practice management made simple</p>
          <div className="cta-buttons">
            <a href="/services" className="primary-button">
              Our Services
            </a>
            <a href="/contact" className="secondary-button">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Digital Records</h3>
            <p>Secure and easy access to patient records</p>
          </div>
          <div className="feature-card">
            <h3>Appointment Management</h3>
            <p>Streamlined scheduling and reminders</p>
          </div>
          <div className="feature-card">
            <h3>Pet Care History</h3>
            <p>Complete medical history at your fingertips</p>
          </div>
          <div className="feature-card">
            <h3>Client Communication</h3>
            <p>Stay connected with pet owners</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join our network of modern veterinary practices</p>
          <a href={payloadConfig.routes.admin} className="primary-button">
            Access Admin Panel
          </a>
        </div>
      </section>
    </div>
  )
}
