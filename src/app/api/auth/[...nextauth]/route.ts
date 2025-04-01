import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        if (credentials?.email === "drmarreco@juiz.com" && credentials?.password === "drmarreco") {
          return {
            id: "1",
            name: "Juiz Marreco",
            email: "drmarreco@juiz.com"
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }