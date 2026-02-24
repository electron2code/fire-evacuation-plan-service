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
    className?: string;
}

export default function ServiceCardCarousel({ images, className = "h-[438.87px] p-0" }: ServiceCardProps) {
    return (
        <Carousel className={`w-full m-0 ${className}`}>
            <CarouselContent className="h-full">
                {images.map((image, index) => (
                    <CarouselItem key={index} className="w-full h-full">
                        <div className="p-1 w-full h-full">
                            <Card className="bg-gray-100 h-full p-0 rounded-xl overflow-hidden">
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
