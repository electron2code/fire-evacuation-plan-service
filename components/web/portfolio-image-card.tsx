"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { ImageViewModal } from "./image-view-modal";

interface PortfolioImageCardProps {
    portfolioImages: {
        id: string,
        key: string,
        url: string
    }[];
    image: {
        id: string,
        key: string,
        url: string
    }
    currentImageIndex: number
}

export default function PortfolioImageCard({ portfolioImages, image, currentImageIndex }: PortfolioImageCardProps) {
    console.log("CurrentImageIndex", currentImageIndex);
    return (
        <Card className="p-0 rounded-none border-0 border-transparent m-0 my-4 w-fit h-fit bg-transparent" key={image.id}>
            <Image src={image.url} unoptimized className="w-full h-full rounded md:rounded-xl hover:scale-105 transition-all" alt="" width={300} height={350} />
            <ImageViewModal images={portfolioImages} internalCurrentImageIndex={currentImageIndex} />
        </Card>
    )
}