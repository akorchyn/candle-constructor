import { ImageItem } from '@/components/admin/candles/MultiImageLoader';
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const candle = await prisma.candle.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                recipes: {
                    include: {
                        material: true,
                    },
                },
                images: true,
            },
        })
        if (!candle) {
            return NextResponse.json({ error: 'Candle not found' }, { status: 404 })
        }
        return NextResponse.json(candle)
    } catch (error) {
        console.error('Error fetching candle:', error)
        return NextResponse.json({ error: 'Error fetching candle' }, { status: 500 })
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const json = await request.json()

        // First delete existing images
        await prisma.candleImage.deleteMany({
            where: { candleId: parseInt(params.id) }
        })

        const candle = await prisma.candle.update({
            where: { id: parseInt(params.id) },
            data: {
                name: json.name,
                description: json.description,
                price: json.price,
                weight: json.weight,
                status: json.status,
                aromaPercent: json.aromaPercent,
                aromatedPrice: json.aromatedPrice,
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
                slug: json.slug,
                features: json.features || [],
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
        console.error('Error updating candle:', error)
        return NextResponse.json({ error: 'Error updating candle' }, { status: 500 })
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        // First delete all related recipes
        await prisma.candleRecipe.deleteMany({
            where: { candleId: parseInt(params.id) },
        })

        // Then delete the candle
        await prisma.candle.delete({
            where: { id: parseInt(params.id) },
        })
        return NextResponse.json({ message: 'Candle and related recipes deleted' })
    } catch (error) {
        console.error('Error deleting candle:', error)
        return NextResponse.json({ error: 'Error deleting candle' }, { status: 500 })
    }
}
