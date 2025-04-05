'use client'

import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { CandleCard } from '@/components/admin/candles/CandleCard'
import { CandleFormData, CandleFormDialog } from '@/components/admin/candles/CandleFormDialog'
import { fetchCandles, createCandle, updateCandle, deleteCandle } from '@/lib/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { Search } from '@/components/ui/search'
import { Material, Review, User, type Candle, type CandleImage, type CandleRecipe } from '@prisma/client'

const CANDLE_SEARCH_FIELDS = ['name', 'description'] as (keyof Candle)[]

export type RecipeWithMaterial = CandleRecipe & {
    material: Material
}

export type ReviewWithUser = Review & {
    user: User
}

export type CandleWithImagesAndRecipes = Candle & {
    images: CandleImage[]
    recipes: RecipeWithMaterial[]
    reviews?: ReviewWithUser[]
    aromaPrice: number
}

export default function CandlesPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('all')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [candleToEdit, setCandleToEdit] = useState<CandleWithImagesAndRecipes | null>(null)
    const [candleToDelete, setCandleToDelete] = useState<CandleWithImagesAndRecipes | null>(null)
    const [searchResults, setSearchResults] = useState<CandleWithImagesAndRecipes[]>([])

    const queryClient = useQueryClient()

    const { data: candles, isLoading } = useQuery<CandleWithImagesAndRecipes[]>({
        queryKey: ['candles'],
        queryFn: fetchCandles
    })

    const createMutation = useMutation({
        mutationFn: createCandle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candles'] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: CandleFormData }) =>
            updateCandle(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candles'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteCandle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candles'] })
        }
    })

    const filteredCandles = searchResults.filter(candle => {
        if (activeTab === 'all') return true
        return candle.status.toLowerCase() === activeTab
    })

    const handleCreateSubmit = async (data: CandleFormData) => {
        await createMutation.mutateAsync(data)
        setIsCreateDialogOpen(false)
    }

    const handleEditSubmit = async (data: CandleFormData) => {
        if (candleToEdit) {
            await updateMutation.mutateAsync({ id: candleToEdit.id, data })
            setCandleToEdit(null)
        }
    }

    const handleDeleteConfirm = async () => {
        if (candleToDelete) {
            await deleteMutation.mutateAsync(candleToDelete.id)
            setCandleToDelete(null)
        }
    }

    const handleManageRecipe = (id: number) => {
        router.push(`/admin/candles/${id}/recipe`)
    }

    const handleSearch = useCallback((results: CandleWithImagesAndRecipes[]) => {
        setSearchResults(results)
    }, [])

    if (isLoading) {
        return <div className="text-center p-6">Loading...</div>
    }

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Candles</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Add Candle
                </Button>
            </div>

            <div className="mb-6">
                <Search
                    data={candles || []}
                    searchFields={CANDLE_SEARCH_FIELDS}
                    onFilter={handleSearch}
                    placeholder="Search candles..."
                />
            </div>

            <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                    <TabsTrigger value="all" onClick={() => setActiveTab('all')}>
                        All ({candles?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="active" onClick={() => setActiveTab('active')}>
                        Active ({candles?.filter(c => c.status === 'ACTIVE').length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="draft" onClick={() => setActiveTab('draft')}>
                        Draft ({candles?.filter(c => c.status === 'DRAFT').length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="discontinued" onClick={() => setActiveTab('discontinued')}>
                        Discontinued ({candles?.filter(c => c.status === 'DISCONTINUED').length || 0})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    {!filteredCandles?.length ? (
                        <div className="text-center p-6 bg-white rounded-lg shadow">
                            <p className="text-gray-500">No candles found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredCandles.map((candle) => (
                                <CandleCard
                                    key={candle.id}
                                    candle={candle}
                                    onEdit={() => setCandleToEdit(candle)}
                                    onDelete={() => setCandleToDelete(candle)}
                                    onManageRecipe={handleManageRecipe}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <CandleFormDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreateSubmit}
                title="Add New Candle"
            />

            <CandleFormDialog
                open={!!candleToEdit}
                onClose={() => setCandleToEdit(null)}
                onSubmit={handleEditSubmit}
                initialData={candleToEdit || undefined}
                title="Edit Candle"
            />

            <AlertDialog
                open={!!candleToDelete}
                onOpenChange={() => setCandleToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the candle &quot;{candleToDelete?.name}&quot;.
                            {candleToDelete?.recipes.length && candleToDelete?.recipes.length > 0 && (
                                <>
                                    <br /><br />
                                    <strong className="text-red-600">
                                        Warning: This candle has an existing recipe that will also be deleted.
                                    </strong>
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
