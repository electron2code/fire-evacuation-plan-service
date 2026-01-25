import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, FileSearch, FileText, Wrench, CheckSquare } from 'lucide-react';
import Link from 'next/link';

interface ProcessStep {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function ClaimsAssistanceSection() {
    const services = [
        'Emergency exit routes',
        'Assembly points & safety symbols',
        'Fire safety equipment locations',
        'Clear, easy-to-read evacuation layouts',
        'Suitable for inspection & display',
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
                    {/* Left Column - Service Info */}
                    <div className="flex flex-col justify-center">
                        {/* <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-2 mb-6 w-fit">
                            <Shield className="w-4 h-4 text-pink-600" />
                            <span className="text-sm font-medium text-pink-700">Property Claims Assistance</span>
                        </div> */}

                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                            Professional Evacuation Planning from Start to Final Delivery
                        </h2>

                        <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                            We follow a clear and efficient process to deliver accurate, internationally compliant evacuation plans focused on life safety and regulatory approval.
                        </p>

                        {/* Services Checklist */}
                        <div className="space-y-3 mb-8">
                            {services.map((service, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <span className="text-gray-700">{service}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/contact" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors w-fit shadow-lg hover:shadow-xl">
                            Get Free Storm Inspection
                        </Link>
                    </div>

                    {/* Right Column - Process Steps */}
                    <div className="flex flex-col justify-center space-y-4">
                        {processSteps.map((step) => (
                            <Card key={step.number} className="border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0 w-12 h-12 bg-pink-50 border border-pink-200 rounded-lg flex items-center justify-center text-red-600">
                                            {step.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-bold text-gray-900 text-lg">{step.number}</span>
                                                <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Emergency Banner */}
                <Card className="bg-linear-to-r from-red-600 to-red-700 border-0 shadow-xl mt-20">
                    <CardContent className="py-8 px-6 text-center">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                            Need an Evacuation Plan Urgently? We’re Ready to Help
                        </h3>
                        <p className="text-red-50 text-base lg:text-lg mb-6 max-w-3xl mx-auto">
                            Don’t delay safety planning. Our team is available to deliver accurate, internationally compliant evacuation plans—on time, every time.
                        </p>
                        <div className='mt-16'>
                            <Link href="/contact" className="bg-white hover:bg-gray-100 text-red-600 font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl mt-10">
                                Order Evacuation Plan Now
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
        </svg>
    );
}
