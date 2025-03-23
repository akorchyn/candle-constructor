import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const featuredCandles = await prisma.candle.findMany({
            where: {
                featured: true,
                status: 'ACTIVE', // Only show active candles
            },
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
                slug: true,
                status: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 6, // Limit to 6 featured products
        })

        // Transform the response to match the expected format
        const transformedCandles = featuredCandles.map(candle => ({
            ...candle,
            imageUrl: candle.images[0]?.url || null,
            images: undefined // Remove the images array from response
        }))

        return NextResponse.json(transformedCandles)
    } catch (error) {
        console.error('Error fetching featured candles:', error)
        return NextResponse.json(
            { error: 'Failed to fetch featured candles' },
            { status: 500 }
        )
    }
} 
