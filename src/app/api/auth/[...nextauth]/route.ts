import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bd from "@/libs/prisma"
import bcrypt from "bcrypt"


export const authOptions = {
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

        if (!userFound) throw new Error("email no found");
        console.log(userFound);

        const matchPassword = await bcrypt.compare(credentials!.password, userFound.password)
        if (!matchPassword) throw new Error("Password not match");

        return {
          id: userFound.id.toString(),
          name: userFound.username,
          email: userFound.email
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };






