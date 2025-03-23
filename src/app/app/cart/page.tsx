"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Initial cart items
const initialCartItems = [
    {
        id: 1,
        name: "Рифлена маленька",
        price: 300.0,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: 3,
        name: "Ялинка маленька фігурна",
        price: 75.0,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return

        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 15.0
    const total = subtotal + shipping

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Ваш кошик</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-2xl font-medium mb-4">Ваш кошик порожній</h2>
                    <p className="text-muted-foreground mb-8">Схоже, ви ще не додали жодної свічки до кошика.</p>
                    <Button asChild size="lg">
                        <Link href="/app/shop">Продовжити покупки</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Товар</TableHead>
                                    <TableHead>Опис</TableHead>
                                    <TableHead>Ціна</TableHead>
                                    <TableHead>Кількість</TableHead>
                                    <TableHead>Всього</TableHead>
                                    <TableHead className="w-[70px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="relative h-20 w-20 rounded overflow-hidden">
                                                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/app/shop/product/${item.slug}`} className="font-medium hover:underline">
                                                {item.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>₴{item.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">₴{(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="flex justify-between mt-8">
                            <Button variant="outline" asChild>
                                <Link href="/app/shop">Продовжити покупки</Link>
                            </Button>
                            <Button variant="outline">Оновити кошик</Button>
                        </div>
                    </div>

                    <div>
                        <div className="bg-muted/30 rounded-lg p-6 sticky top-4">
                            <h2 className="text-xl font-bold mb-4">Підсумок замовлення</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Проміжна сума</span>
                                    <span>₴{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Доставка</span>
                                    <span>₴{shipping.toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold">
                                    <span>Всього</span>
                                    <span>₴{total.toFixed(2)}</span>
                                </div>

                                <div className="pt-4">
                                    <Button className="w-full" size="lg" asChild>
                                        <Link href="/app/checkout">Перейти до оформлення</Link>
                                    </Button>
                                </div>

                                <div className="pt-4">
                                    <h3 className="font-medium mb-2">Промокод</h3>
                                    <div className="flex">
                                        <Input placeholder="Введіть код" className="rounded-r-none" />
                                        <Button className="rounded-l-none">Застосувати</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

