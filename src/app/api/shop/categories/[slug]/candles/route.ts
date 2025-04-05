import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
    request: Request,
    props: { params: Promise<{ slug: string }> }
) {
    const params = await props.params;

    try {
        const category = await prisma.candleCategory.findUnique({
            where: { slug: params.slug },
            select: {
                id: true,
                name: true,
                description: true,
                imageUrl: true,
                slug: true,
            }
        })

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }

        const candles = await prisma.candle.findMany({
            where: {
                categoryId: category.id,
                status: 'ACTIVE',
            },
            include: {
                images: {
                    select: {
                        url: true,
                        isPrimary: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({
            category,
            items: candles
        })
    } catch (error) {
        console.error('Error fetching candles:', error)
        return NextResponse.json(
            { error: 'Failed to fetch candles' },
            { status: 500 }
        )
    }
} 
