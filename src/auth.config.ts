import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    providers: [], // Providers added in lib/auth.ts
} satisfies NextAuthConfig;
