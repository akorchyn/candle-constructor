import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const material = await prisma.material.findUnique({
            where: { id: parseInt(params.id) },
        })
        if (!material) {
            return NextResponse.json({ error: 'Material not found' }, { status: 404 })
        }
        return NextResponse.json(material)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching material' }, { status: 500 })
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const json = await request.json()
        const material = await prisma.material.update({
            where: { id: parseInt(params.id) },
            data: {
                name: json.name,
                units: json.units,
                pricePerUnit: json.pricePerUnit,
                imageUrl: json.imageUrl,
                categoryId: json.categoryId,
            },
            include: {
                category: true
            }
        })
        return NextResponse.json(material)
    } catch (error) {
        return NextResponse.json({ error: 'Error updating material' }, { status: 500 })
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await prisma.material.delete({
            where: { id: parseInt(params.id) },
        })
        return NextResponse.json({ message: 'Material deleted' })
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting material' }, { status: 500 })
    }
}