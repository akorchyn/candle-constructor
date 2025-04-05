import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from "@/components/theme-provider"

import "@uploadthing/react/styles.css";
import "./globals.css"

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
            <head>
                <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            </head>
            <body className={inter.className}>
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    )
}

