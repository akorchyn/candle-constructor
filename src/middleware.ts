import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
    // Check if the request path starts with /api
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const isAdminRoute = adminRoutes.some(route => request.nextUrl.pathname.startsWith(route));
    const failedAuth = !session || session.user?.role !== 'admin';
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    const isLoginRoute = request.nextUrl.pathname === '/login';

    if (isLoginRoute && !failedAuth) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAdminRoute) {
        return NextResponse.next();
    }

    // For API routes, return 401 Unauthorized instead of redirecting
    if (failedAuth && isApiRoute && isAdminRoute) {
        return new NextResponse(
            JSON.stringify({
                error: "Unauthorized",
            }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } else if (failedAuth && isAdminRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

const adminRoutes = ["/admin", "/api/admin"]

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
    ],
    runtime: 'nodejs',
}
