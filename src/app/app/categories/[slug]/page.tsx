import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample category data
const categories = {
    decorative: {
        id: 1,
        name: "Decorative Candles",
        description: "Beautiful candles to enhance your home decor",
        image: "/placeholder.svg?height=600&width=1200",
    },
    seasonal: {
        id: 2,
        name: "Seasonal Candles",
        description: "Special candles for holidays and celebrations",
        image: "/placeholder.svg?height=600&width=1200",
    },
    scented: {
        id: 3,
        name: "Scented Candles",
        description: "Aromatic candles to create the perfect atmosphere",
        image: "/placeholder.svg?height=600&width=1200",
    },
    pillar: {
        id: 4,
        name: "Pillar Candles",
        description: "Classic pillar candles in various sizes and colors",
        image: "/placeholder.svg?height=600&width=1200",
    },
    taper: {
        id: 5,
        name: "Taper Candles",
        description: "Elegant taper candles for formal dining and special occasions",
        image: "/placeholder.svg?height=600&width=1200",
    },
    jar: {
        id: 6,
        name: "Jar Candles",
        description: "Long-lasting candles in beautiful glass containers",
        image: "/placeholder.svg?height=600&width=1200",
    },
    votive: {
        id: 7,
        name: "Votive Candles",
        description: "Small candles perfect for creating intimate lighting",
        image: "/placeholder.svg?height=600&width=1200",
    },
    figurine: {
        id: 8,
        name: "Figurine Candles",
        description: "Uniquely shaped candles for special gifts and decor",
        image: "/placeholder.svg?height=600&width=1200",
    },
}

// Sample products data
const categoryProducts = {
    decorative: [
        {
            id: 1,
            name: "Рифлена маленька",
            price: 300.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
        {
            id: 2,
            name: "Рифлена велика",
            price: 500.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
        {
            id: 6,
            name: "Яйце",
            price: 51.78,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
    seasonal: [
        {
            id: 3,
            name: "Ялинка маленька фігурна",
            price: 75.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
        {
            id: 4,
            name: "Ялинка маленька",
            price: 75.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
    scented: [
        {
            id: 7,
            name: "Лавандова свічка",
            price: 85.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
        {
            id: 8,
            name: "Ванільна свічка",
            price: 80.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
    pillar: [
        {
            id: 9,
            name: "Класична колона",
            price: 120.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
    taper: [
        {
            id: 5,
            name: "Столова бджолина (червона та зелена)",
            price: 65.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
    jar: [
        {
            id: 10,
            name: "Свічка у склі",
            price: 95.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
    votive: [
        {
            id: 11,
            name: "Маленька вотивна свічка",
            price: 35.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
    figurine: [
        {
            id: 3,
            name: "Ялинка маленька фігурна",
            price: 75.0,
            image: "/placeholder.svg?height=300&width=300",
            status: "active",
        },
    ],
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const slug = params.slug
    const category = categories[slug as keyof typeof categories]
    const products = categoryProducts[slug as keyof typeof categoryProducts] || []

    if (!category) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
                <p className="mb-8">The category you're looking for doesn't exist.</p>
                <Button asChild>
                    <Link href="/app/categories">View All Categories</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/app/categories" className="flex items-center text-sm mb-6 hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Categories
            </Link>

            <div className="relative rounded-lg overflow-hidden mb-8">
                <div className="aspect-[3/1] relative">
                    <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
                        <p className="max-w-2xl">{category.description}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="text-sm text-muted-foreground">Showing {products.length} products</div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search in this category..." className="pl-8 w-full" />
                    </div>
                    <Select defaultValue="featured">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-medium mb-4">No products found</h2>
                    <p className="text-muted-foreground mb-8">There are no products in this category yet.</p>
                    <Button asChild>
                        <Link href="/app/shop">Browse All Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="overflow-hidden group">
                            <div className="relative aspect-square">
                                <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-4">
                                <Link href={`/product/${product.id}`} className="block">
                                    <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
                                    <p className="font-bold">₴{product.price.toFixed(2)}</p>
                                </Link>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button className="w-full">Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

