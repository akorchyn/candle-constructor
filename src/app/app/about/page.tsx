import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="mb-16">
                <div className="relative rounded-lg overflow-hidden">
                    <div className="aspect-[3/1] relative">
                        <Image
                            src="/placeholder.svg?height=600&width=1800"
                            alt="Candle making workshop"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6 text-center">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Story</h1>
                            <p className="max-w-2xl text-lg">
                                Crafting beautiful candles with passion and dedication since 2015
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="mb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">How It All Started</h2>
                        <div className="space-y-4">
                            <p>
                                Candle Maker began in a small kitchen in 2015, born from a passion for creating beautiful,
                                handcrafted candles that bring warmth and ambiance to any space. What started as a hobby
                                quickly grew into something more as friends and family began requesting candles for their
                                homes and as gifts.
                            </p>
                            <p>
                                Our founder, Maria, had always been fascinated by the way candles could transform a space
                                and create a mood. After years of experimenting with different waxes, scents, and designs,
                                she perfected her craft and decided to share her creations with the world.
                            </p>
                            <p>
                                Today, Candle Maker has grown into a thriving business, but we still maintain the same
                                dedication to quality and craftsmanship that inspired our first candles. Each product is
                                still handmade with care, ensuring that every candle that leaves our workshop meets our
                                high standards.
                            </p>
                        </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden">
                        <Image
                            src="/placeholder.svg?height=600&width=600"
                            alt="Founder working on candles"
                            width={600}
                            height={600}
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="mb-16 bg-muted/30 py-16 px-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-10 text-center">Our Candle-Making Process</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center mb-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <span className="text-xl font-bold text-primary">1</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">Selecting Materials</h3>
                            <p className="text-muted-foreground">
                                We carefully source the highest quality waxes, wicks, and fragrance oils. We prioritize
                                natural ingredients that burn cleanly and are safe for your home.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center mb-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <span className="text-xl font-bold text-primary">2</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">Handcrafting</h3>
                            <p className="text-muted-foreground">
                                Each candle is poured by hand in small batches to ensure quality control. We take our time
                                with every step, from melting the wax to positioning the wick just right.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center mb-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <span className="text-xl font-bold text-primary">3</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">Quality Testing</h3>
                            <p className="text-muted-foreground">
                                Before any candle leaves our workshop, it undergoes rigorous testing to ensure it burns
                                evenly, has the right scent throw, and meets our high standards for appearance.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Our Values */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                <path d="m14.5 9-5 5" />
                                <path d="m9.5 9 5 5" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Quality</h3>
                        <p className="text-muted-foreground">
                            We never compromise on the quality of our materials or craftsmanship.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                            >
                                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                        <p className="text-muted-foreground">
                            We strive to minimize our environmental impact through responsible sourcing and practices.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Passion</h3>
                        <p className="text-muted-foreground">
                            We pour our heart into every candle we make, creating products we truly believe in.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Community</h3>
                        <p className="text-muted-foreground">
                            We value our customers and the community that has supported our growth over the years.
                        </p>
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                            <Image
                                src="/placeholder.svg?height=300&width=300"
                                alt="Maria - Founder"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold">Maria</h3>
                        <p className="text-primary mb-2">Founder & Lead Artisan</p>
                        <p className="text-muted-foreground">
                            With over 10 years of candle-making experience, Maria oversees all aspects of production and design.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                            <Image
                                src="/placeholder.svg?height=300&width=300"
                                alt="Alex - Production Manager"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold">Alex</h3>
                        <p className="text-primary mb-2">Production Manager</p>
                        <p className="text-muted-foreground">
                            Alex ensures that every candle meets our quality standards and manages our workshop operations.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                            <Image
                                src="/placeholder.svg?height=300&width=300"
                                alt="Sofia - Creative Director"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold">Sofia</h3>
                        <p className="text-primary mb-2">Creative Director</p>
                        <p className="text-muted-foreground">
                            Sofia brings new designs to life and develops our seasonal collections with an eye for trends and tradition.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Workshop */}
            <section className="mb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-6">Our Workshop</h2>
                        <div className="space-y-4">
                            <p>
                                Located in a charming converted warehouse, our workshop is where all the magic happens.
                                This is where our team of skilled artisans handcraft each candle with meticulous attention
                                to detail.
                            </p>
                            <p>
                                We've designed our space to be both functional and inspiring, with plenty of natural light
                                and room for creativity. It's equipped with specialized tools and equipment that allow us
                                to experiment with new techniques and designs.
                            </p>
                            <p>
                                While we've grown over the years, we've maintained the intimate, hands-on approach that
                                makes our candles special. Every candle that leaves our workshop has been touched by
                                human hands and inspected for quality.
                            </p>
                        </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden order-1 md:order-2">
                        <Image
                            src="/placeholder.svg?height=600&width=600"
                            alt="Our candle making workshop"
                            width={600}
                            height={600}
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-muted/30 py-16 px-6 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Experience Our Candles</h2>
                <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
                    Browse our collection of handcrafted candles and bring the warm glow of artisanal quality into your home.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/shop">Shop Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
