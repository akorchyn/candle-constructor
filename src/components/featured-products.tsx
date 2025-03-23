"use client"

import { useFeaturedProducts } from "@/hooks/use-featured-products"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"


export default function FeaturedProducts() {
    const { data: products, isLoading, error } = useFeaturedProducts()
    const [currentPage, setCurrentPage] = useState(0)
    const [productsPerPage, setProductsPerPage] = useState(4)

    // Add window resize handler
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setProductsPerPage(window.innerWidth < 640 ? 1 : 4)
            }
        }

        // Set initial value
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages)
    }

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    }

    if (isLoading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                    <div className="flex justify-center">
                        <p>Loading featured products...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return null // Hide section on error
    }

    if (!products?.length) {
        return null // Hide section if no featured products
    }

    const totalPages = Math.ceil((products?.length || 0) / productsPerPage)

    const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={prevPage} disabled={products.length <= productsPerPage}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={nextPage} disabled={products.length <= productsPerPage}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedProducts.map((product) => (
                        <Card key={product.slug} className="overflow-hidden group">
                            <div className="relative aspect-square">
                                <Image
                                    src={product.imageUrl || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                {product.status === "new" && <Badge className="absolute top-2 right-2">New</Badge>}
                            </div>
                            <CardContent className="p-4">
                                <Link href={`/app/shop/product/${product.slug}`} className="block">
                                    <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
                                    <p className="font-bold">${Number(product.price).toFixed(2)}</p>
                                </Link>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button className="w-full">Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

