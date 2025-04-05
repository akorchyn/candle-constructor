// src/app/categories/page.tsx
'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialCategoriesSection } from '@/components/admin/categories/MaterialCategoriesSection'
import { CandleCategoriesSection } from '@/components/admin/categories/CandleCategoriesSection'

export default function CategoriesPage() {

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
            </div>

            <Tabs defaultValue="materials" className="w-full">
                <TabsList>
                    <TabsTrigger value="materials">Material Categories</TabsTrigger>
                    <TabsTrigger value="products">Product Categories</TabsTrigger>
                </TabsList>

                <TabsContent value="materials">
                    <MaterialCategoriesSection />
                </TabsContent>

                <TabsContent value="products">
                    <CandleCategoriesSection />
                </TabsContent>
            </Tabs>
        </div>
    )
}
