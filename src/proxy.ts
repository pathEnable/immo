import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Redirect authenticated users away from login/register to their respective area
    if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
        const role = req.auth?.user?.role;
        if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        if (role === "AGENT") return NextResponse.redirect(new URL("/dashboard", req.url));
        return NextResponse.redirect(new URL("/", req.url)); // USER (client) → homepage
    }

    // Protect admin routes (Only ADMIN role)
    if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        if (req.auth?.user?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Protect dashboard routes (Only AGENT or ADMIN)
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
        const role = req.auth?.user?.role;
        if (role !== "AGENT" && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
