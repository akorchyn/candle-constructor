import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const candles = await prisma.candle.findMany({
            include: {
                recipes: {
                    include: {
                        material: true
                    }
                }
            }
        })
        return NextResponse.json(candles)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching candles' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const candle = await prisma.candle.create({
            data: {
                name: json.name,
                description: json.description,
                imageUrl: json.imageUrl,
                price: json.price,
                weight: json.weight,
                status: json.status || 'DRAFT',
            },
        })
        return NextResponse.json(candle)
    } catch (error) {
        return NextResponse.json({ error: 'Error creating candle' }, { status: 500 })
    }
}
