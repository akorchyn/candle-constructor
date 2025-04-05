import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShoppingBasket, ShoppingCart, Tag } from "lucide-react";
import Navigation from "../navigation";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
    const navigation = [{ title: 'Свічки', href: '/app/shop', icon: <ShoppingCart size={28} /> },
    { title: 'Категорії', href: '/app/categories', icon: <Tag size={28} /> },
    { title: 'Корзина', href: '/app/cart', icon: <ShoppingBasket size={28} />, hideDesktop: true },
    ];

    return (
        <header className="border-b bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/app" className="text-xl font-bold">
                    ArtGlow.candles
                </Link>
                <div className="md:flex w-full hidden text-lg font-medium hover:text-primary">
                    <Navigation
                        links={navigation} mobile={false}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <Link href="/app/cart" className="md:flex w-full hidden">
                        <Button variant="outline" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="md:hidden flex w-full">
                <Navigation
                    links={navigation} mobile={true}
                />
            </div>
        </header>
    )
}
