import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

export async function middleware(request: NextRequest) {
    // Check if the request path starts with /api
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    const isLoginRoute = request.nextUrl.pathname === '/login';

    const { data: session } = await betterFetch<{ user?: { role?: string } }>("/api/auth/get-session", {
        baseURL: request.nextUrl.origin,
        headers: {
            cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
        },
    });

    const failedAuth = !session || session.user?.role !== 'admin';

    if (isLoginRoute) {
        if (!failedAuth) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    // For API routes, return 401 Unauthorized instead of redirecting
    if (isApiRoute && failedAuth) {
        return new NextResponse(
            JSON.stringify({
                error: "Unauthorized",
            }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } else if (failedAuth) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
    ],
}
