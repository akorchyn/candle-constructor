"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const products = [
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
    {
        id: 5,
        name: "Столова бджолина (червона та зелена)",
        price: 65.0,
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
]

export default function FeaturedProducts() {
    const [currentPage, setCurrentPage] = useState(0)
    const productsPerPage = 4
    const totalPages = Math.ceil(products.length / productsPerPage)

    const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages)
    }

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    }

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
                        <Card key={product.id} className="overflow-hidden group">
                            <div className="relative aspect-square">
                                <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                {product.status === "new" && <Badge className="absolute top-2 right-2">New</Badge>}
                            </div>
                            <CardContent className="p-4">
                                <Link href={`/product/${product.id}`} className="block">
                                    <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
                                    <p className="font-bold">${product.price.toFixed(2)}</p>
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

