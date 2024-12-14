import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({})
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const category = await prisma.category.create({
            data: {
                name: json.name,
                description: json.description,
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 })
    }
}
