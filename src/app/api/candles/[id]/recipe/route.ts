import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const candleId = parseInt(params.id)
        const { recipe } = await request.json()

        // First, delete existing recipes
        await prisma.candleRecipe.deleteMany({
            where: {
                candleId: candleId
            }
        })

        // Then create new recipes
        await prisma.candle.update({
            where: {
                id: candleId
            },
            data: {
                recipes: {
                    create: recipe.map((item: { materialId: number, amountUsed: number }) => ({
                        materialId: item.materialId,
                        amountUsed: item.amountUsed
                    }))
                }
            }
        })

        // Fetch the updated candle with its recipes
        const updatedCandle = await prisma.candle.findUnique({
            where: {
                id: candleId
            },
            include: {
                recipes: {
                    include: {
                        material: true
                    }
                }
            }
        })

        return NextResponse.json(updatedCandle)
    } catch (error) {
        console.error('Error updating recipe:', error)
        return NextResponse.json(
            { error: 'Error updating recipe' },
            { status: 500 }
        )
    }
}

// Also update the GET handler in src/app/api/candles/[id]/route.ts to include recipes
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const candle = await prisma.candle.findUnique({
            where: {
                id: parseInt(params.id)
            },
            include: {
                recipes: {
                    include: {
                        material: true
                    }
                }
            }
        })

        if (!candle) {
            return NextResponse.json(
                { error: 'Candle not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(candle)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching candle' },
            { status: 500 }
        )
    }
}
