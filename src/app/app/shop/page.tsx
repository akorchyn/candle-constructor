"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchCategories, fetchShopCandles } from "@/lib/user-api"
import { Category } from "@prisma/client"
import { useCategories } from "@/hooks/use-categories"

// Define types
type Candle = {
    id: number
    name: string
    price: number
    imageUrl?: string
    status: string
    slug: string
}

export default function ShopPage() {
    // State for candles and loading
    const [candles, setCandles] = useState<Candle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { data: categories } = useCategories()

    // State for filters
    const [minPrice, setMinPrice] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<string>("")
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("featured")
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])

    // Fetch candles on initial load
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const candlesData = await fetchShopCandles()
                const categoriesData = await fetchCategories()
                setCandles(candlesData)
                setError(null)
            } catch (err) {
                setError("Failed to load candles. Please try again later.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    // Apply filters
    const applyFilters = async () => {
        try {
            setLoading(true)
            const filteredCandles = await fetchShopCandles({
                minPrice: minPrice ? parseFloat(minPrice) : undefined,
                maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
                search: search || undefined,
                categoryIds: selectedCategories.length ? selectedCategories : undefined
            })
            setCandles(filteredCandles)
        } catch (err) {
            setError("Failed to apply filters. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Reset all filters
    const resetFilters = async () => {
        setMinPrice("")
        setMaxPrice("")
        setSearch("")
        setSort("featured")
        setSelectedCategories([])

        try {
            setLoading(true)
            const candlesData = await fetchShopCandles()
            setCandles(candlesData)
        } catch (err) {
            setError("Failed to reset filters. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Sort candles based on selected sort option
    const sortedCandles = [...candles].sort((a, b) => {
        switch (sort) {
            case "newest":
                return 0 // Would need createdAt field
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            default:
                return 0 // Featured - would need a featured field
        }
    })

    // Add category toggle handler
    const toggleCategory = (categoryId: number) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId)
            }
            return [...prev, categoryId]
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Всі свічки</h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Пошук свічок..."
                            className="pl-8 w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <Select value={sort} onValueChange={setSort}>
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <div className="sticky top-4 space-y-6 bg-background p-4 rounded-lg border">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-lg">Фільтри</h3>
                                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={resetFilters}>
                                    Скинути все
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium">Ціновий діапазон</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        type="number"
                                        placeholder="Мін"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="number"
                                        placeholder="Макс"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-medium">Категорії</h3>
                                <div className="space-y-2">
                                    {(categories ?? []).map((category) => (
                                        <div key={category.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`category-${category.id}`}
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => toggleCategory(category.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <label
                                                htmlFor={`category-${category.id}`}
                                                className="ml-2 text-sm font-medium"
                                            >
                                                {category.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button className="w-full" onClick={applyFilters}>Застосувати</Button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p>Завантаження свічок...</p>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : sortedCandles.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <p>Не знайдено свічок за вашими критеріями.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedCandles.map((candle) => (
                                <Card key={candle.id} className="overflow-hidden group">
                                    <div className="relative aspect-square">
                                        <Image
                                            src={candle.imageUrl || "/placeholder.svg?height=300&width=300"}
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
                                        <Button className="w-full">Додати в кошик</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

