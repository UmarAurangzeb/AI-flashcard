import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import prisma from "./lib/db"
import bcrypt from "bcryptjs"
import { User } from "./types/DBtypes"
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }), Github({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET
    }),

    Credentials({
        name: "Credentials",
        credentials: {
            email: {},
            password: {},
        },

        async authorize(credentials) {
            const email = credentials?.email as string | undefined;
            const password = credentials?.password as string;
            const user = await prisma.user.findUnique({
                where: { email: email },
            });

            if (user) {
                const checkPassword = await bcrypt.compare(password, user.password);
                if (checkPassword) {
                    return { id: user.id, email: user.email };
                }
                throw new Error("Incorrect password");
            }
            throw new Error("Incorrect details");
        },
    }),
    ],
    pages: {
        signIn: "/signin"
    },
})