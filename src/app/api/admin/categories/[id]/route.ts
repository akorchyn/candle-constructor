import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                materials: true
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

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const json = await request.json()
        const category = await prisma.category.update({
            where: { id: parseInt(params.id) },
            data: {
                name: json.name,
                description: json.description,
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.error('Error updating category:', error)
        return NextResponse.json({ error: 'Error updating category' }, { status: 500 })
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        // Check if category has any materials
        const category = await prisma.category.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                materials: true
            }
        })

        if (category?.materials.length) {
            return NextResponse.json(
                { error: 'Cannot delete category with existing materials' },
                { status: 400 }
            )
        }

        await prisma.category.delete({
            where: { id: parseInt(params.id) },
        })
        return NextResponse.json({ message: 'Category deleted' })
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json({ error: 'Error deleting category' }, { status: 500 })
    }
}
