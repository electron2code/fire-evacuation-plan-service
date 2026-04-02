"use client";
import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { ImageViewModalType } from "./image-view-modal";
import { useEffect, useState } from "react";


interface ServiceCardProps {
    ImageViewModal?: ImageViewModalType;
    images: {
        id: string
        key: string
        serviceId: string
    }[];
    className?: string;
}

function ServiceCardCarousel({ ImageViewModal, currentImageIndex, images, className = "h-fit p-0" }: ServiceCardProps & { currentImageIndex?: number }) {
    const [api, setApi] = useState<CarouselApi>();
    const [internalCurrentImageIndex, setInternalCurrentImageIndex] = useState(0);
    useEffect(() => {
        if (!api) {
            return
        }
        if (currentImageIndex === undefined) {
            return
        }

        api.scrollTo(currentImageIndex);

        api.on("select", () => {
            setInternalCurrentImageIndex(api.selectedScrollSnap());
        });
    }, [api, currentImageIndex]);
    return (
        <Carousel setApi={setApi} className={`w-full h-full m-0 ${className}`}>
            <CarouselContent className="h-full">
                {images.map((image, index) => (
                    <CarouselItem key={index} className="w-full h-full relative">
                        <div className="p-1 w-full h-full">
                            <Card className="bg-gray-100 h-full p-0 rounded-xl overflow-hidden">
                                <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}`} className="w-full h-full object-cover object-center" alt={image.key} width={2000} height={1480} />
                            </Card>
                            <div className="hidden lg:block">
                                {ImageViewModal && <ImageViewModal internalCurrentImageIndex={internalCurrentImageIndex} images={images} />}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden lg:block">
                <CarouselNext className="text-red-600 hover:text-red-800 text-2xl -translate-x-5 cursor-pointer" />
                <CarouselPrevious className="text-red-600 hover:text-red-800 text-2xl translate-x-5 cursor-pointer" />
            </div>
        </Carousel>
    )
}

export type ServiceCarousel = typeof ServiceCardCarousel;
export default ServiceCardCarousel;
