import prisma from "@/lib/prisma";
import { Suspense } from "react";
import OurStoryCarousel from "./our-story-carousel";
import { getOutsideReviewImages } from "@/lib/data";
import Link from "next/link";

export default function OurStory() {

    return (
        <section className="py-4 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-3 text-center text-orange-600">Trusted by Clients Worldwide</h2>
                <p className="text-sm text-center max-w-lg mx-auto text-black mb-2">
                    Don't just take our word for it—we're proud to have successfully completed hundreds of projects on Fiverr and Upwork. See what our satisfied clients on Fiverr and Upwork have to say about our professional emergency relocation planning services.
                </p>
                <div className="flex justify-center gap-4">
                    <Link className="py-3 px-5 bg-black rounded-sm border border-black/50 text-white" href="https://www.fiverr.com/shuvo7770053?public_mode=true">View on Fiverr</Link>
                    <Link className="py-3 px-5 bg-black rounded-sm border border-black/50 text-white" href="https://www.upwork.com/freelancers/emergencyevacuationplan">View on Upwork</Link>
                </div>
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