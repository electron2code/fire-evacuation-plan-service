"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import ServicePackage from "./service-package";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Tier {
    type: "BASIC" | "STANDARD" | "PREMIUM";
    title: string;
    description: string;
    price: number;
    id: string;
    serviceId: string;
}

export default function ServicePackages({ tiers, serviceTitle, serviceImageUrl, serviceDescription }: { tiers: Tier[], serviceTitle?: string, serviceImageUrl?: string, serviceDescription?: string }) {
    const [tier, setTier] = useState<Tier | null>(tiers.length ? tiers[0] : null);

    const imageUrl = serviceImageUrl ? `${process.env.NEXT_PUBLIC_BUCKET_URL}/${serviceImageUrl}` : "";
    let message = `*New Service Request*\n\n` +
        `*Service Name:* ${serviceTitle}\n` +
        `*Service Description:* ${serviceDescription}\n` +
        `*Service Image URL:* ${imageUrl.replace(/\s+/g, '%20')}\n` +
        `*Basic Price:* $${tier ? tiers[0]?.price : "None"}\n` +
        `*Standard Price:* $${tier ? tiers[1]?.price : "None"}\n` +
        `*Premium Price:* $${tier ? tiers[2]?.price : "None"}\n`;

    if (imageUrl) {
        message += `\n\n*Attached Photo:* ${imageUrl.replace(/\s+/g, '%20')}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+8801601770053";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;


    return (
        <div className="flex-1 py-5">
            <div className="flex w-full">
                <div className="w-full flex h-12 text-[0px]">
                    <Button onClick={() => setTier(tiers.find((t) => t.type === "BASIC") || null)} className={`rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300/90 border-b-2 w-full flex-1 text-base transition-all py-6 px-4 ${tier?.type === "BASIC" ? "border-b-black text-gray-800" : "border-b-gray-300/80 text-gray-500"}`}>Basic</Button>
                    <Button onClick={() => setTier(tiers.find((t) => t.type === "STANDARD") || null)} className={`rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300/80 border-b-2 w-full flex-1 text-base transition-all py-6 px-4 ${tier?.type === "STANDARD" ? "border-b-black text-gray-800" : "border-b-gray-300/90 text-gray-500"}`}>Standard</Button>
                    <Button onClick={() => setTier(tiers.find((t) => t.type === "PREMIUM") || null)} className={`rounded-none bg-gray-100 hover:bg-gray-200 border border-gray-300/80 border-b-2 w-full flex-1 text-base transition-all py-6 px-4 ${tier?.type === "PREMIUM" ? "border-b-black text-gray-800" : "border-b-gray-300/90 text-gray-500"}`}>Premium</Button>
                </div>
            </div>
            {
                tier && <div>
                    <ServicePackage tier={tier} />
                </div>
            }
            <div className="space-y-2 w-full flex justify-center mt-4">
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full py-6 rounded-none bg-gray-800 text-gray-200 hover:bg-gray-900 hover:text-gray-200">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}