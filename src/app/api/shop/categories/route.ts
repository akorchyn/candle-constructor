import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const categories = await prisma.candleCategory.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: {
                        candles: true
                    }
                }
            }
        })

        const categoriesWithCandlesCount = categories.map(category => ({
            ...category,
            productCount: category._count.candles
        }))

        return NextResponse.json(categoriesWithCandlesCount)
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
} 
