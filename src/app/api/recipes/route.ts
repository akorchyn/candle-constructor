import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const recipe = await prisma.candleRecipe.create({
            data: {
                candleId: json.candleId,
                materialId: json.materialId,
                amountUsed: json.amountUsed,
                notes: json.notes,
            },
            include: {
                material: true,
            },
        })
        return NextResponse.json(recipe)
    } catch (error) {
        console.error('Error creating recipe:', error)
        return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 })
    }
}
