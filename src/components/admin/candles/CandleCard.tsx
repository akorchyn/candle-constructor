// src/components/candles/CandleCard.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CandleWithImagesAndRecipes } from "@/app/admin/candles/page"
import { CandleImage } from "@prisma/client"

interface CandleCardProps {
    candle: CandleWithImagesAndRecipes

    onEdit: (id: number) => void
    onDelete: (id: number) => void
    onManageRecipe: (id: number) => void
}

const statusColors = {
    DRAFT: "bg-yellow-100 text-yellow-800",
    ACTIVE: "bg-green-100 text-green-800",
    DISCONTINUED: "bg-gray-100 text-gray-800"
}

const PRICE_MULTIPLIER = 2.5

export function CandleCard({
    candle,
    onEdit,
    onDelete,
    onManageRecipe
}: CandleCardProps) {
    const { id,
        name,
        description,
        price,
        weight,
        aromaPercent,
        aromaPrice,
        aromatedPrice,
        status,
        images,
        recipes } = candle

    const imageUrl = images.find((image: CandleImage) => image.isPrimary)?.url

    const totalCost = recipes.reduce((sum, recipe) => {
        return sum + (Number(recipe.amountUsed) * Number(recipe.material.pricePerUnit))
    }, 0)
    const aromaCost = (Number(aromaPercent) / 100) * Number(weight) * Number(aromaPrice);

    const recommendedPrice = totalCost * PRICE_MULTIPLIER;
    const recommendedPriceWithAroma = (totalCost + aromaCost) * PRICE_MULTIPLIER;

    return (
        <Card className="flex flex-col">
            <div className="relative pt-[100%]">
                <div className="absolute inset-0 bg-gray-100 rounded-t-lg">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover rounded-t-lg"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            No image
                        </div>
                    )}
                    <Badge
                        className={`absolute top-2 right-2 ${statusColors[status]}`}
                        variant="secondary"
                    >
                        {status.toLowerCase()}
                    </Badge>
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium text-lg">{name}</h3>
                {description && (
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                )}

            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                <div className="flex flex-col gap-2 w-full">
                    <div className="space-y-2">
                        {aromaCost > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Aroma Cost:</span>
                                <span className="font-medium">{aromaCost.toFixed(2)}</span>
                            </div>)}
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">{aromaCost > 0 ? 'Other Materials Cost:' : 'Materials Cost:'}</span>
                            <span className="font-medium">{totalCost.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-sm border-t pt-2">
                            <span className="text-gray-500">Price (recommended):</span>
                            <div className="font-medium">
                                <span className={` ${Number(price) < recommendedPrice && Number(price) !== 0 ? 'text-red-500' : ''}`}>{Number(price).toFixed(2)} </span>
                                ({recommendedPrice.toFixed(2)})
                            </div>
                        </div>
                        {aromaCost > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Aromated price:</span>
                                <div className="font-medium">
                                    <span className={` ${Number(aromatedPrice) < recommendedPriceWithAroma ? 'text-red-500' : ''}`}>{Number(aromatedPrice).toFixed(2)} </span>
                                    ({recommendedPriceWithAroma.toFixed(2)})
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-gray-500">Weight: {weight.toNumber()}g</p>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => onManageRecipe(id)}
                    >
                        Manage Recipe ({recipes.length} items)
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => onEdit(id)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 text-red-600 hover:text-red-700"
                            onClick={() => onDelete(id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
