"use client"
import { Dispatch, SetStateAction } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image";

interface ServiceImageGalleryCarouselProps {
    currentImageIndex: number;
    setCurrentImageIndex: Dispatch<SetStateAction<number>>;
    images: {
        id: string
        key: string
        serviceId: string
    }[];
    className?: string
}

export default function ServiceImageGalleryCarousel({ currentImageIndex, setCurrentImageIndex, images, className = "" }: ServiceImageGalleryCarouselProps) {
    return (
        <div className={`w-full h-24 ${className}`}>
            <Carousel className="w-full h-full px-4">
                <CarouselContent className="gap-2">
                    {images.map((image, index) => (
                        <CarouselItem onClick={() => setCurrentImageIndex(index)} key={index} className={`${index === currentImageIndex ? "scale-115 z-10 border" : "scale-100 z-0"} basis-[30%] sm:basis-[25%] md:basis-[20%] lg:basis-[15%] h-full transition-all duration-500 ease-in-out flex justify-center items-center`}>
                            <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}` || "/default-image.jpg"} className={`w-full h-full object-cover object-center ${index === currentImageIndex ? "border border-blue-500" : ""}`} alt={image.key} width={400} height={300} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}