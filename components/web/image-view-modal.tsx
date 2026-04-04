"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card } from "../ui/card"
import Image from "next/image"
import { X as CloseIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function ImageViewModal({ internalCurrentImageIndex, images, open, onOpenChange }: {
    internalCurrentImageIndex: number;
    images: {
        id: string
        key: string
        serviceId?: string
    }[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) {
            return
        }
        if (internalCurrentImageIndex === undefined) {
            return
        }
        api.scrollTo(internalCurrentImageIndex);
    }, [api, internalCurrentImageIndex]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger className="absolute inset-0 opacity-0">Open</DialogTrigger>
            <DialogContent showCloseButton={false} className="flex items-center bg-black/40 border-0 rounded-none">
                <DialogTitle className="hidden">Image Preview</DialogTitle>
                <DialogDescription className="hidden">
                    View the image in a larger format.
                </DialogDescription>
                <Carousel setApi={setApi} className="w-full h-fit p-0 bg-transparent">
                    <CarouselContent className="h-full w-full bg-transparent">
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="w-full h-full relative bg-transparent">
                                <div className="p-1 w-full h-screen">
                                    <Card className="bg-transparent rounded-none border-0 h-full w-full p-0 overflow-hidden object-contain">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}`}
                                            className="w-auto h-full object-contain object-center"
                                            alt={image.key}
                                            fill
                                            loading="lazy"
                                            sizes="(max-width: 768px) 100vw, 90vw"
                                        />
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="size-12 bg-white hover:bg-[#f3f3f3] text-black/80 hover:text-black text-2xl translate-x-5 cursor-pointer" />
                    <CarouselNext className="size-12 bg-white hover:bg-[#f3f3f3] text-black/80 hover:text-black text-2xl -translate-x-5 cursor-pointer" />
                </Carousel>
                <DialogClose className="cursor-pointer absolute top-4 right-4 bg-white text-black/80 hover:text-black rounded-full p-2">
                    <CloseIcon className="size-4" />
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}


export type ImageViewModalType = typeof ImageViewModal;