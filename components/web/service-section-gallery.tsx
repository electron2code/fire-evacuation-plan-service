import prisma from "@/lib/prisma";
import { ServiceCard } from "./serviceCard";
import { ServiceCarousel } from "./service-card-carousel";

export default async function ServiceSectionGallery({ limit, className = "", Carousel }: { limit: number, className: string, Carousel?: ServiceCarousel }) {
    const services = await prisma.service.findMany({
        include: { images: true, owner: true },
        take: limit,
    });
    return (
        <div className={`w-full ${className}`}>
            {services.map((service, index) => (
                !Carousel ? <ServiceCard key={index} title={service.title} images={service.images} description={service.description} /> :
                    <ServiceCard index={index} id={service.id} key={index} title={service.title} images={service.images} description={service.description}>
                        <Carousel images={service.images} />
                    </ServiceCard>
            ))}
        </div>
    )
}