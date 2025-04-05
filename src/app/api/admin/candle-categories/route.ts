import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const categories = await prisma.candleCategory.findMany({
            orderBy: { name: 'asc' }
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const category = await prisma.candleCategory.create({
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
        console.error('Failed to create category:', error)
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        )
    }
}
