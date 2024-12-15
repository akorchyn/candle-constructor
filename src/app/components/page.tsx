'use client'

import { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { MaterialCard } from '@/components/materials/MaterialCard'
import { MaterialFormDialog } from '@/components/materials/MaterialFormDialog'
import { fetchMaterials, fetchCategories, createMaterial, updateMaterial, deleteMaterial } from '@/lib/api'
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

interface Material {
    id: number
    name: string
    units: string
    pricePerUnit: number
    imageUrl: string | null
    categoryId: number
}

interface Category {
    id: number
    name: string
    description: string | null
}

const MATERIAL_SEARCH_FIELDS = ['name'] as (keyof Material)[]

export default function ComponentsPage() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [materialToEdit, setMaterialToEdit] = useState<Material | null>(null)
    const [materialToDelete, setMaterialToDelete] = useState<Material | null>(null)
    const [searchResults, setSearchResults] = useState<Material[]>([])

    const queryClient = useQueryClient()

    const { data: materials, isLoading: isLoadingMaterials } = useQuery<Material[]>({
        queryKey: ['materials'],
        queryFn: fetchMaterials
    })

    useEffect(() => {
        if (materials) {
            setSearchResults(materials)
        }
    }, [materials])

    const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: fetchCategories
    })

    const createMutation = useMutation({
        mutationFn: createMaterial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['materials'] })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Omit<Material, 'id'> }) =>
            updateMaterial(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['materials'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteMaterial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['materials'] })
        }
    })

    const handleSearch = useCallback((results: Material[]) => {
        setSearchResults(results)
    }, [])

    const materialsByCategory = searchResults?.reduce((acc, material) => {
        const categoryId = material.categoryId
        if (!acc[categoryId]) {
            acc[categoryId] = []
        }
        acc[categoryId].push(material)
        return acc
    }, {} as Record<number, Material[]>) || {}

    const handleCreateSubmit = async (data: Omit<Material, 'id'>) => {
        await createMutation.mutateAsync(data)
    }

    const handleEditSubmit = async (data: Omit<Material, 'id'>) => {
        if (materialToEdit) {
            await updateMutation.mutateAsync({ id: materialToEdit.id, data })
        }
    }

    const handleDeleteConfirm = async () => {
        if (materialToDelete) {
            await deleteMutation.mutateAsync(materialToDelete.id)
            setMaterialToDelete(null)
        }
    }

    if (isLoadingMaterials || isLoadingCategories) {
        return <div className="text-center p-6">Loading...</div>
    }

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Components</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Add Component
                </Button>
            </div>

            <div className="mb-6">
                <Search
                    data={materials || []}
                    searchFields={MATERIAL_SEARCH_FIELDS}
                    onFilter={handleSearch}
                    placeholder="Search components..."
                />
            </div>

            <div className="space-y-8">
                {categories?.map((category) => {
                    const categoryMaterials = materialsByCategory[category.id] || []

                    if (categoryMaterials.length === 0) {
                        return null
                    }

                    return (
                        <div key={category.id} className="space-y-4">
                            <div className="border-b pb-2">
                                <h2 className="text-xl font-medium text-gray-900">
                                    {category.name}
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({categoryMaterials.length} items)
                                    </span>
                                </h2>
                                {category.description && (
                                    <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {categoryMaterials.map((material) => (
                                    <MaterialCard
                                        key={material.id}
                                        {...material}
                                        onEdit={() => setMaterialToEdit(material)}
                                        onDelete={() => setMaterialToDelete(material)}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}

                {Object.keys(materialsByCategory).length === 0 && (
                    <div className="text-center p-6 bg-white rounded-lg shadow">
                        <p className="text-gray-500">No materials found</p>
                    </div>
                )}
            </div>

            <MaterialFormDialog
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreateSubmit}
                title="Add New Component"
            />

            <MaterialFormDialog
                open={!!materialToEdit}
                onClose={() => setMaterialToEdit(null)}
                onSubmit={handleEditSubmit}
                initialData={materialToEdit || undefined}
                title="Edit Component"
            />

            <AlertDialog
                open={!!materialToDelete}
                onOpenChange={() => setMaterialToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the component &quot;{materialToDelete?.name}&quot;.
                            This action cannot be undone.
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
