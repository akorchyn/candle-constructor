import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

const categories = [
    {
        id: 1,
        name: "Decorative Candles",
        description: "Beautiful candles to enhance your home decor",
        image: "/placeholder.svg?height=400&width=600",
        slug: "decorative",
    },
    {
        id: 2,
        name: "Seasonal Candles",
        description: "Special candles for holidays and celebrations",
        image: "/placeholder.svg?height=400&width=600",
        slug: "seasonal",
    },
    {
        id: 3,
        name: "Scented Candles",
        description: "Aromatic candles to create the perfect atmosphere",
        image: "/placeholder.svg?height=400&width=600",
        slug: "scented",
    },
]

export default function CategorySection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((category) => (
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
            </div>
        </section>
    )
}

