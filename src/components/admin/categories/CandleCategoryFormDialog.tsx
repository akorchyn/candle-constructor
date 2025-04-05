'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import MultiImageUpload, { ImageItem } from "@/components/admin/candles/MultiImageLoader"
import { slugify } from "@/lib/utils"
import { CombinedImageInput } from '@/components/ui/combined-image-input'

export interface CandleCategoryFormData {
    name: string
    description?: string
    slug: string
    imageUrl?: string
    parentId?: number
    images?: ImageItem[]
}

interface CandleCategoryFormDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: CandleCategoryFormData) => Promise<void>
    initialData?: CandleCategoryFormData
    title: string
}

export function CandleCategoryFormDialog({
    open,
    onClose,
    onSubmit,
    initialData,
    title
}: CandleCategoryFormDialogProps) {
    const [formData, setFormData] = useState<CandleCategoryFormData>({
        name: '',
        description: '',
        slug: '',
        images: []
    })

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
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
        await onSubmit(formData)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description ?? ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Images</Label>
                        <CombinedImageInput
                            value={formData.imageUrl || ''}
                            onChange={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
} 
