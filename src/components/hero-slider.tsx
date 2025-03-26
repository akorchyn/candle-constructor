"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Button } from '@/components/ui/button'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { cn } from '@/lib/utils'

const slides = [
    {
        id: 1,
        image: '/assets/hero.jpg',
        title: 'Преміальні свічки ручної роботи',
        description: 'Створіть особливу атмосферу у вашому домі',
        buttonText: 'До магазину',
        buttonLink: '/app/shop',
        className: 'object-cover object-[100%_75%]'
    },
    {
        id: 2,
        image: '/assets/hero.jpg',
        title: 'Ручна робота',
        description: "Зроблено з любов'ю та увагою до деталей, щоб ви могли насолодитися атмосферою комфорту",
        buttonText: 'Свічки ручного розпису',
        buttonLink: '/categories/handmade',
        className: 'object-cover object-[100%_75%]'

    },
]


export default function HeroSlider() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="relative">
            <Swiper
                spaceBetween={0}
                loop={true}
                effect='fade'
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="aspect-[16/9] md:aspect-[21/9]"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={"relative w-full h-full"}>
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className={cn("object-cover ", slide.className)}
                                priority={slide.id === 1}
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6 text-center">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl mb-8 max-w-2xl">
                                    {slide.description}
                                </p>
                                <Button size="lg" variant="secondary" asChild className="text-white bg-rose-400 hover:bg-rose-500">
                                    <Link href={slide.buttonLink}>
                                        {slide.buttonText}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
} 
