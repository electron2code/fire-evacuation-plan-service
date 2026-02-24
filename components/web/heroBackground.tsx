"use client";
import { useEffect, useState } from "react";

interface BannerImage {
    id: string
    key: string
}

export default function HeroBackground({ bannerImages }: { bannerImages: BannerImage[] }) {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    useEffect(() => {
        if (!bannerImages.length) return;
        const interval = setInterval(() => {
            setBackgroundIndex((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval)
    }, [bannerImages]);

    const url = bannerImages.length ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${bannerImages[backgroundIndex].key}` : "";
    return (
        bannerImages.length ?
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-100 bg-fixed transition-all duration-1000"
                style={{
                    backgroundImage: `url("${url}")`,
                }}
            />
            : null
    );
}
