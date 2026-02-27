import { getServices } from "@/lib/data";
import Link from "next/link";

export default async function FooterServices() {
    const services = await getServices(5);
    return (
        <ul className="mb-6">
            {services.map((service) => (
                <li key={service.id}>
                    <Link href={`/services/${service.id}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {service.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}