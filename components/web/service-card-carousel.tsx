"use client";
import * as React from "react"
import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";


interface ServiceCardProps {
    images: {
        id: string
        key: string
        serviceId: string
    }[];
}

export default function ServiceCardCarousel({ images }: ServiceCardProps) {
    return (
        <Carousel className="w-full m-0">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1 w-full h-full">
                            <Card className="bg-gray-100 h-100">
                                <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}`} className="w-full h-full object-cover object-center" alt={image.key} width={320} height={400} />
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="text-red-600 hover:text-red-800 text-2xl translate-x-5 cursor-pointer" />
            <CarouselNext className="text-red-600 hover:text-red-800 text-2xl -translate-x-5 cursor-pointer" />
        </Carousel>
    )
}

export type ServiceCarousel = typeof ServiceCardCarousel;
