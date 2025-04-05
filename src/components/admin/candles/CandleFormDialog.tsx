// src/components/candles/CandleFormDialog.tsx
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MultiImageUpload, { ImageItem } from "@/components/admin/candles/MultiImageLoader"
import { Switch } from "@/components/ui/switch"
import { slugify } from "@/lib/utils"
import { useCategories } from "@/hooks/use-categories"
import SelectCategory from "@/components/admin/candles/SelectCategory"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CandleWithImagesAndRecipes } from '@/app/admin/candles/page'

export interface CandleFormData {
    name: string
    description?: string | null
    price: number
    aromatedPrice: number
    weight: number
    aromaPercent: number
    status: 'DRAFT' | 'ACTIVE' | 'DISCONTINUED'
    burnTime?: number
    dimensions?: string
    color?: string
    fragrance?: string
    featured: boolean
    seasonal: boolean
    seasonType?: 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'HOLIDAY' | null
    slug: string
    metaTitle?: string
    metaDescription?: string
    categoryId: number
    images: ImageItem[]
    features: string[]
}

interface CandleFormDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: CandleFormData) => Promise<void>
    initialData?: CandleWithImagesAndRecipes
    title: string
}

export function CandleFormDialog({
    open,
    onClose,
    onSubmit,
    initialData,
    title
}: CandleFormDialogProps) {
    const { data: categoriesData } = useCategories()
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState<CandleFormData>({
        name: '',
        description: '',
        price: 0,
        aromatedPrice: 0,
        weight: 0,
        aromaPercent: 4,
        images: [],
        status: 'DRAFT',
        featured: false,
        seasonal: false,
        slug: '',
        features: [],
        categoryId: 0,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const createCategory = useMutation({
        mutationFn: async (name: string) => {
            const response = await fetch('/api/admin/candle-categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    slug: slugify(name),
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to create category')
            }
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                price: Number(initialData.price),
                aromatedPrice: Number(initialData.aromatedPrice),
                weight: Number(initialData.weight),
                aromaPercent: Number(initialData.aromaPercent),
                images: initialData.images,
                status: initialData.status,
                featured: initialData.featured,
                seasonal: initialData.seasonal,
                slug: initialData.slug,
                features: initialData.features,
                categoryId: initialData.categoryId ?? 0,
            })
        }
    }, [initialData])

    useEffect(() => {
        if (formData.name && !initialData) {
            setFormData(prev => ({
                ...prev,
                slug: slugify(formData.name)
            }))
        }
    }, [formData.name, initialData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await onSubmit({
                ...formData,
                images: formData.images.map((image, index) => ({
                    url: image.url,
                    isPrimary: image.isPrimary,
                    alt: `${formData.name} image ${index + 1}`
                }))
            })
            onClose()
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features]
        newFeatures[index] = value
        setFormData(prev => ({ ...prev, features: newFeatures }))
    }

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))
    }

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }))
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <SelectCategory
                            items={
                                categoriesData?.map(cat => ({
                                    value: cat.id.toString(),
                                    label: cat.name,
                                })) || []
                            }
                            value={formData.categoryId?.toString()}
                            onChange={(value) => setFormData(prev => ({
                                ...prev,
                                categoryId: parseInt(value)
                            }))}
                            onCreateNew={async (name) => {
                                try {
                                    const newCategory = await createCategory.mutateAsync(name)
                                    setFormData(prev => ({
                                        ...prev,
                                        categoryId: newCategory.id
                                    }))
                                } catch (error) {
                                    console.error('Failed to create category:', error)
                                }
                            }}
                            placeholder="Select or create a category..."
                        />
                    </div>

                    <div className="space-y-2">
                        <MultiImageUpload
                            value={formData.images}
                            onChange={(images) => setFormData(prev => ({ ...prev, images }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="burnTime">Burn Time (hours)</Label>
                        <Input
                            id="burnTime"
                            type="number"
                            value={formData.burnTime}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                burnTime: e.target.valueAsNumber
                            }))}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="color">Color</Label>
                            <Input
                                id="color"
                                value={formData.color}
                                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fragrance">Fragrance</Label>
                            <Input
                                id="fragrance"
                                value={formData.fragrance}
                                onChange={(e) => setFormData(prev => ({ ...prev, fragrance: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Currently Selling Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.valueAsNumber }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (g)</Label>
                            <Input
                                id="weight"
                                type="number"
                                min="0"
                                value={formData.weight}
                                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.valueAsNumber }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="aromatedPrice">Aromated selling price</Label>
                            <Input
                                id="aromatedPrice"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.aromatedPrice}
                                onChange={(e) => setFormData(prev => ({ ...prev, aromatedPrice: e.target.valueAsNumber }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="aromaPercent">Aroma Percent</Label>
                            <Input
                                id="aromaPercent"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={formData.aromaPercent}
                                onChange={(e) => setFormData(prev => ({ ...prev, aromaPercent: e.target.valueAsNumber }))}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={formData.featured}
                                onCheckedChange={(checked) => setFormData(prev => ({
                                    ...prev,
                                    featured: checked
                                }))}
                            />
                            <Label>Featured Product</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={formData.seasonal}
                                onCheckedChange={(checked) => setFormData(prev => ({
                                    ...prev,
                                    seasonal: checked
                                }))}
                            />
                            <Label>Seasonal Product</Label>
                        </div>
                    </div>

                    {formData.seasonal && (
                        <div className="space-y-2">
                            <Label htmlFor="seasonType">Season</Label>
                            <Select
                                value={formData.seasonType || ''}
                                onValueChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    seasonType: value as typeof formData.seasonType
                                }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select season" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SPRING">Spring</SelectItem>
                                    <SelectItem value="SUMMER">Summer</SelectItem>
                                    <SelectItem value="AUTUMN">Autumn</SelectItem>
                                    <SelectItem value="WINTER">Winter</SelectItem>
                                    <SelectItem value="HOLIDAY">Holiday</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Features</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addFeature}
                            >
                                Add Feature
                            </Button>
                        </div>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    placeholder="Enter feature..."
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeFeature(index)}
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input
                            id="metaTitle"
                            value={formData.metaTitle}
                            onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="metaDescription">Meta Description</Label>
                        <Textarea
                            id="metaDescription"
                            value={formData.metaDescription}
                            onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: 'DRAFT' | 'ACTIVE' | 'DISCONTINUED') =>
                                setFormData(prev => ({ ...prev, status: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="DISCONTINUED">Discontinued</SelectItem>
                            </SelectContent>
                        </Select>
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
        </Dialog>
    )
}
