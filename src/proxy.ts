import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;
    const role = req.auth?.user?.role;

    // Redirect authenticated users away from login/register to their respective area
    if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
        if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        if (role === "AGENT") return NextResponse.redirect(new URL("/dashboard", req.url));
        return NextResponse.redirect(new URL("/", req.url)); // USER → homepage
    }

    // Protect admin routes (Only ADMIN role)
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        if (role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Protect dashboard routes (Only AGENT or ADMIN)
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        if (role !== "AGENT" && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Protect user-only routes (any authenticated user)
    if (pathname.startsWith("/favorites") || pathname.startsWith("/chat")) {
        if (!isLoggedIn) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/api/admin/:path*",
        "/favorites/:path*",
        "/chat/:path*",
        "/login",
        "/register",
    ],
};
