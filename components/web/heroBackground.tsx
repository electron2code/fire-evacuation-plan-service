"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface BannerImage {
    id: string
    url: string
    key: string
}

export default function HeroBackground() {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [bannerImages, setBannerImages] = useState<Array<BannerImage>>([]);
    const [loadingBannerImages, setLoadingBannerImages] = useState(false);

    useEffect(() => {
        if (!bannerImages.length) return;
        const interval = setInterval(() => {
            setBackgroundIndex((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval)
    }, [bannerImages]);

    useEffect(() => {
        fetchBannerImages();
    }, []);

    async function fetchBannerImages() {
        try {
            setLoadingBannerImages(true);
            const response = await fetch("/api/v1/banner/images");
            if (!response.ok) {
                console.log("Error fetching banner images");
                return
            }
            const bannerImagesRes = await response.json();
            if (bannerImagesRes.images?.length) {
                setBannerImages(bannerImagesRes.images);
                console.log(bannerImagesRes);
            }
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoadingBannerImages(false);
        }
    }

    const url = bannerImages.length ? bannerImages[backgroundIndex].url : "";
    return (
        !loadingBannerImages && bannerImages.length ?
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-100 bg-fixed transition-all duration-1000"
                style={{
                    backgroundImage: `url("${url}")`,
                }}
            />
            : null
    );
}
