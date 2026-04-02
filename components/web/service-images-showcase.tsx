"use client";
import { useState } from "react";
import ServiceCardCarousel from "./service-card-carousel";
import ServiceImageGalleryCarousel from "./service-image-gallery-carousel";
import { ImageViewModal } from "./image-view-modal";


interface ServiceImagesShowcaseProps {
    images: {
        id: string
        key: string
        serviceId: string
    }[];
}

export default function ServiceImagesShowcase({ images }: ServiceImagesShowcaseProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    return (
        <div>
            <ServiceCardCarousel ImageViewModal={ImageViewModal} currentImageIndex={currentImageIndex} images={images.length ? images : []} />
            <ServiceImageGalleryCarousel currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} className="mt-6" images={images.length ? images : []} />
        </div>
    )
}