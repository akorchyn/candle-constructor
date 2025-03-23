import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Have questions about our products or need assistance with an order? We're here to help!
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Email Us</h3>
                            <p className="text-muted-foreground mb-2">For general inquiries and customer support</p>
                            <a href="mailto:info@candlemaker.com" className="text-primary font-medium">
                                info@candlemaker.com
                            </a>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Call Us</h3>
                            <p className="text-muted-foreground mb-2">Monday to Friday, 9am to 5pm</p>
                            <a href="tel:+1234567890" className="text-primary font-medium">
                                +1 (234) 567-890
                            </a>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                            <p className="text-muted-foreground mb-2">Our workshop and showroom</p>
                            <address className="not-italic text-primary font-medium">123 Candle Street, Waxville, WX 12345</address>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="Enter your first name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Enter your last name" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email address" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Select>
                                <SelectTrigger id="subject">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General Inquiry</SelectItem>
                                    <SelectItem value="order">Order Status</SelectItem>
                                    <SelectItem value="product">Product Question</SelectItem>
                                    <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="How can we help you?" rows={5} />
                        </div>
                        <Button type="submit" size="lg">
                            Send Message
                        </Button>
                    </form>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-6">Visit Our Workshop</h2>
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-6">
                        {/* This would be a Google Map in a real implementation */}
                        <div className="absolute inset-0 bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">Map would be displayed here</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <h3 className="font-medium">Address</h3>
                                <address className="not-italic text-muted-foreground">
                                    123 Candle Street
                                    <br />
                                    Waxville, WX 12345
                                    <br />
                                    United States
                                </address>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <h3 className="font-medium">Opening Hours</h3>
                                <p className="text-muted-foreground">
                                    Monday - Friday: 9am - 5pm
                                    <br />
                                    Saturday: 10am - 4pm
                                    <br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-muted/30 py-10 px-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-bold mb-2">How long do your candles burn?</h3>
                        <p className="text-muted-foreground">
                            Our candles have different burn times depending on their size. On average, our small candles burn for
                            20-30 hours, medium for 40-50 hours, and large for 60-80 hours.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Do you offer international shipping?</h3>
                        <p className="text-muted-foreground">
                            Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                            location.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Are your candles scented?</h3>
                        <p className="text-muted-foreground">
                            We offer both scented and unscented options. Our scented candles use premium fragrance oils that are
                            phthalate-free.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Do you offer wholesale options?</h3>
                        <p className="text-muted-foreground">
                            Yes, we offer wholesale pricing for retailers. Please contact us directly for more information about our
                            wholesale program.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

