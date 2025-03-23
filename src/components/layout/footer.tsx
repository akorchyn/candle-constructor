import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
    return (
        <footer className="bg-background border-t py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">ArgGlow.candles</h3>
                        <p className="text-muted-foreground">
                            Свічки з любовью та турботою для вашого дому та особливих випадків.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Категорії</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/app/shop" className="text-muted-foreground hover:text-foreground">
                                    Всі свічки
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/categories/seasonal" className="text-muted-foreground hover:text-foreground">
                                    З кастомним дизайном
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/categories/seasonal" className="text-muted-foreground hover:text-foreground">
                                    Ароматизовані
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/categories/decorative" className="text-muted-foreground hover:text-foreground">
                                    Декоративні
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>© {new Date().getFullYear()} ArgGlow.candles</p>
                </div>
            </div>
        </footer>
    )
}
