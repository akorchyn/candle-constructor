'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategoryCandles } from "@/hooks/use-category-candles"
import { useParams } from "next/navigation"

export default function CategoryPage() {
    const params = useParams()

    const { data, isLoading, error } = useCategoryCandles(params.slug as string)

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-medium mb-4">Завантаження...</h2>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Категорію не знайдено</h1>
                <p className="mb-8">Категорія, яку ви шукаєте, не існує.</p>
                <Button asChild>
                    <Link href="/app/categories">Переглянути всі категорії</Link>
                </Button>
            </div>
        )
    }

    const { category, items: candles } = data

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/app/categories" className="flex items-center text-sm mb-6 hover:text-primary">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Назад до категорій
            </Link>

            <div className="relative rounded-lg overflow-hidden mb-8">
                <div className="aspect-[3/1] relative">
                    <Image
                        src={category.imageUrl || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
                        <p className="max-w-2xl">{category.description}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="text-sm text-muted-foreground">
                    Показано товарів: {candles.length}
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Пошук у цій категорії..."
                            className="pl-8 w-full"
                        />
                    </div>
                    <Select defaultValue="featured">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Сортувати за" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Рекомендовані</SelectItem>
                            <SelectItem value="newest">Найновіші</SelectItem>
                            <SelectItem value="price-low">Ціна: від низької до високої</SelectItem>
                            <SelectItem value="price-high">Ціна: від високої до низької</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {candles.length === 0 ? (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-medium mb-4">Товарів не знайдено</h2>
                    <p className="text-muted-foreground mb-8">У цій категорії поки немає товарів.</p>
                    <Button asChild>
                        <Link href="/app/shop">Переглянути всі товари</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {candles.map((candle) => {
                        const primaryImage = candle.images.find(img => img.isPrimary) || candle.images[0]
                        return (
                            <Card key={candle.id} className="overflow-hidden group">
                                <div className="relative aspect-square">
                                    <Image
                                        src={primaryImage?.url || "/placeholder.svg"}
                                        alt={candle.name}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <Link href={`/app/shop/product/${candle.slug}`} className="block">
                                        <h3 className="font-medium text-lg mb-2 line-clamp-1">{candle.name}</h3>
                                        <p className="font-bold">₴{Number(candle.price).toFixed(2)}</p>
                                    </Link>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full">Додати в корзину</Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

