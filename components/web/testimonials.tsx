import prisma from "@/lib/prisma"
import TestimonialsCarousel from "./testimonials-carousel";
import { Suspense } from "react";
import ReviewCardSkeleton from "./ReviewCardSkeleton";

export default async function Testimonials() {
    const reviews = await prisma.review.findMany({
        include: {
            user: {
                select: {
                    imageUrl: true,
                    name: true,
                    id: true
                }
            }
        }
    });
    return (
        <section>
            <Suspense fallback={<ReviewCardSkeleton />}>
                <TestimonialsCarousel testimonials={reviews} />
            </Suspense>
        </section>
    )
}