import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

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
    payloadToken?: string
  }
}

export const { auth, signIn, signOut } = NextAuth(authConfig) 