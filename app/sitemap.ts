import { getServices } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const services = await getServices(100);

    const servicesEndpoints: MetadataRoute.Sitemap = services.map((service) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/services/${service.id}`,
        lastModified: new Date(service.updatedAt),
        frequency: 'monthly',
    }));
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio`,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
        },
        ...servicesEndpoints
    ]
}