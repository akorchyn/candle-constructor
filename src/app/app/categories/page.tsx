"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCategories } from "@/hooks/use-categories"
import { Category } from "@/types"

export default function CategoriesPage() {
    const { data: categories = [], isLoading } = useCategories()

    // Separate featured categories
    if (isLoading) {
        return <div>Завантаження...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Перегляньте наші категорії свічок</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Дослідіть наш широкий асортимент свічок ручної роботи, організованих за категоріями, щоб допомогти вам знайти саме те, що ви шукаєте.
                </p>
            </div>

            {/* All Categories */}
            <section>
                <h2 className="text-2xl font-bold mb-8">Всі категорії</h2>
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
                                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">Рекомендовані</div>
                                )}
                            </div>
                            <CardContent className="p-5">
                                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                                <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{category.productCount} товарів</span>
                                    <Button variant="ghost" size="sm" asChild className="font-medium">
                                        <Link href={`/app/categories/${category.slug}`} className="flex items-center">
                                            Переглянути <ChevronRight className="ml-1 h-4 w-4" />
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

