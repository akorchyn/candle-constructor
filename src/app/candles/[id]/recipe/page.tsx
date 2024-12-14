// src/app/candles/[id]/recipe/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { RecipeMaterialCard } from '@/components/materials/RecipeMaterialCard'
import { fetchCandle, fetchMaterials, updateCandleRecipe } from '@/lib/api'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from "@/components/ui/separator"

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

export default function RecipePage() {
    const params = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [recipe, setRecipe] = useState<RecipeItem[]>([])

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
                candle.recipes.map(recipe => ({
                    materialId: recipe.materialId,
                    amountUsed: recipe.amountUsed
                }))
            )
        }
    }, [candle])

    const updateMutation = useMutation({
        mutationFn: (data: RecipeItem[]) =>
            updateCandleRecipe(Number(params.id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candle', params.id] })
            router.push('/candles')
        }
    })

    const materialsByCategory = materials?.reduce((acc, material) => {
        if (!acc[material.categoryId]) {
            acc[material.categoryId] = []
        }
        acc[material.categoryId].push(material)
        return acc
    }, {} as Record<number, Material[]>) || {}

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

    if (isLoadingCandle || isLoadingMaterials) {
        return <div className="text-center p-6">Loading...</div>
    }

    if (!candle) {
        return <div className="text-center p-6 text-red-500">Candle not found</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Recipe for {candle.name}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Add materials and specify quantities
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

            <div className="space-y-8">
                {Object.entries(materialsByCategory).map(([categoryId, categoryMaterials]) => (
                    <div key={categoryId}>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            {materials?.find(m => m.categoryId === Number(categoryId))?.category?.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categoryMaterials.map((material) => (
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
