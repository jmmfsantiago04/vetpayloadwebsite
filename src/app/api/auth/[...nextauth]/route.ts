import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const payload = await getPayload({
            config: configPromise,
          })

          const result = await payload.login({
            collection: 'users',
            data: {
              email: credentials.email as string,
              password: credentials.password as string,
            },
          })

          if (result.user) {
            return {
              id: result.user.id,
              email: result.user.email,
              name: `${result.user.firstName} ${result.user.lastName}`,
              token: result.token
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.payloadToken = user.token
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = token.id as string
        session.payloadToken = token.payloadToken as string
      }
      return session
    }
  },
  pages: {
    signIn: '/', // Using your custom login dialog
  },
})

export { handler as GET, handler as POST } 