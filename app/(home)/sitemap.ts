import { getServices } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const services = await getServices(100);
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        }
    ]
}