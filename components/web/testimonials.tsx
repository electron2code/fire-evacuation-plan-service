import prisma from "@/lib/prisma"
import TestimonialsCarousel from "./testimonials-carousel";

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
            <TestimonialsCarousel testimonials={reviews} />
        </section>
    )
}