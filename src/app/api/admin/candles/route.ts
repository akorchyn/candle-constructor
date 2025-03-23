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
                },
                images: true
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
        const json = await request.json();
        const candle = await prisma.candle.create({
            data: {
                name: json.name,
                description: json.description,
                price: json.price,
                weight: json.weight,
                status: json.status || 'DRAFT',
                aromaPercent: json.aromaPercent,
                aromatedPrice: json.aromatedPrice,
                slug: json.slug,
                burnTime: json.burnTime,
                dimensions: json.dimensions,
                color: json.color,
                fragrance: json.fragrance,
                featured: json.featured,
                seasonal: json.seasonal,
                seasonType: json.seasonType,
                metaTitle: json.metaTitle,
                metaDescription: json.metaDescription,
                categoryId: json.categoryId,
                images: {
                    create: json.images.map((image) => ({
                        url: image.url,
                        alt: image.alt || '',
                        isPrimary: image.isPrimary
                    }))
                }
            },
            include: {
                images: true
            }
        })
        return NextResponse.json(candle)
    } catch (error) {
        console.error('Error creating candle:', error)
        return NextResponse.json({ error: 'Error creating candle' }, { status: 500 })
    }
}
