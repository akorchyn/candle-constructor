import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
    return (
        <footer className="bg-background border-t py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Candle Maker</h3>
                        <p className="text-muted-foreground">
                            Handcrafted candles made with love and care for your home and special occasions.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/app/shop" className="text-muted-foreground hover:text-foreground">
                                    All Candles
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/categories/seasonal" className="text-muted-foreground hover:text-foreground">
                                    Seasonal
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/categories/decorative" className="text-muted-foreground hover:text-foreground">
                                    Decorative
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/categories/scented" className="text-muted-foreground hover:text-foreground">
                                    Scented
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/app/about" className="text-muted-foreground hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/contact" className="text-muted-foreground hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/faq" className="text-muted-foreground hover:text-foreground">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/shipping" className="text-muted-foreground hover:text-foreground">
                                    Shipping & Returns
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                        <p className="text-muted-foreground mb-4">Subscribe to get updates on new products and special offers.</p>
                        <div className="flex">
                            <Input type="email" placeholder="Your email" className="rounded-r-none" />
                            <Button className="rounded-l-none">Subscribe</Button>
                        </div>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>© {new Date().getFullYear()} Candle Maker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
