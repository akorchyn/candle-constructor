import { useQuery } from '@tanstack/react-query'

interface Category {
    id: number
    name: string
    slug: string
    imageUrl: string
    featured: boolean
    description: string
    productCount: number
}

export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetch('/api/shop/categories')
            if (!response.ok) {
                throw new Error('Failed to fetch categories')
            }
            return response.json()
        }
    })
} 
