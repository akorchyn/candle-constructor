// src/app/layout.tsx
import { Inter } from 'next/font/google'
import QueryProvider from '@/providers/query-provider'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Header from '@/components/layout/Header'
import "@uploadthing/react/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`h-full ${inter.className}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <QueryProvider>
          <div className="min-h-full">
            <Header />
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
