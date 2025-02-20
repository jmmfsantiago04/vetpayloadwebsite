import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    payloadToken?: string
    user: {
      id: string
      email: string
      name: string
    }
  }
  interface User {
    token?: string
  }
}

// Export handlers for GET and POST requests
const handler = NextAuth(authConfig)
export { handler as GET, handler as POST } 