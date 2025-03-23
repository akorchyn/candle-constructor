import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-svh flex flex-col">
            <Header />
            {children}

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    )
}
