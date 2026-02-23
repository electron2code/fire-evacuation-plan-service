import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, FileSearch, FileText, Wrench, CheckSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProcessStep {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function ClaimsAssistanceSection() {
    const services = [
        "Updated floor plan (If available) Or, a picture of a hand sketch floor plan Or send me the complete video of your project. While making the video, try to make it step by step starting from the front door. And through the video, you should be able to understand where each thing in the project like doors, windows, furniture etc. is located.",
        "Your project address.",
        "Firefighter emergency number in your country.",
        "Your project google location link.",
        "If your company has a logo, give it to me. If not, it's not necessary.",
        "Please mark the locations of Fire Extinguisher 🧯 Location, assembly point 👩‍👦‍👦 Location, fire alarm 🔊 location, Smoke detector 🚨 location, fast aid kit ✚ etc.",
    ];

    const processSteps: ProcessStep[] = [
        {
            number: '1',
            icon: <FileSearch className="w-5 h-5" />,
            title: 'Project Review & Information Collection',
            description: 'We review your building layout, floor plans, and safety requirements to understand the scope of the evacuation plan.'
        },
        {
            number: '2',
            icon: <FileText className="w-5 h-5" />,
            title: 'Safety Analysis & Code Planning',
            description: 'Our experts analyze escape routes, exits, and fire safety elements according to international fire safety standards.'
        },
        {
            number: '3',
            icon: <Wrench className="w-5 h-5" />,
            title: 'Evacuation Plan Design',
            description: 'We create clear, accurate evacuation drawings with exits, stairs, routes, symbols, and assembly points.'
        },
        {
            number: '4',
            icon: <CheckSquare className="w-5 h-5" />,
            title: 'Final Review & Delivery',
            description: 'After your approval, we deliver print-ready and digital evacuation plans with unlimited revisions if required.'
        }
    ];

    return (
        <section className="bg-linear-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-7xl mx-auto py-16 px-6">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Service Info */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                            Information needed to get started work
                        </h2>

                        <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                            Please be mindful that the more information you share with me, the better I can meet your needs.
                        </p>

                        {/* Services Checklist */}
                        <div className="space-y-3 mb-8">
                            {services.map((service, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <span className="text-gray-700">{service}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/contact" className="bg-linear-to-r from-[#ff6a00] to-[#eb4913] text-white font-semibold px-8 py-4 rounded-lg transition-colors w-fit shadow-lg hover:shadow-xl">
                            Get Free Storm Inspection
                        </Link>
                    </div>

                    {/* Right Column - Process Steps */}
                    <div className="flex flex-col justify-center space-y-4 gap-3">
                        <Image className='rounded-2xl border border-gray-500/50' alt='I-will-design-for-fire-emergency-exit-and-fire-evacuation-plan-claim-assistance' src="/I-will-design-for-fire-emergency-exit-and-fire-evacuation-plan-claim-assistance.jpeg" width={592} height={546} />
                    </div>
                </div>
            </div>
        </section>
    );
}