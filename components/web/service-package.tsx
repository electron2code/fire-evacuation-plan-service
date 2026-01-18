import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface ServicePackageProps {
    tier: {
        type: "BASIC" | "STANDARD" | "PREMIUM";
        title: string;
        description: string;
        price: number;
        id: string;
        serviceId: string;
    }
}

export default function ServicePackage({ tier }: ServicePackageProps) {
    return (
        <Card className="w-full px-2 bg-gray-300 shadow-md">
            <CardHeader>
                <h4 className="text-base font-bold text-gray-600">{tier.title}</h4>
            </CardHeader>
            <CardContent>
                <p className="leading-relaxed text-sm wrap-anywhere tracking-wide text-gray-700">{tier.description}</p>
            </CardContent>
            <CardFooter>
                <p className="text-center text-orange-700 font-bold text-base">Price: ${tier.price}</p>
            </CardFooter>
        </Card>
    )
}