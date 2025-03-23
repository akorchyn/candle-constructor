import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ slug: string }> }
) {
    const params = await props.params;
    try {
        const candle = await prisma.candle.findUnique({
            where: { slug: params.slug },
            include: {
                images: true,
                reviews: true,
            },
        })
        if (!candle) {
            return NextResponse.json(
                { error: 'Candle not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(candle)
    } catch (error) {
        console.error('Error fetching candle details:', error)
        return NextResponse.json(
            { error: 'Failed to fetch candle details' },
            { status: 500 }
        )
    }
} 
