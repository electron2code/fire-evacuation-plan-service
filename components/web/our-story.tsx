import prisma from "@/lib/prisma";
import { Suspense } from "react";
import OurStoryCarousel from "./our-story-carousel";
import { getOutsideReviewImages } from "@/lib/data";

export default function OurStory() {

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Story From All Over the World</h2>
                <p className="text-sm text-center max-w-lg mx-auto text-gray-700 mb-6">
                    At Evacuation Plan Service, our journey began with a simple yet powerful mission to help businesses and property owners create safe and effective evacuation plans. We understand the critical importance of being prepared for emergencies, and we are dedicated to providing professional, compliant, and easy-to-understand solutions that ensure safety and peace of mind.
                </p>
            </div>
            <OurStorySSR />
        </section>
    );
}

async function OurStorySSR() {
    const storyImages = await getOutsideReviewImages(10, 1);
    return (
        <div className="container mx-auto px-4">
            <OurStoryCarousel ourStoryImages={storyImages.images} />
        </div>
    );
}