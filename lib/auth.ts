import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs"
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({

            name: "Credentials",

            // it creates form
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password")
                }

                try {
                    // connecting to database
                    await db();
                    // checking user exists or not
                    const user = await User.findOne({ email: credentials.email })

                    // if user not exists
                    if (!user) {
                        throw new Error("No user found!")
                    }

                    const isValid = bcrypt.compare(credentials.password,user.password)

                    if(!isValid){
                        throw new Error("Invalid password!")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }
                   

            } catch(error) {
                throw error
            }


        }

        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages:{
        signIn: "/login",
        error:"/login"
    },
    session:{
        strategy: "jwt",
        maxAge: 30*24*60*60 // Session will expire after 30 days (30 * 24 * 60 * 60 seconds)
    },
    secret:process.env.AUTH_SECRET
}