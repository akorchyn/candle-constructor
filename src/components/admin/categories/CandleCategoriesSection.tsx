'use client'

import { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Search } from '@/components/ui/search'
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
import { CandleCategoryFormDialog, CandleCategoryFormData } from './CandleCategoryFormDialog'
import { ImageItem } from '@/components/admin/candles/MultiImageLoader'
import Image from 'next/image'

interface CandleCategory {
    id: number
    name: string
    description?: string
    slug: string
    imageUrl?: string
    parentId?: number
    images?: ImageItem[]
}

const CANDLE_CATEGORY_SEARCH_FIELDS = ['name', 'description'] as (keyof CandleCategory)[]

export function CandleCategoriesSection() {
    const [categoryToDelete, setCategoryToDelete] = useState<CandleCategory | null>(null)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [categoryToEdit, setCategoryToEdit] = useState<CandleCategory | null>(null)
    const [searchResults, setSearchResults] = useState<CandleCategory[]>([])
    const queryClient = useQueryClient()

    const { data: categories, isLoading, isError, error } = useQuery<CandleCategory[]>({
        queryKey: ['candle-categories'],
        queryFn: async () => {
            const response = await fetch('/api/admin/candle-categories')
            if (!response.ok) throw new Error('Failed to fetch categories')
            return response.json()
        }
    })

    useEffect(() => {
        if (categories) {
            setSearchResults(categories)
        }
    }, [categories])

    const handleSearch = useCallback((results: CandleCategory[]) => {
        setSearchResults(results)
    }, [])

    const createMutation = useMutation({
        mutationFn: async (data: CandleCategoryFormData) => {
            const response = await fetch('/api/admin/candle-categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create category')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candle-categories'] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: CandleCategoryFormData }) => {
            const response = await fetch(`/api/admin/candle-categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update category')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candle-categories'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/api/admin/candle-categories/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete category')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candle-categories'] })
        }
    })

    const handleCreateSubmit = async (data: CandleCategoryFormData) => {
        await createMutation.mutateAsync(data)
        setIsCreateDialogOpen(false)
    }

    const handleEditSubmit = async (data: CandleCategoryFormData) => {
        if (categoryToEdit) {
            await updateMutation.mutateAsync({ id: categoryToEdit.id, data })
            setCategoryToEdit(null)
        }
    }

    const handleDeleteConfirm = async () => {
        if (categoryToDelete) {
            await deleteMutation.mutateAsync(categoryToDelete.id)
            setCategoryToDelete(null)
        }
    }

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Product Categories</h2>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Add Product Category
                </Button>
            </div>

            <div className="mb-6">
                <Search
                    data={categories || []}
                    searchFields={CANDLE_CATEGORY_SEARCH_FIELDS}
                    onFilter={handleSearch}
                    placeholder="Search product categories..."
                />
            </div>

            <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {isLoading ? (
                    <div className="p-6 text-center">Loading...</div>
                ) : isError ? (
                    <div className="p-6 text-center text-red-500">
                        {error instanceof Error ? error.message : 'Error loading categories'}
                    </div>
                ) : !searchResults?.length ? (
                    <div className="p-6 text-center text-gray-500">No categories found</div>
                ) : (
                    <div className='space-y-2 w-full'>
                        {searchResults.map((category) => (
                            <div key={category.id} className="p-6 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                                        {category.imageUrl ? (
                                            <Image
                                                src={category.imageUrl}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                                        {category.description && (
                                            <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCategoryToEdit(category)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setCategoryToDelete(category)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <CandleCategoryFormDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreateSubmit}
                title="Create Product Category"
            />

            <CandleCategoryFormDialog
                open={!!categoryToEdit}
                onClose={() => setCategoryToEdit(null)}
                onSubmit={handleEditSubmit}
                initialData={categoryToEdit || undefined}
                title="Edit Product Category"
            />

            <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the category &quot;{categoryToDelete?.name}&quot;
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
