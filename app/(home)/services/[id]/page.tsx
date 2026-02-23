import ServiceCardCarousel from "@/components/web/service-card-carousel";
import ServicePackages from "@/components/web/service-packages";
import ReviewList from "@/components/web/review-list";
import AddReviewForm from "@/components/web/add-review-form";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import SignInAction from "@/components/web/SignInAction";
import { getService } from "@/lib/data";

interface ServiceDetailsProps {
    params: Promise<{ id: string }>
}


export async function generateMetadata(
    { params }: ServiceDetailsProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = (await params).id
    const service = await getService(id);

    return {
        title: service?.title,
        description: service?.description, generator: 'Next.js',
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
            title: service?.title,
            description: service?.description,
            url: `https://www.evacuationplanservice.com/services/${service?.id}`,
            siteName: 'Evacuation Plan Service',
            images: service?.images.map((image) => ({
                url: `${process.env.NEXT_PUBLIC_BUCKET_URL}/${image.key}`,
                width: 1800,
                height: 1600,
            })),
            locale: 'en_US',
            type: 'website',
        },
    }
}

export default async function ServiceDetails({ params }: ServiceDetailsProps) {
    const { id } = await params;
    const user = await auth();
    const service = await getService(id);
    if (!service) {
        return <div
            className="w-full min-h-screen flex flex-col items-center justify-center"
        >
            <h1 className="text-2xl text-gray-400 font-bold">Service Not Found :)</h1>
        </div>;
    }

    return (
        <section className="bg-gray-50 min-h-screen py-12">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                {/* Service Details Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="flex-1 min-w-0">
                        <ServiceCardCarousel images={service?.images.length ? service.images : []} />
                        <div className="mt-14 bg-white p-8 rounded shadow-sm border border-gray-200">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap wrap-anywhere">{service.description}</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-125 shrink-0 flex flex-col">
                        <div className="order-2 md:order-1">
                            <ServicePackages serviceTitle={service.title} serviceImageUrl={service.images[0]?.key || ""} serviceDescription={service.description} tiers={service?.tiers.length ? service.tiers : []} />
                        </div>

                        {/* Host Info */}
                        <div className="mt-6 bg-white p-6 order-1 md:order-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <Image
                                src={service.owner.imageUrl || ""}
                                alt={service.owner.name || "Owner"}
                                className="w-14 h-14 rounded-full object-cover border border-gray-100"
                                width={60}
                                height={60}
                            />
                            <div>
                                <p className="text-sm text-gray-500">Service provided by</p>
                                <p className="font-semibold text-gray-900 text-lg">{service.owner.name}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-gray-200 pt-12">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Review List */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Client Reviews
                                </h2>
                                <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {service.reviews.length} {service.reviews.length === 1 ? 'Review' : 'Reviews'}
                                </span>
                            </div>
                            <ReviewList reviews={service.reviews} />
                        </div>

                        {/* Add Review Form */}
                        <div className="lg:col-span-1">
                            {user.userId ? (
                                <div className="sticky top-8">
                                    <AddReviewForm serviceId={service.id} />
                                </div>
                            ) : (
                                <SignInAction />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}