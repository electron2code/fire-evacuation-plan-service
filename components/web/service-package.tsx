import { Check, CheckIcon, Clock, Repeat } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface ServicePackageProps {
    tier: {
        type: "BASIC" | "STANDARD" | "PREMIUM";
        title: string;
        description: string;
        price: number;
        id: string;
        serviceId: string;
        deliveryTime: string;
        projectSize: string;
        evacuationPlan: string;
        floorPlanRedesign: boolean;
        sitePlan: string;
        zonePlan: string;
        revisions: string;
    },
}

export default function ServicePackage({ tier }: ServicePackageProps) {
    return (
        <Card className="w-full rounded-none border border-gray-200 px-2 bg-white shadow-none">
            <CardHeader>
                <h4 className="text-base font-bold text-gray-600">{tier.title}</h4>
                <p className="leading-relaxed text-sm wrap-anywhere tracking-wide text-gray-600">{tier.description}</p>
            </CardHeader>
            <CardContent>
                <div className="mt-4">
                    <div className="flex gap-3 items-center mb-2">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-700 mr-1" />
                            <span className="text-sm text-gray-700 font-bold">{tier.deliveryTime} {tier.deliveryTime === "1" ? "Day" : "Days"} Delivery</span>
                        </div>
                        <div className="flex items-center">
                            <Repeat className="w-4 h-4 text-gray-700 mr-1" />
                            <span className="text-sm text-gray-700 font-bold">{tier.revisions === "unlimited" ? "Unlimited" : tier.revisions} {tier.revisions === "1" ? "Revision" : "Revisions"}</span>
                        </div>
                    </div>
                    <ul className="list-inside text-sm text-gray-600">
                        <li className="flex items-center">
                            <CheckIcon className="w-4 h-4 text-gray-600 mr-1" />
                            <p className="text-gray-700 font-bold">
                                {Number(tier.projectSize).toLocaleString("en-IN")} sq ft
                            </p>
                        </li>
                        <li className="flex items-center">
                            <CheckIcon className="w-4 h-4 text-gray-600 mr-1" />
                            <p className="text-gray-700 font-bold">{tier.evacuationPlan} Evacuation Plan</p>
                        </li>
                        {tier.floorPlanRedesign && (
                            <li className="flex items-center">
                                <CheckIcon className="w-4 h-4 text-gray-600 mr-1" />
                                <p className="text-gray-700 font-bold">
                                    Floor Plan Redesign
                                </p>
                            </li>
                        )}
                        {tier.sitePlan !== "none" && (
                            <li className="flex items-center">
                                <CheckIcon className="w-4 h-4 text-gray-600 mr-1" />
                                <p className="text-gray-700 font-bold">{tier.sitePlan} Site Plan</p>
                            </li>
                        )}
                        {tier.zonePlan !== "none" && (
                            <li className="flex items-center">
                                <CheckIcon className="w-4 h-4 text-gray-600 mr-1" />
                                <p className="text-gray-700 font-bold">{tier.zonePlan} Zone Plan</p>
                            </li>
                        )}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-center text-gray-800 text-xl font-bold">Price: ${tier.price}</p>
            </CardFooter>
        </Card>
    )
}