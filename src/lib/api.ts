// src/lib/api.ts
export async function fetchMaterials() {
    const response = await fetch('/api/materials')
    if (!response.ok) throw new Error('Failed to fetch materials')
    return response.json()
}

export async function createMaterial(data: {
    name: string
    units: string
    pricePerUnit: number
    imageUrl?: string
}) {
    const response = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create material')
    return response.json()
}

export async function updateMaterial(id: number, data: {
    name: string
    units: string
    pricePerUnit: number
    imageUrl?: string
}) {
    const response = await fetch(`/api/materials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update material')
    return response.json()
}

export async function deleteMaterial(id: number) {
    const response = await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete material')
    return response.json()
}

export async function fetchCandles() {
    const response = await fetch('/api/candles')
    if (!response.ok) throw new Error('Failed to fetch candles')
    return response.json()
}

export async function createCandle(data: {
    name: string
    description?: string
    imageUrl?: string
    price: number
    weight: number
    status?: 'DRAFT' | 'ACTIVE' | 'DISCONTINUED'
}) {
    const response = await fetch('/api/candles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create candle')
    return response.json()
}

export async function updateCandle(id: number, data: {
    name: string
    description?: string
    imageUrl?: string
    price: number
    weight: number
    status?: 'DRAFT' | 'ACTIVE' | 'DISCONTINUED'
}) {
    const response = await fetch(`/api/candles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update candle')
    return response.json()
}

export async function deleteCandle(id: number) {
    const response = await fetch(`/api/candles/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete candle')
    return response.json()
}

export async function addRecipe(data: {
    candleId: number
    materialId: number
    amountUsed: number
    notes?: string
}) {
    const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to add recipe')
    return response.json()
}

export async function updateRecipe(id: number, data: {
    amountUsed: number
    notes?: string
}) {
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update recipe')
    return response.json()
}

export async function deleteRecipe(id: number) {
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete recipe')
    return response.json()
}

export async function fetchCategories() {
    const response = await fetch('/api/categories')
    if (!response.ok) throw new Error('Failed to fetch categories')
    return response.json()
}

export async function fetchCategory(id: number) {
    const response = await fetch(`/api/categories/${id}`)
    if (!response.ok) throw new Error('Failed to fetch category')
    return response.json()
}

export async function createCategory(data: {
    name: string
    description?: string
}) {
    const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create category')
    return response.json()
}

export async function updateCategory(id: number, data: {
    name: string
    description?: string
}) {
    const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update category')
    return response.json()
}

export async function deleteCategory(id: number) {
    const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete category')
    return response.json()
}

export async function fetchCandle(id: number) {
    const response = await fetch(`/api/candles/${id}`)
    if (!response.ok) throw new Error('Failed to fetch candle')
    return response.json()
}

export async function updateCandleRecipe(candleId: number, recipe: Array<{
    materialId: number
    amountUsed: number
}>) {
    const response = await fetch(`/api/candles/${candleId}/recipe`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe }),
    })
    if (!response.ok) throw new Error('Failed to update recipe')
    return response.json()
}