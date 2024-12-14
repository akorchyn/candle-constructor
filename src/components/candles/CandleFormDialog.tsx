// src/components/candles/CandleFormDialog.tsx
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CombinedImageInput } from "@/components/ui/combined-image-input"

interface CandleFormData {
    name: string
    description?: string | null
    price: number
    weight: number
    status: 'DRAFT' | 'ACTIVE' | 'DISCONTINUED'
    imageUrl?: string | null
}

interface CandleFormDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: CandleFormData) => Promise<void>
    initialData?: CandleFormData
    title: string
}

export function CandleFormDialog({
    open,
    onClose,
    onSubmit,
    initialData,
    title
}: CandleFormDialogProps) {
    const [formData, setFormData] = useState<CandleFormData>({
        name: '',
        description: '',
        price: 0,
        weight: 0,
        status: 'DRAFT',
        imageUrl: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await onSubmit({
                ...formData,
                price: Number(formData.price),
                weight: Number(formData.weight)
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.valueAsNumber }))}
                                required
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
                                required
                            />
                        </div>
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
