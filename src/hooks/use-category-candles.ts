import { useQuery } from '@tanstack/react-query'
import { Candle, CandleImage, CandleCategory } from '@prisma/client'

interface CandleWithImages {
    id: number
    name: string
    price: number
    aromatedPrice: number
    images: Array<{
        url: string
        isPrimary: boolean
    }>
    status: string
}

interface CategoryResponse {
    category: Pick<CandleCategory, 'id' | 'name' | 'description' | 'imageUrl' | 'slug'>
    items: CandleWithImages[]
}

export function useCategoryCandles(slug: string) {
    return useQuery<CategoryResponse>({
        queryKey: ['category-candles', slug],
        queryFn: async () => {
            const response = await fetch(`/api/shop/categories/${slug}/candles`)
            if (!response.ok) {
                throw new Error('Failed to fetch candles')
            }
            return response.json()
        }
    })
} 
