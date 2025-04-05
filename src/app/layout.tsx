import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin", "cyrillic", "cyrillic-ext"] })

export const metadata: Metadata = {
    title: "Arglow.candles | Свічки ручної роботи для будь-якої нагоди",
    description: "Свічки ручної роботи для будь-якої нагоди",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <body className={inter.className}>
                        {children}
                    </body>
                </ThemeProvider>
            </QueryProvider>
        </html>
    )
}

