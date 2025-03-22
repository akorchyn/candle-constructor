import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

export async function middleware(request: NextRequest) {
    // Check if the request path starts with /api
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

    if (isPublicRoute) {
        return NextResponse.next();
    }

    const { data: session } = await betterFetch<any>("/api/auth/get-session", {
        baseURL: request.nextUrl.origin,
        headers: {
            cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
        },
    });

    const failedAuth = !session || session.user.role !== 'admin';


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

const publicRoutes = [
    '/login',
]

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
    ],
}
