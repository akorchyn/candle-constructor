// src/app/candles/[id]/recipe/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { RecipeMaterialCard } from '@/components/materials/RecipeMaterialCard'
import { fetchCandle, fetchMaterials, updateCandleRecipe } from '@/lib/api'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { Search } from '@/components/ui/search'

interface Material {
    id: number
    name: string
    units: string
    pricePerUnit: number
    categoryId: number
    imageUrl?: string | null
}

interface RecipeItem {
    materialId: number
    amountUsed: number
}

const MATERIAL_SEARCH_FIELDS = ['name'] as (keyof Material)[]

export default function RecipePage() {
    const params = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [recipe, setRecipe] = useState<RecipeItem[]>([])
    const [searchResults, setSearchResults] = useState<Material[]>([])

    const { data: candle, isLoading: isLoadingCandle } = useQuery({
        queryKey: ['candle', params.id],
        queryFn: () => fetchCandle(Number(params.id))
    })

    const { data: materials, isLoading: isLoadingMaterials } = useQuery({
        queryKey: ['materials'],
        queryFn: fetchMaterials
    })

    useEffect(() => {
        if (candle?.recipes) {
            setRecipe(
                candle.recipes.map((recipe: RecipeItem) => ({
                    materialId: recipe.materialId,
                    amountUsed: recipe.amountUsed
                }))
            )
        }
    }, [candle])

    useEffect(() => {
        if (materials) {
            setSearchResults(materials)
        }
    }, [materials])

    const updateMutation = useMutation({
        mutationFn: (data: RecipeItem[]) =>
            updateCandleRecipe(Number(params.id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candle', params.id] })
            router.push('/candles')
        }
    })

    const handleAmountChange = (materialId: number, amount: number) => {
        setRecipe(prev => {
            const existing = prev.find(item => item.materialId === materialId)
            if (existing) {
                return prev.map(item =>
                    item.materialId === materialId ? { ...item, amountUsed: amount } : item
                )
            }
            return [...prev, { materialId, amountUsed: amount }]
        })
    }

    const handleSubmit = async () => {
        await updateMutation.mutateAsync(recipe)
    }

    const getAmountForMaterial = (materialId: number) => {
        return recipe.find(item => item.materialId === materialId)?.amountUsed || 0
    }

    const handleSearch = useCallback((results: Material[]) => {
        setSearchResults(results)
    }, [])

    // Split materials into active and inactive
    const activeMaterials = searchResults?.filter((material: Material) =>
        recipe.some(item => item.materialId === material.id && item.amountUsed > 0)
    ) || []

    const inactiveMaterialsByCategory = searchResults?.reduce((acc: Record<number, Material[]>, material: Material) => {
        // Skip if material is active in recipe
        if (recipe.some(item => item.materialId === material.id && item.amountUsed > 0)) {
            return acc
        }

        if (!acc[material.categoryId]) {
            acc[material.categoryId] = []
        }
        acc[material.categoryId].push(material)
        return acc
    }, {} as Record<number, Material[]>) || {}

    if (isLoadingCandle || isLoadingMaterials) {
        return <div className="text-center p-6">Loading...</div>
    }

    if (!candle) {
        return <div className="text-center p-6 text-red-500">Candle not found</div>
    }

    const totalCost = recipe.reduce((sum, item) => {
        const material = materials?.find((m: Material) => m.id === item.materialId)
        return sum + (material?.pricePerUnit || 0) * item.amountUsed
    }, 0)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Recipe for {candle.name}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Total Cost: ${totalCost.toFixed(2)}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={updateMutation.isPending}
                    >
                        {updateMutation.isPending ? 'Saving...' : 'Save Recipe'}
                    </Button>
                </div>
            </div>

            <div className="mb-6">
                <Search
                    data={materials || []}
                    searchFields={MATERIAL_SEARCH_FIELDS}
                    onFilter={handleSearch}
                    placeholder="Search materials..."
                />
            </div>

            {/* Active Materials Section */}
            {activeMaterials.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-900">
                        Current Recipe ({activeMaterials.length} items)
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {activeMaterials.map((material: Material) => (
                            <RecipeMaterialCard
                                key={material.id}
                                {...material}
                                amount={getAmountForMaterial(material.id)}
                                onAmountChange={handleAmountChange}
                            />
                        ))}
                    </div>
                    <Separator className="my-8" />
                </div>
            )}

            {/* Available Materials Section */}
            <div className="space-y-8">
                <h2 className="text-lg font-medium text-gray-900">Available Materials</h2>
                {Object.entries(inactiveMaterialsByCategory).map(([categoryId, categoryMaterials]) => (
                    <div key={categoryId}>
                        <h3 className="text-md font-medium text-gray-700 mb-4">
                            {materials?.find((m: Material) => m.categoryId === Number(categoryId))?.category?.name}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {(categoryMaterials as Material[]).map((material: Material) => (
                                <RecipeMaterialCard
                                    key={material.id}
                                    {...material}
                                    amount={getAmountForMaterial(material.id)}
                                    onAmountChange={handleAmountChange}
                                />
                            ))}
                        </div>
                        <Separator className="my-8" />
                    </div>
                ))}
            </div>
        </div>
    )
}
