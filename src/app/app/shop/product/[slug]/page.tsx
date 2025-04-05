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
import Review from "@/components/review"
import { CandleWithImagesAndRecipes } from "@/app/admin/candles/page"

export default function ProductPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''

  const [candle, setCandle] = useState<CandleWithImagesAndRecipes | null>(null)
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
                  alt={`${candle.name} image ${index + 1}`}
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
              <h3 className="font-medium">Особливості:</h3>
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
                Додати в корзину
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" /> Додати до списку бажань
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Вага:</span>
              <span>{candle.weight.toString()}г</span>
            </div>
          </div>

          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Опис</TabsTrigger>
              <TabsTrigger value="shipping">Доставка</TabsTrigger>
              <TabsTrigger value="reviews">Відгуки</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              {candle.description && candle.description.length > 0 && <p className="mb-4">
                {candle.description}
              </p>}
              <p>
                {"Кожна свічка зроблена з високоякісного віску, що гарантує безпечне горіння.\n"}
                {"Дерев'яний та бавовняний гніт забеспучує рівномірне горіння, а дерев'яний гніт ще й надає свічці атмосферні звуки потріскування."}
              </p>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <p>
                Ми відправляємо всі замовлення протягом 1-2 днів. Ми користуємось послугами Нової Пошти для доставки замовлень по Україні.
              </p>
              <p className="mt-4">
                Всі свічки акуратно упаковуються, що гарантує їх прибуття в ідеальному стані.
              </p>
              <p className="mt-4">
                При оплаті замовлення наложеним платежем, береться передоплата в розмірі 150 грн, яка не повертається у випадку відмови від замовлення.
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              {candle.reviews?.length === 0 && (
                <p>Ще немає відгуків</p>
              )}
              <div className="space-y-4">
                {candle.reviews?.map((review) => (
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

