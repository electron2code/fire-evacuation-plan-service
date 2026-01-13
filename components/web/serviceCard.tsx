import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
}

export function ServiceCard({
    icon: Icon,
    title,
    description,
    imageUrl,
    imageAlt,
}: ServiceCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gray-100 duration-300">
            <CardContent className="p-6">
                <div className="flex gap-6 items-start">
                    <div className="flex-1">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-white" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {description}
                        </p>

                        <button className="inline-flex items-center gap-1 text-orange-500 font-medium text-sm hover:gap-2 transition-all duration-200">
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="shrink-0">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-40 h-52 object-cover rounded-lg"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}