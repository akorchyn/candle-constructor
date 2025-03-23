import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample categories data
const categories = [
    {
        id: 1,
        name: "Decorative Candles",
        description: "Beautiful candles to enhance your home decor",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 12,
        slug: "decorative",
        featured: true,
    },
    {
        id: 2,
        name: "Seasonal Candles",
        description: "Special candles for holidays and celebrations",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 8,
        slug: "seasonal",
        featured: true,
    },
    {
        id: 3,
        name: "Scented Candles",
        description: "Aromatic candles to create the perfect atmosphere",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 15,
        slug: "scented",
        featured: true,
    },
    {
        id: 4,
        name: "Pillar Candles",
        description: "Classic pillar candles in various sizes and colors",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 10,
        slug: "pillar",
        featured: false,
    },
    {
        id: 5,
        name: "Taper Candles",
        description: "Elegant taper candles for formal dining and special occasions",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 6,
        slug: "taper",
        featured: false,
    },
    {
        id: 6,
        name: "Jar Candles",
        description: "Long-lasting candles in beautiful glass containers",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 9,
        slug: "jar",
        featured: false,
    },
    {
        id: 7,
        name: "Votive Candles",
        description: "Small candles perfect for creating intimate lighting",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 7,
        slug: "votive",
        featured: false,
    },
    {
        id: 8,
        name: "Figurine Candles",
        description: "Uniquely shaped candles for special gifts and decor",
        image: "/placeholder.svg?height=400&width=600",
        productCount: 11,
        slug: "figurine",
        featured: false,
    },
]

export default function CategoriesPage() {
    // Separate featured categories
    const featuredCategories = categories.filter((category) => category.featured)
    const regularCategories = categories.filter((category) => !category.featured)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Our Candle Categories</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Explore our wide range of handcrafted candles, organized by category to help you find exactly what you're
                    looking for.
                </p>
            </div>

            {/* Featured Categories */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredCategories.map((category) => (
                        <div key={category.id} className="relative group overflow-hidden rounded-lg">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center">
                                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                                    <p className="mb-4">{category.description}</p>
                                    <Button asChild variant="outline" className="text-white border-white hover:bg-white/20">
                                        <Link href={`/categories/${category.slug}`}>View Collection</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* All Categories */}
            <section>
                <h2 className="text-2xl font-bold mb-8">All Categories</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Card key={category.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="relative aspect-[3/2]">
                                <Image
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                {category.featured && (
                                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">Featured</div>
                                )}
                            </div>
                            <CardContent className="p-5">
                                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                                <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{category.productCount} products</span>
                                    <Button variant="ghost" size="sm" asChild className="font-medium">
                                        <Link href={`/categories/${category.slug}`} className="flex items-center">
                                            Browse <ChevronRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}

