import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    props: { params: Promise<{ slug: string }> }
) {
    const params = await props.params;
    try {
        // Fetch related products - for example, products with similar price range
        // You might want to adjust this logic based on your needs
        const currentProduct = await prisma.candle.findUnique({
            where: { slug: params.slug },
        });

        if (!currentProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const relatedProducts = await prisma.candle.findMany({
            where: {
                id: { not: currentProduct.id },
                status: "ACTIVE",
                price: {
                    gte: Number(currentProduct.price) * 0.5,
                    lte: Number(currentProduct.price) * 2,
                },
            },
            include: {
                images: true,
            },
            take: 4,
        });

        return NextResponse.json(relatedProducts.map(product => ({
            ...product,
            imageUrl: product.images.find((image: { isPrimary: boolean }) => image.isPrimary)?.url || null,
        })));
    } catch (error) {
        console.error("Failed to fetch related products:", error);
        return NextResponse.json(
            { error: "Failed to fetch related products" },
            { status: 500 }
        );
    }
} 
