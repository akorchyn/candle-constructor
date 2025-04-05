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
import { CategoryFormData, CategoryFormDialog } from './CategoryFormDialog'

interface Category {
    id: number
    name: string
    description?: string
    materials: number[]
}

const CATEGORY_SEARCH_FIELDS = ['name', 'description'] as (keyof Category)[]

export function MaterialCategoriesSection() {
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
    const [searchResults, setSearchResults] = useState<Category[]>([])
    const queryClient = useQueryClient()

    const { data: categories, isLoading, isError, error } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetch('/api/admin/categories')
            if (!response.ok) throw new Error('Failed to fetch categories')
            return response.json()
        }
    })

    useEffect(() => {
        if (categories) {
            setSearchResults(categories)
        }
    }, [categories])

    const handleSearch = useCallback((results: Category[]) => {
        setSearchResults(results)
    }, [])

    const createMutation = useMutation({
        mutationFn: async (data: CategoryFormData) => {
            const response = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create category')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: CategoryFormData }) => {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update category')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete category')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    const handleCreateSubmit = async (data: CategoryFormData) => {
        await createMutation.mutateAsync(data)
        setIsCreateDialogOpen(false)
    }

    const handleEditSubmit = async (data: CategoryFormData) => {
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
                <h2 className="text-xl font-semibold text-gray-900">Material Categories</h2>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Add Material Category
                </Button>
            </div>

            <div className="mb-6">
                <Search
                    data={categories || []}
                    searchFields={CATEGORY_SEARCH_FIELDS}
                    onFilter={handleSearch}
                    placeholder="Search material categories..."
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
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                                    {category.description && (
                                        <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                                    )}
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

            <CategoryFormDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreateSubmit}
                title="Create Material Category"
            />

            <CategoryFormDialog
                open={!!categoryToEdit}
                onClose={() => setCategoryToEdit(null)}
                onSubmit={handleEditSubmit}
                initialData={categoryToEdit || undefined}
                title="Edit Material Category"
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
