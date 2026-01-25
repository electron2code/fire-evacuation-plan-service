import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Award, Users, FileText } from 'lucide-react';
import Image from 'next/image';

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    span?: string;
}

function FeatureCard({ icon, title, description, span = 'col-span-1' }: FeatureProps) {
    return (
        <Card className={`${span} border-gray-200 bg-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
            <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 bg-orange-500 text-2xl       rounded-lg flex items-center justify-center text-white">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function WhyChooseSection() {
    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Why Clients Choose Us
                    </h2>
                    <p className="text-lg text-gray-500">
                        Reliable evacuation plans built on global fire safety standards and proven life-protection principles.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                    <FeatureCard
                        icon={<Image src="/buildings.svg" width={38} height={38} alt='building' />}
                        title=" Suitable for All Building Types"
                        description="Residential, commercial, industrial, educational, and healthcare facilities worldwide."
                    />
                    <FeatureCard
                        icon={<Clock className="w-6 h-6" />}
                        title="On-Time Delivery"
                        description="Guaranteed timely delivery without compromising safety or accuracy."
                    />
                    <FeatureCard
                        icon={<Award className="w-6 h-6" />}
                        title="Unlimited Revisions"
                        description="We offer unlimited revisions to ensure the final plan meets your exact requirements."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FeatureCard
                        icon={<Users className="w-6 h-6" />}
                        title="After-Sales Assistance"
                        description="We provide dedicated post-project support, ensuring lifetime assistance for future needs and updates."
                        span="col-span-1"
                    />
                    <FeatureCard
                        icon={<FileText className="w-6 h-6" />}
                        title="Approved by Fire Safety Guidelines"
                        description="Plans suitable for inspection, approval, and regulatory submission."
                        span="col-span-1"
                    />
                    <FeatureCard
                        icon={<FileText className="w-6 h-6" />}
                        title="Clear Exit Routes & Assembly Points"
                        description="Clearly marked escape routes and assembly points for safe evacuation"
                        span="col-span-1"
                    />
                </div>
            </div>
        </section>
    );
}
