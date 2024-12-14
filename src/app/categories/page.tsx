// src/app/categories/page.tsx
'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api'
import { CategoryFormDialog } from '@/components/categories/CategoryFormDialog'
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

interface Category {
    id: number
    name: string
    description: string | null
    materials: number[]
}

interface CategoryFormData {
    name: string
    description?: string | null
}

export default function CategoriesPage() {
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
    const queryClient = useQueryClient()

    const { data: categories, isLoading, isError, error } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories
    })

    const createMutation = useMutation({
        mutationFn: (data: CategoryFormData) => createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: CategoryFormData }) =>
            updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteCategory(id),
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
                <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Add Category
                </Button>
            </div>

            <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {isLoading ? (
                    <div className="p-6 text-center">Loading...</div>
                ) : isError ? (
                    <div className="p-6 text-center text-red-500">
                        {error instanceof Error ? error.message : 'Error loading categories'}
                    </div>
                ) : !categories?.length ? (
                    <div className="p-6 text-center text-gray-500">No categories found</div>
                ) : (
                    <div className='space-y-2 w-full'>
                        {categories.map((category) => (
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
                title="Create Category"
            />

            <CategoryFormDialog
                open={!!categoryToEdit}
                onClose={() => setCategoryToEdit(null)}
                onSubmit={handleEditSubmit}
                initialData={categoryToEdit || undefined}
                title="Edit Category"
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
