import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface ServicePackageProps {
    tier: {
        type: "BASIC" | "STANDARD" | "PREMIUM";
        title: string;
        description: string;
        price: number;
        id: string;
        serviceId: string;
    },
}

export default function ServicePackage({ tier }: ServicePackageProps) {
    return (
        <Card className="w-full rounded-none border border-gray-200 px-2 bg-white shadow-none">
            <CardHeader>
                <h4 className="text-base font-bold text-gray-600">{tier.title}</h4>
            </CardHeader>
            <CardContent>
                <p className="leading-relaxed text-sm wrap-anywhere tracking-wide text-gray-600">{tier.description}</p>
            </CardContent>
            <CardFooter>
                <p className="text-center text-gray-800 text-xl font-bold">Price: ${tier.price}</p>
            </CardFooter>
        </Card>
    )
}