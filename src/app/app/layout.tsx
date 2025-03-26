import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-svh flex flex-col">
            <div className="sticky top-0 z-50">
                <Header />
            </div>
            {children}

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    )
}
