import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        // Extract filter parameters
        const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined
        const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined
        const search = searchParams.get('search')
        const categoryIds = searchParams.get('categoryIds') ? searchParams.get('categoryIds')!.split(',').map(Number) : undefined
        // Build the query
        const where: Prisma.CandleWhereInput = {
            // Only show active candles in the shop
            status: 'ACTIVE',
        }

        // Add price filters if provided
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {}
            if (minPrice !== undefined) where.price.gte = minPrice
            if (maxPrice !== undefined) where.price.lte = maxPrice
        }

        // Add search filter if provided
        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive',
            }
        }

        if (categoryIds) {
            where.category = {
                id: { in: categoryIds },
            }
        }

        // Fetch candles with filters
        const candles = await prisma.candle.findMany({
            where,
            select: {
                id: true,
                name: true,
                description: true,
                images: {
                    where: { isPrimary: true },
                    take: 1,
                    select: {
                        url: true,
                    }
                },
                price: true,
                weight: true,
                slug: true,
            },
            orderBy: [
                { featured: 'desc' },
                { createdAt: 'desc' },
            ]
        })

        // Transform the response to match the expected format
        const transformedCandles = candles.map(candle => ({
            ...candle,
            imageUrl: candle.images[0]?.url || null,
            images: undefined // Remove the images array from response
        }))

        return NextResponse.json(transformedCandles)
    } catch (error) {
        console.error('Error fetching candles:', error)
        return NextResponse.json(
            { error: 'Failed to fetch candles' },
            { status: 500 }
        )
    }
}

