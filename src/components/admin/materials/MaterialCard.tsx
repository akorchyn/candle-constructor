import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'

interface MaterialCardProps {
    id: number
    name: string
    units: string
    pricePerUnit: number
    imageUrl?: string | null
    purchaseUrl?: string
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}

export function MaterialCard({
    id,
    name,
    units,
    pricePerUnit,
    imageUrl,
    purchaseUrl,
    onEdit,
    onDelete
}: MaterialCardProps) {
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
                    {purchaseUrl && (
                        <a
                            href={purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all 
                duration-200 hover:scale-110 group"
                        >
                            <ShoppingCart className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" />
                        </a>
                    )}
                </div>
            </div>
            <CardContent className="p-4">
                <p className="text-xs font-medium text-right">{pricePerUnit.toFixed(2)} per {units}</p>
                <h3 className="font-medium text-lg mt-1">{name}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" onClick={() => onEdit(id)}>
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

            </CardFooter>
        </Card>
    )
}
