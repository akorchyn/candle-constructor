import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"
import HeroSlider from "@/components/hero-slider"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSlider />

            <FeaturedProducts />

            <CategorySection />

            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Чому варто обрати наші свічки?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-background p-6 rounded-lg shadow-sm">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary"
                                >
                                    <path d="M12 22v-5" />
                                    <path d="M9 7V2" />
                                    <path d="M15 7V2" />
                                    <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Ручна робота</h3>
                            <p className="text-muted-foreground">
                                Кожна свічка ретельно виготовлена вручну з увагою до деталей та якості.
                            </p>
                        </div>
                        <div className="bg-background p-6 rounded-lg shadow-sm">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary"
                                >
                                    <path d="M9 12h.01" />
                                    <path d="M15 12h.01" />
                                    <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                                    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Натуральні інгредієнти</h3>
                            <p className="text-muted-foreground">
                                Ми використовуємо лише найкращі натуральні воски та ароматичні олії для чистого горіння.
                            </p>
                        </div>
                        <div className="bg-background p-6 rounded-lg shadow-sm">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary"
                                >
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Довготривалі</h3>
                            <p className="text-muted-foreground">
                                Наші свічки розроблені для тривалого горіння, що забезпечує вам більше цінності за ваші гроші.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

