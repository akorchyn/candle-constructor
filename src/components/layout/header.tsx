import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShoppingCart } from "lucide-react";

export default function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/app" className="text-xl font-bold">
                    ArtGlow.candles
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/app/shop" className="text-sm font-medium hover:text-primary">
                        Магазин
                    </Link>
                    <Link href="/app/categories" className="text-sm font-medium hover:text-primary">
                        Категорії
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">
                    {/* <div className="relative hidden md:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search candles..."
                            className="w-[200px] pl-8 rounded-md bg-background"
                        />
                    </div> */}
                    <Link href="/app/cart">
                        <Button variant="outline" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
