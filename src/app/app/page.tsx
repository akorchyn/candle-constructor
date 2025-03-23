import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-12 md:py-20 bg-muted">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Handcrafted Candles for Every Occasion
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Discover our collection of premium, artisanal candles made with natural ingredients and love.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/app/shop">Shop Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/app/categories">Browse Categories</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <FeaturedProducts />

            <CategorySection />

            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Why Choose Our Candles?</h2>
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
                            <h3 className="text-xl font-medium mb-2">Handcrafted</h3>
                            <p className="text-muted-foreground">
                                Each candle is carefully handcrafted with attention to detail and quality.
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
                            <h3 className="text-xl font-medium mb-2">Natural Ingredients</h3>
                            <p className="text-muted-foreground">
                                We use only the finest natural waxes and fragrance oils for a clean burn.
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
                            <h3 className="text-xl font-medium mb-2">Long-Lasting</h3>
                            <p className="text-muted-foreground">
                                Our candles are designed to burn longer, giving you more value for your money.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

