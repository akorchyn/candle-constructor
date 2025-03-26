"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchShopCandles } from "@/lib/user-api"
import { useCategories } from "@/hooks/use-categories"

// Define types
type Candle = {
    id: number
    name: string
    price: number
    imageUrl?: string
    status: string
    slug: string
    featured: boolean
    createdAt: number
}

function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // State for candles and loading
    const [candles, setCandles] = useState<Candle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { data: categories } = useCategories()

    // Initialize state from URL parameters
    const [minPrice, setMinPrice] = useState<string>(searchParams.get("minPrice") || "")
    const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("maxPrice") || "")
    const [search, setSearch] = useState(searchParams.get("search") || "")
    const [sort, setSort] = useState(searchParams.get("sort") || "featured")
    const [selectedCategories, setSelectedCategories] = useState<number[]>(
        searchParams.get("categories") ? searchParams.get("categories")!.split(",").map(Number) : []
    )

    // Update URL with current filters
    const updateUrlParams = (params: Record<string, string | null>) => {
        const url = new URL(window.location.href)
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value)
            } else {
                url.searchParams.delete(key)
            }
        })
        router.push(url.pathname + url.search)
    }

    // Fetch candles on initial load and when URL params change
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const candlesData = await fetchShopCandles({
                    minPrice: minPrice ? parseFloat(minPrice) : undefined,
                    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
                    search: search || undefined,
                    categoryIds: selectedCategories.length ? selectedCategories : undefined
                })
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
    }, [searchParams])

    // Apply filters
    const applyFilters = () => {
        updateUrlParams({
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            search: search || null,
            sort,
            categories: selectedCategories.length ? selectedCategories.join(",") : null
        })
    }

    // Reset all filters
    const resetFilters = () => {
        setMinPrice("")
        setMaxPrice("")
        setSearch("")
        setSort("featured")
        setSelectedCategories([])
        router.push(window.location.pathname)
    }

    // Sort candles based on selected sort option
    const sortedCandles = [...candles].sort((a, b) => {
        switch (sort) {
            case "featured":
                return a.featured ? -1 : 1
            case "newest":
                return a.createdAt - b.createdAt
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            default:
                return 0 // Featured - would need a featured field
        }
    })

    // Update sort and URL
    const handleSortChange = (value: string) => {
        setSort(value)
        updateUrlParams({ ...Object.fromEntries(searchParams.entries()), sort: value })
    }

    // Add category toggle handler
    const toggleCategory = (categoryId: number) => {
        setSelectedCategories(prev => {
            const newCategories = prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]

            updateUrlParams({
                ...Object.fromEntries(searchParams.entries()),
                categories: newCategories.length ? newCategories.join(",") : null
            })

            return newCategories
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
                            onChange={(e) => {
                                setSearch(e.target.value)
                                if (!e.target.value) {
                                    updateUrlParams({
                                        ...Object.fromEntries(searchParams.entries()),
                                        search: null
                                    })
                                }
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <Select value={sort} onValueChange={handleSortChange}>
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
                    <div className="sticky top-24 space-y-6 bg-background p-4 rounded-lg border">
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
                                        onChange={(e) => {
                                            setMinPrice(e.target.value)
                                            if (!e.target.value) {
                                                updateUrlParams({
                                                    ...Object.fromEntries(searchParams.entries()),
                                                    minPrice: null
                                                })
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="number"
                                        placeholder="Макс"
                                        value={maxPrice}
                                        onChange={(e) => {
                                            setMaxPrice(e.target.value)
                                            if (!e.target.value) {
                                                updateUrlParams({
                                                    ...Object.fromEntries(searchParams.entries()),
                                                    maxPrice: null
                                                })
                                            }
                                        }}
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
                                <Card key={candle.id} className="overflow-hidden group" >
                                    <Link href={`/app/shop/product/${candle.slug}`} className="block">

                                        <div className="relative aspect-square">
                                            <Image
                                                src={candle.imageUrl || "/placeholder.svg?height=300&width=300"}
                                                alt={candle.name}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-medium text-lg mb-2 line-clamp-1">{candle.name}</h3>
                                            <p className="font-bold">₴{Number(candle.price).toFixed(2)}</p>
                                        </CardContent>
                                    </Link>
                                    <CardFooter className="p-4 pt-0">
                                        <Button className="w-full">Додати в корзину</Button>
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

export default function ShopPage() {
    return (
        <Suspense>
            <Page />
        </Suspense>
    )
}
