"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card } from "../ui/card"
import Image from "next/image"

export function ImageViewModal({ images }: {
    images: {
        id: string
        key: string
        serviceId: string
    }[];
}) {
    return (
        <Dialog>
            <DialogTrigger className="absolute inset-0 opacity-0"><Button suppressHydrationWarning={true}>Open</Button>  </DialogTrigger>
            <DialogContent className="flex items-center">
                <DialogTitle className="hidden">Image Preview</DialogTitle>
                <DialogDescription className="hidden">
                    View the image in a larger format.
                </DialogDescription>
                <Carousel className={`w-full h-fit p-0`}>
                    <CarouselContent className="h-full w-full">
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="w-full h-full relative">
                                <div className="p-1 w-full h-screen">
                                    <Card className="bg-gray-100 h-full w-full p-0 rounded-xl overflow-hidden object-contain">
                                        <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}`} className="w-auto h-full object-contain object-center" alt={image.key} width={2000} height={1480} />
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="size-12 bg-[#ff6a00] hover:bg-[#e2b72a] text-red-600 hover:text-red-800 text-2xl translate-x-5 cursor-pointer" />
                    <CarouselNext className="size-12 bg-[#ff6a00] hover:bg-[#e2b72a] text-red-600 hover:text-red-800 text-2xl -translate-x-5 cursor-pointer" />
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}
