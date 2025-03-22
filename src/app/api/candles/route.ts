import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const aromaPrice = await prisma.material.findFirst({
            where: {
                name: {
                    contains: 'Арома'
                }
            }
        })
        const candles = await prisma.candle.findMany({
            include: {
                recipes: {
                    include: {
                        material: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(candles.map(candle => ({
            ...candle,
            aromaPrice: aromaPrice?.pricePerUnit
        })))
    } catch (error) {
        console.error('Error fetching candles:', error)
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
                aromaPercent: json.aromaPercent,
                aromatedPrice: json.aromatedPrice,
            },
        })
        return NextResponse.json(candle)
    } catch (error) {
        console.error('Error creating candle:', error)
        return NextResponse.json({ error: 'Error creating candle' }, { status: 500 })
    }
}
