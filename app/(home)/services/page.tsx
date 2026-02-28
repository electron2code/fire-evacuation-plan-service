import ServiceCardCarousel from "@/components/web/service-card-carousel";
import ServiceSectionGallery from "@/components/web/service-section-gallery";
import ServiceSkeleton from "@/components/web/service-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Evacution Plan Services",
    description: "",
    generator: 'Next.js',
    applicationName: 'Evacuation plan service portal',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'evacuation plan',
        'safety plan',
        'fire exit plan',
        'exit plan',
        'escape plan',
        'fire emergency evacuation plans',
        'fire safety planning',
        'california fire plan',
        'fire plan',
        'dillinger escape plan',
        'safety plan for suicidal ideation evac plans',
        'fire escape plan',
        'fire evacuation plan',
        'emergency evacuation plan',
        'fire emergency evacuation plan',
        'fire and evacuation plan',
        'fire evac plan',
        'emergency and evacuation plan',
        'emergency evac plan',
        'fire and emergency evacuation plan',
        'plan of evacuation',
        'fire drill procedure',
        'home fire escape plan',
        'home emergency escape plan',
        'emergency evacuation procedure',
        'evacuation plan example',
        'evacuation route signage',
        'emergency evacuation plan example',
        'emergency and evacuation procedures',
        'example of an emergency evacuation plan',
        'emergency exit plan',
        'evacuation procedures',
        'emergency evacuation procedures in the workplace',
        'evacuation plan drawing',
        'emergency evacuation plan template',
        'free editable fire evacuation plan template',
        'family evacuation plan',
        'how to create an evacuation plan',
        'safety plan template',
        'fire safety plan',
    ],
    authors: [{ name: 'Md. Sabbir Hossain' }, { name: 'Md. Sabbir Hossain', url: 'https://www.evacuationplanservice.com/about' }],
    creator: 'Electron2Code',
    publisher: 'Israfil Mallick',
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    openGraph: {
        title: 'Md. Sabbir Hossain | Evacuation Plan Service',
        description: 'I am Md. Sabbir Hossain, I am a professional graphic designer full of knowledge and skills. I have a degree in graphic design with over 10 years of experience in fire emergency evacuation plans. I am a Level 2 seller working on fire emergency evacuation plans on Fiverr. I have been working on fire emergency evacuation plans on Fiverr since 2021. I have excellent knowledge of AutoCAD, Adobe Illustrator, Adobe Photoshop.Feel free to contact thanks!',
        type: 'website',
        siteName: 'Evacution Plan Service',
        countryName: "Bangladesh",
        phoneNumbers: ["+8801601770053"],
        emails: "evacuationplanservice@gmail.com",
    },
}

export default async function ServicesPage() {
    return (
        <div className="w-full relative overflow-x-hidden">
            <section className="py-8 md:py-10 lg:py-14 px-6 bg-slate-800">
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-bold text-blue-300 font-semibold">Our {" "}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-400 via-orange-500 to-red-600">Services</span>
                </h1>
            </section>
            <main className="w-full max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 relative">
                <Suspense fallback={<ServiceSkeleton />}>
                    <ServiceSectionGallery className="w-full p-5" limit={100} Carousel={ServiceCardCarousel} />
                </Suspense>
            </main>
        </div>
    )
}