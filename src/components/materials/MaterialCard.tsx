import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MaterialCardProps {
    id: number
    name: string
    units: string
    pricePerUnit: number
    imageUrl?: string | null
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}

export function MaterialCard({
    id,
    name,
    units,
    pricePerUnit,
    imageUrl,
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
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium text-lg">{name}</h3>
                <p className="text-sm text-gray-500">{units}</p>
                <p className="text-sm font-medium mt-1">{parseFloat(pricePerUnit).toFixed(2)} per {units}</p>
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