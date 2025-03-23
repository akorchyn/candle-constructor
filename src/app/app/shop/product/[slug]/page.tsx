"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, Heart } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import RelatedProducts from "@/components/related-products"
import { fetchCandleDetails } from "@/lib/user-api"
import { Candle } from "@prisma/client"
import Review from "@/components/review"

export default function ProductPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''

  const [candle, setCandle] = useState<Candle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    const loadCandle = async () => {
      try {
        setLoading(true)
        const data = await fetchCandleDetails(slug)
        setCandle(data);
        setActiveImage(data.images.findIndex((image: { isPrimary: boolean }) => image.isPrimary));
        setError(null)
      } catch (err) {
        console.error("Failed to load candle:", err)
        setError("Failed to load candle details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadCandle()
    }
  }, [slug])

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <p>Loading candle details...</p>
        </div>
      </div>
    )
  }

  if (error || !candle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <p className="text-red-500">{error || "Candle not found"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image
              src={candle.images[activeImage]?.url || "/placeholder.svg"}
              alt={candle.name}
              fill
              className="object-cover"
            />
          </div>
          {/* For now, we'll just show one image since we don't have multiple images in the database */}
          <div className="grid grid-cols-4 gap-2">
            {candle.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative rounded-lg overflow-hidden border cursor-pointer"
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{candle.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-2xl font-bold">₴{Number(candle.price).toFixed(2)}</div>
            </div>
          </div>

          <p className="text-muted-foreground">{candle.description || ""}</p>

          {candle.features && candle.features.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {candle.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 font-medium">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Weight:</span>
              <span>{candle.weight.toString()}g</span>
            </div>
          </div>

          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Опис</TabsTrigger>
              <TabsTrigger value="shipping">Доставка</TabsTrigger>
              <TabsTrigger value="reviews">Відгуки</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p>
                {candle.description || ""}
              </p>
              <p className="mt-4">
                Each candle is made from high-quality wax that ensures a clean, even burn with minimal dripping. The
                natural cotton wick provides a steady flame and enhances the overall burning experience.
              </p>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <p>
                We ship all orders within 1-2 business days. Standard shipping typically takes 3-5 business days, while
                express shipping options are available at checkout for faster delivery.
              </p>
              <p className="mt-4">
                All candles are carefully packaged to ensure they arrive in perfect condition. For orders over ₴50,
                shipping is free within the continental United States.
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              {candle.reviews.length === 0 && (
                <p>Ще немає відгуків</p>
              )}
              <div className="space-y-4">
                {candle.reviews.map((review) => (
                  <Review key={review.id} review={review} user={review.user} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <RelatedProducts slug={candle.slug} />
    </div>
  )
}

