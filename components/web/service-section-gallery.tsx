import prisma from "@/lib/prisma";
import { ServiceCard } from "./serviceCard";
import { ServiceCarousel } from "./service-card-carousel";
import { Suspense } from "react";
import ServiceSkeleton from "./service-skeleton";

export default async function ServiceSectionGallery({ limit, className = "", Carousel }: { limit: number, className: string, Carousel?: ServiceCarousel }) {
    return (
        <div className={`w-full ${className}`}>
            <Services limit={limit} Carousel={Carousel} className={className} />
        </div>
    )
}

async function Services({ limit, className = "", Carousel }: { limit: number, className: string, Carousel?: ServiceCarousel }) {
    const services = await prisma.service.findMany({
        include: { images: true, owner: true },
        take: limit,
    });
    if (!services.length) {
        return (
            <div className="w-full min-h-125 flex flex-col items-center justify-center">
                <p className="text-3xl text-gray-400 text-center font-bold">No Service</p>
            </div>
        )
    }
    return (
        <Suspense fallback={<ServiceSkeleton />}>
            {services.map((service, index) => (
                !Carousel ? <ServiceCard key={index} title={service.title} images={service.images} description={service.description} /> :
                    <ServiceCard index={index} id={service.id} key={index} title={service.title} images={service.images} description={service.description}>
                        <Carousel images={service.images} className="h-50 md:h-77.5 aspect-320/400" />
                    </ServiceCard>
            ))}
        </Suspense>
    )
}