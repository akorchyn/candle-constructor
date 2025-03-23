import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const category = await prisma.candleCategory.create({
            data: {
                name: data.name,
                slug: data.slug,
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
