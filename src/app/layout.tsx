// src/app/layout.tsx
import { Inter } from 'next/font/google'
import QueryProvider from '@/providers/query-provider'
import AuthProvider from '@/providers/auth-provider'
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
    <html lang="en" className="h-lvh bg-gray-100">
      <body className={`h-full ${inter.className}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <AuthProvider>
          <QueryProvider>
            <div className="h-full">
              <main>
                <Header />
                <article className="w-full min-[1440px]:w-[1440px] flex flex-col items-center justify-between gap-[56px]">
                  <div className="flex w-full flex-col justify-between">
                    <section className="flex w-full flex-col gap-[24px] md:px-24 md:py-12 pt-4 px-[16px]">
                      {children}
                    </section>
                    {/*Hack to fix the mobile bottom navigation*/}
                    <div className="h-[80px] md:hidden"></div>
                  </div>
                </article>
              </main>
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
