import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const category = await prisma.candleCategory.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                candles: true
            }
        })
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }
        return NextResponse.json(category)
    } catch (error) {
        console.error('Error fetching category:', error)
        return NextResponse.json({ error: 'Error fetching category' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const data = await request.json()
        const category = await prisma.candleCategory.update({
            where: { id: parseInt(params.id) },
            data: {
                name: data.name,
                description: data.description,
                slug: data.slug,
                imageUrl: data.imageUrl,
                parentId: data.parentId,
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.error('Error updating category:', error)
        return NextResponse.json({ error: 'Error updating category' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        // Check if category has any candles
        const category = await prisma.candleCategory.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                candles: true
            }
        })

        if (category?.candles.length) {
            return NextResponse.json(
                { error: 'Cannot delete category with existing candles' },
                { status: 400 }
            )
        }

        await prisma.candleCategory.delete({
            where: { id: parseInt(params.id) },
        })
        return NextResponse.json({ message: 'Category deleted' })
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json({ error: 'Error deleting category' }, { status: 500 })
    }
} 
