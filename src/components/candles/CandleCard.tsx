// src/components/candles/CandleCard.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Recipe {
    materialId: number
    amountUsed: number
    material: {
        pricePerUnit: number
    }
}

interface CandleCardProps {
    id: number
    name: string
    description?: string
    price: number
    weight: number
    status: 'DRAFT' | 'ACTIVE' | 'DISCONTINUED'
    imageUrl?: string | null
    recipes: Recipe[]
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
    id,
    name,
    description,
    price,
    weight,
    status,
    imageUrl,
    recipes,
    onEdit,
    onDelete,
    onManageRecipe
}: CandleCardProps) {
    const priceValue = parseFloat(price);
    const totalCost = recipes.reduce((sum, recipe) => {
        return sum + (recipe.amountUsed * recipe.material.pricePerUnit)
    }, 0)

    const recommendedPrice = totalCost * PRICE_MULTIPLIER;

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
                <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Materials Cost:</span>
                        <span className="font-medium">{totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Current Price:</span>
                        <span className="font-medium">{priceValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-gray-500">Recommended Price:</span>
                        <span className={`font-medium {priceValue < recommendedPrice ? 'text-red-600' : 'text-green-600'}`}>
                            {recommendedPrice.toFixed(2)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">Weight: {weight}g</p>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                <div className="flex flex-col gap-2 w-full">
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