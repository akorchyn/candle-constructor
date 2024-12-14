// src/components/materials/RecipeMaterialCard.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Check } from "lucide-react"

interface RecipeMaterialCardProps {
    id: number
    name: string
    units: string
    pricePerUnit: number
    imageUrl?: string | null
    amount: number
    onAmountChange: (id: number, amount: number) => void
}

export function RecipeMaterialCard({
    id,
    name,
    units,
    pricePerUnit,
    imageUrl,
    amount,
    onAmountChange
}: RecipeMaterialCardProps) {
    const pricePerUnitValue = parseFloat(pricePerUnit)
    const isInRecipe = amount > 0
    const totalPrice = amount * pricePerUnitValue

    const handleAdd = () => {
        onAmountChange(id, 1) // Default to 1 unit when adding
    }

    const handleRemove = () => {
        onAmountChange(id, 0)
    }

    return (
        <Card className="flex flex-col relative">
            {isInRecipe && (
                <div className="absolute top-2 right-2 z-10">
                    <div className="bg-green-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                </div>
            )}
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
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">{name}</h3>
                <p className="text-sm text-gray-500">
                    {pricePerUnitValue.toFixed(2)} per {units}
                </p>

                {isInRecipe ? (
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                min="0"
                                className="flex-1"
                                placeholder={`Amount in ${units}`}
                                value={amount || ''}
                                onChange={(e) => onAmountChange(id, Number(e.target.value))}
                            />
                            <span className="text-sm text-gray-500 min-w-16">
                                {units}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                                Total: {totalPrice.toFixed(2)}
                            </span>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleRemove}
                            >
                                <Minus className="w-4 h-4 mr-1" />
                                Remove
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        className="w-full mt-4"
                        variant="outline"
                        onClick={handleAdd}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add to Recipe
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
