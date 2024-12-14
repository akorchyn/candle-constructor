import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const json = await request.json()
        const recipe = await prisma.candleRecipe.update({
            where: { id: parseInt(params.id) },
            data: {
                amountUsed: json.amountUsed,
                notes: json.notes,
            },
            include: {
                material: true,
            },
        })
        return NextResponse.json(recipe)
    } catch (error) {
        return NextResponse.json({ error: 'Error updating recipe' }, { status: 500 })
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await prisma.candleRecipe.delete({
            where: { id: parseInt(params.id) },
        })
        return NextResponse.json({ message: 'Recipe deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting recipe' }, { status: 500 })
    }
}
