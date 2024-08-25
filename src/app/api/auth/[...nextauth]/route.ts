import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bd from "@/libs/prisma"
import bcrypt from "bcrypt"


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password", placeholder: "********" }
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const userFound = await bd.user.findUnique({
          where: {
            email: credentials?.email
          }
        })

        if (!userFound) return null;
        console.log(userFound);

        const matchPassword = await bcrypt.compare(credentials!.password, userFound.password)
        if (!matchPassword) return null;

        return {
          id: userFound.id.toString(),
          username: userFound.username,
          email: userFound.email
        };
      }
    })
  ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };






