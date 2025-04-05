'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCategoryCandles } from "@/hooks/use-category-candles"
import { CandleCategory } from "@prisma/client"

export default function CategorySection() {
    const { data: decorativeCategory } = useCategoryCandles('decorative')
    const { data: seasonalCategory } = useCategoryCandles('hand-made')
    const { data: scentedCategory } = useCategoryCandles('scented')

    const categories = [
        decorativeCategory?.category,
        seasonalCategory?.category,
        scentedCategory?.category
    ].filter((category): category is Pick<CandleCategory, 'id' | 'name' | 'description' | 'imageUrl' | 'slug'> =>
        category !== undefined
    )

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Наші категорії</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div key={category.id} className="relative group overflow-hidden rounded-lg">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={category.imageUrl || "/placeholder.svg"}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center">
                                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                                    <p className="mb-4">{category.description}</p>
                                    <Button asChild variant="outline" className="text-white bg-transparent border-white hover:bg-white/20">
                                        <Link href={`/app/categories/${category.slug}`}>Переглянути</Link>
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

