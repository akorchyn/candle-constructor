import { useQuery } from '@tanstack/react-query'
import { fetchFeaturedProducts } from '@/lib/user-api'

export interface FeaturedProduct {
    id: number
    name: string
    price: number
    imageUrl?: string
    slug: string
    status: string
}

export function useFeaturedProducts() {
    return useQuery<FeaturedProduct[]>({
        queryKey: ['featured-products'],
        queryFn: fetchFeaturedProducts
    })
} 
