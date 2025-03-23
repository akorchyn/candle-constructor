import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { fetchRelatedProducts } from "@/lib/user-api"

interface RelatedProductsProps {
    slug: string;
}

interface RelatedProduct {
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
}

export default function RelatedProducts({ slug }: RelatedProductsProps) {
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadRelatedProducts() {
            try {
                const products = await fetchRelatedProducts(slug);
                setRelatedProducts(products);
            } catch (error) {
                console.error('Failed to load related products:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadRelatedProducts();
    }, [slug]);

    if (isLoading || relatedProducts.length === 0) return null;

    return (
        <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                    <Card key={product.slug} className="overflow-hidden group">
                        <div className="relative aspect-square">
                            <Image
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <CardContent className="p-4">
                            <Link href={`/app/shop/product/${product.slug}`} className="block">
                                <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
                                <p className="font-bold">${Number(product.price).toFixed(2)}</p>
                            </Link>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full">Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    )
}

