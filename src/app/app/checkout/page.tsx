"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample cart items
const cartItems = [
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

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("credit-card")

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 15.0
    const total = subtotal + shipping

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Оформлення замовлення</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-background rounded-lg border p-6">
                        <h2 className="text-xl font-bold mb-4">Інформація про доставку</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="first-name">Ім&apos;я</Label>
                                <Input id="first-name" />
                            </div>
                            <div>
                                <Label htmlFor="last-name">Прізвище</Label>
                                <Input id="last-name" />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" />
                            </div>
                            <div>
                                <Label htmlFor="phone">Телефон</Label>
                                <Input id="phone" type="tel" />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="address">Адреса</Label>
                                <Input id="address" />
                            </div>
                            <div>
                                <Label htmlFor="city">Місто</Label>
                                <Input id="city" />
                            </div>
                            <div>
                                <Label htmlFor="postal-code">Поштовий індекс</Label>
                                <Input id="postal-code" />
                            </div>
                            <div>
                                <Label htmlFor="country">Країна</Label>
                                <Select defaultValue="ua">
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Оберіть країну" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ua">Україна</SelectItem>
                                        <SelectItem value="pl">Польща</SelectItem>
                                        <SelectItem value="de">Німеччина</SelectItem>
                                        <SelectItem value="uk">Велика Британія</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="state">Область</Label>
                                <Select>
                                    <SelectTrigger id="state">
                                        <SelectValue placeholder="Оберіть область" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ky">Київська</SelectItem>
                                        <SelectItem value="lv">Львівська</SelectItem>
                                        <SelectItem value="od">Одеська</SelectItem>
                                        <SelectItem value="kh">Харківська</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-background rounded-lg border p-6">
                        <h2 className="text-xl font-bold mb-4">Спосіб оплати</h2>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                            <div className="flex items-center space-x-2 mb-4">
                                <RadioGroupItem value="credit-card" id="credit-card" />
                                <Label htmlFor="credit-card">Кредитна картка</Label>
                            </div>
                            {paymentMethod === "credit-card" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pl-6">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="card-number">Номер картки</Label>
                                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div>
                                        <Label htmlFor="expiry">Термін дії</Label>
                                        <Input id="expiry" placeholder="ММ/РР" />
                                    </div>
                                    <div>
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input id="cvv" placeholder="123" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="name-on-card">Ім&apos;я на картці</Label>
                                        <Input id="name-on-card" />
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center space-x-2 mb-4">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal">PayPal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                                <Label htmlFor="bank-transfer">Банківський переказ</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div>
                    <div className="bg-muted/30 rounded-lg p-6 sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Підсумок замовлення</h2>

                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-sm text-muted-foreground">К-сть: {item.quantity}</div>
                                        <div className="font-medium">₴{(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator className="my-4" />

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
                                <Button className="w-full" size="lg">
                                    Оформити замовлення
                                </Button>
                                <div className="text-center mt-4">
                                    <Link href="/app/cart" className="text-sm text-muted-foreground hover:text-foreground">
                                        Повернутися до кошика
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

