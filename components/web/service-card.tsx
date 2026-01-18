import Image from "next/image";
import Link from "next/link";
import { Star, Languages, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface Service {
    id: string;
    title: string;
    language: string;
    description: string;
    images: { key: string }[];
    owner: { name: string | null; imageUrl: string | null };
    tiers: { price: number }[];
    reviews?: { rating: number }[];
}

export default function ServiceCard({ service, setServices }: { service: Service, setServices: React.Dispatch<React.SetStateAction<Array<Service>>> }) {
    // Find the lowest price to show "Starting at"
    // const startingPrice = Math.min(...service.tiers.map((t) => t.price));
    const startingPrice = service.tiers[0].price;
    const [deleting, setDeleting] = useState(false);


    // Logic for average rating (placeholder logic)
    const avgRating = 4.9;
    const totalReviews = service.reviews?.length || 0;
    console.log(service.images);


    async function handleDeleteService() {
        setDeleting(true);
        try {
            const response = await fetch("/api/v1/service", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ serviceId: service.id })
            });

            if (!response.ok) {
                toast.error("Something went wrong");
            }
            const { data } = await response.json();
            if (data) {
                toast.success("Service deleted successfully");
                setServices(prev => prev.filter(srv => srv.id !== service.id));
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 max-w-[320px] cursor-pointer border-zinc-200/50">
            {/* 1. Image Section */}
            <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${service.images[0]?.key}` || "/placeholder-service.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <CardContent className="p-4 space-y-3">
                {/* 2. Owner Info */}
                <div className="flex items-center gap-2">
                    {service.owner.imageUrl ? (
                        <Image
                            src={service.owner.imageUrl}
                            alt="Owner"
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="bg-zinc-100 p-1 rounded-full">
                            <User size={14} />
                        </div>
                    )}
                    <span className="text-xs font-semibold text-zinc-700 hover:underline">
                        {service.owner.name || "Anonymous Seller"}
                    </span>
                </div>

                {/* 3. Title */}
                <h3 className="text-sm font-medium line-clamp-2 min-h-10 group-hover:text-blue-600 transition-colors">
                    {service.title}
                </h3>
                {/* 4. Rating & Meta */}
                <div className="flex items-center gap-1 text-sm font-bold">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span>{avgRating}</span>
                    <span className="text-zinc-400 font-normal">({totalReviews})</span>
                </div>
                <div className="">
                    <p>{service.description}</p>
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Languages size={14} />
                    <span>{service.language}</span>
                </div>
            </CardContent>
            <hr className="border-zinc-300/50" />
            <div className="flex items-center justify-center gap-2 p-3">
                <Button asChild variant="outline" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                    <Link href={`/dashboard/services/edit/${service.id}`}>Edit</Link>
                </Button>
                <Button onClick={handleDeleteService} disabled={deleting} className="text-white bg-red-500 hover:bg-red-600 active:bg-red-700">Delete</Button>
            </div>
        </Card>
    );
}