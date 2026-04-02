import TestimonialsCarousel from "./testimonials-carousel";
import { Suspense } from "react";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import { getReviews } from "@/lib/data";

export default function Testimonials() {
    return (
        <section>
            <Suspense fallback={<ReviewCardSkeleton />}>
                <TestimonialsSSR />
            </Suspense>
        </section>
    )
}


async function TestimonialsSSR() {
    const { reviews } = await getReviews();
    return (
        <>
            <TestimonialsCarousel testimonials={reviews} />
        </>
    )
}