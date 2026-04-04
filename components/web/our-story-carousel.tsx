"use client";
import * as React from "react"
import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi
} from "@/components/ui/carousel"
import Image from "next/image";
import { ImageViewModal } from "./image-view-modal";
import { set } from "zod";

interface OurStoryCarouselProps {
    // You can add props here if needed, such as an array of images or story items
    ourStoryImages: {
        id: string
        key: string
    }[]
}

export default function OurStoryCarousel({ ourStoryImages }: OurStoryCarouselProps) {

    const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isPaused = useRef(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    // Start or restart the interval
    const startInterval = React.useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (api && !isPaused.current) {
                if (api.selectedScrollSnap() === api.scrollSnapList().length - 1) {
                    api.scrollTo(0);
                } else {
                    api.scrollNext();
                }
            }
        }, 2000);
    }, [api]);

    useEffect(() => {
        if (!api) return;
        startInterval();
        api.on("select", () => {
            setCurrentImageIndex(api.selectedScrollSnap() || 0);
            startInterval();
        })
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [api, startInterval]);

    const handleMouseEnter = () => {
        isPaused.current = true;
    };
    const handleMouseLeave = () => {
        isPaused.current = false;
    };



    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
                active: true
            }}
            setApi={setApi}
            className="w-full"
        >
            <CarouselContent className="w-full gap-4">
                {ourStoryImages.length ? ourStoryImages.map((image, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/2 lg:basis-1/3"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="p-1">
                            <Card className="border-0 bg-transparent shadow-none p-0">
                                <CardContent className="flex aspect-video items-center justify-center p-6">
                                    <div className="relative group">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}`}
                                            alt={`Story ${index + 1}`}
                                            width={800}
                                            height={600}
                                            loading="lazy"
                                            className={`object-cover rounded shadow transition-transform duration-300 ${index % 2 === 0
                                                ? 'group-hover:rotate-[-2deg] rotate-[-4deg]'
                                                : 'group-hover:rotate-[2deg] rotate-[4deg]'
                                                }`}
                                        />
                                        <ImageViewModal internalCurrentImageIndex={index} images={ourStoryImages} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                )) : (
                    <p className="text-center text-muted-foreground">
                        No story images available.
                    </p>
                )}
            </CarouselContent>
        </Carousel>
    )
}
