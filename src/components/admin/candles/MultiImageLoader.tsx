"use client"

import type React from "react"

import { useState } from "react"
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { X, Link, Upload, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface ImageItem {
    url: string
    isPrimary: boolean
}

interface MultiImageUploadProps {
    value: ImageItem[]
    onChange: (images: ImageItem[]) => void
}

export default function MultiImageUpload({ value = [], onChange }: MultiImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [urlInput, setUrlInput] = useState("")

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!urlInput.trim()) return

        // Add new image from URL
        const newImages = [...value]
        const isPrimary = newImages.length === 0 // First image is primary by default
        newImages.push({ url: urlInput, isPrimary })
        onChange(newImages)
        setUrlInput("")
    }

    const handleUploadComplete = (url: string) => {
        // Add new image from upload
        const newImages = [...value]
        const isPrimary = newImages.length === 0 // First image is primary by default
        newImages.push({ url, isPrimary })
        onChange(newImages)
    }

    const removeImage = (index: number) => {
        const newImages = [...value]
        const wasRemovingPrimary = newImages[index].isPrimary
        newImages.splice(index, 1)

        // If we removed the primary image and there are other images, make the first one primary
        if (wasRemovingPrimary && newImages.length > 0) {
            newImages[0].isPrimary = true
        }

        onChange(newImages)
    }

    const setPrimaryImage = (index: number) => {
        const newImages = [...value]
        // Reset all to non-primary
        newImages.forEach((img) => (img.isPrimary = false))
        // Set the selected one as primary
        newImages[index].isPrimary = true
        onChange(newImages)
    }

    return (
        <div className="space-y-6">
            {/* Image Gallery */}
            {value.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-sm font-medium">Images ({value.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {value.map((image, index) => (
                            <div
                                key={`${image.url}-${index}`}
                                className={cn(
                                    "relative group aspect-square rounded-lg overflow-hidden border-2",
                                    image.isPrimary ? "border-primary ring-2 ring-primary" : "border-border",
                                )}
                            >
                                <img src={image.url || "/placeholder.svg"} alt={`Image ${index + 1}`} className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    {!image.isPrimary && (
                                        <Button
                                            onClick={() => setPrimaryImage(index)}
                                            className="h-8 w-8 p-0 rounded-full"
                                            variant="secondary"
                                            size="sm"
                                            title="Set as primary"
                                        >
                                            <Star className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => removeImage(index)}
                                        className="h-8 w-8 p-0 rounded-full"
                                        variant="destructive"
                                        size="sm"
                                        title="Remove image"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                {image.isPrimary && (
                                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                        <Star className="h-3 w-3 fill-current" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add New Image */}
            <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url">
                        <Link className="h-4 w-4 mr-2" />
                        URL
                    </TabsTrigger>
                    <TabsTrigger value="upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            type="url"
                            placeholder="Enter image URL..."
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={handleUrlSubmit} >Add</Button>
                    </div>
                </TabsContent>
                <TabsContent value="upload">
                    <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg">
                        <UploadButton<OurFileRouter, "imageUploader">
                            endpoint="imageUploader"
                            onUploadBegin={() => setIsUploading(true)}
                            onClientUploadComplete={(res) => {
                                setIsUploading(false)
                                if (res?.[0]?.url) {
                                    handleUploadComplete(res[0].url)
                                }
                            }}
                            onUploadError={(err) => {
                                setIsUploading(false)
                                console.error(err)
                            }}
                        />
                    </div>
                    {isUploading && <div className="text-center text-sm text-muted-foreground mt-2">Uploading...</div>}
                </TabsContent>
            </Tabs>
        </div>
    )
}

