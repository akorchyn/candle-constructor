// src/components/materials/MaterialFormDialog.tsx
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CombinedImageInput } from "@/components/ui/combined-image-input"
import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '@/lib/api'

interface MaterialFormData {
    name: string
    units: string
    pricePerUnit: number
    imageUrl?: string | null
    categoryId: number
    purchaseUrl?: string | null
}

interface MaterialFormDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: MaterialFormData) => Promise<void>
    initialData?: MaterialFormData
    title: string
}

export function MaterialFormDialog({
    open,
    onClose,
    onSubmit,
    initialData,
    title
}: MaterialFormDialogProps) {
    const [formData, setFormData] = useState<MaterialFormData>({
        name: '',
        units: '',
        pricePerUnit: 0,
        imageUrl: '',
        categoryId: 0,
        purchaseUrl: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            if (categories && categories.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    categoryId: categories[0].id
                }))
            }
        }
    }, [initialData, categories])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await onSubmit({
                ...formData,
                pricePerUnit: Number(formData.pricePerUnit)
            })
            onClose()
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Image</Label>
                        <CombinedImageInput
                            value={formData.imageUrl || ""}
                            onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={String(formData.categoryId)}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: Number(value) }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories?.map((category: { id: number; name: string }) => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="units">Units</Label>
                        <Input
                            id="units"
                            value={formData.units}
                            onChange={(e) => setFormData(prev => ({ ...prev, units: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pricePerUnit">Price per unit</Label>
                        <Input
                            id="pricePerUnit"
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.pricePerUnit}
                            onChange={(e) => setFormData(prev => ({ ...prev, pricePerUnit: e.target.valueAsNumber }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="purchaseUrl">Purchase URL</Label>
                        <Input
                            id="purchaseUrl"
                            value={formData.purchaseUrl || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, purchaseUrl: e.target.value == '' ? null : e.target.value }))}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}
