import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const materials = await prisma.material.findMany({
            include: {
                category: true
            }
        })
        return NextResponse.json(materials)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching materials' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const material = await prisma.material.create({
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
        return NextResponse.json({ error: 'Error creating material' }, { status: 500 })
    }
}
