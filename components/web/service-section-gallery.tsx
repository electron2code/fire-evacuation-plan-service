import { ServiceCard } from "./serviceCard";
import { ServiceCarousel } from "./service-card-carousel";
import { getServices } from "@/lib/data";

export default async function ServiceSectionGallery({ limit, className = "", Carousel }: { limit: number, className: string, Carousel?: ServiceCarousel }) {
    const services = await getServices(limit);
    if (!services.length) {
        return (
            <div className="w-full min-h-125 flex flex-col items-center justify-center">
                <p className="text-3xl text-gray-400 text-center font-bold">No Service</p>
            </div>
        )
    }
    return (
        <div className={`w-full ${className}`}>
            {
                services.map((service, index) => (
                    !Carousel ? <ServiceCard key={index} title={service.title} images={service.images} description={service.description} /> :
                        <ServiceCard index={index} id={service.id} key={index} title={service.title} images={service.images} description={service.description}>
                            <Carousel images={service.images} className="h-50 md:h-77.5 aspect-320/400" />
                        </ServiceCard>
                ))
            }
        </div>
    )
}