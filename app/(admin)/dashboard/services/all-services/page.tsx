"use client";

import ServiceCard from "@/components/web/service-card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Service {
    id: string;
    title: string;
    description: string;
    language: string;
    images: { key: string }[];
    owner: { name: string | null; imageUrl: string | null };
    tiers: { price: number }[];
    reviews?: { rating: number }[];
};

export default function AllServicesPage() {
    const [services, setServices] = useState<Array<Service>>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchServices();
    }, [])

    async function fetchServices() {
        setLoading(true);
        try {
            const response = await fetch("/api/v1/service/all");
            if (!response.ok) {
                toast.error("Error fetching services");
                setLoading(false);
                return
            }

            const servicesRes = await response.json();
            if (servicesRes.data) {
                setServices(servicesRes.data);
            }
        } catch (error) {
            toast.error("Something went wrong when fetching services");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full px-4 md:px-6">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl text-gray-700 dark:text-gray-200 font-bold my-10">All Services</h2>
            {
                loading ? (
                    <div className="text-center text-sm text-bold">Loading...</div>
                ) : services.length === 0 ? (
                    <div className="text-center text-xl text-bold">No Service is Available</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {
                            services.map((service) => (
                                <ServiceCard service={service} setServices={setServices} key={service.id} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}