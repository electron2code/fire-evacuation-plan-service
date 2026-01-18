import ServiceCardCarousel from "@/components/web/service-card-carousel";
import ServicePackages from "@/components/web/service-packages";
import ReviewList from "@/components/web/review-list";
import AddReviewForm from "@/components/web/add-review-form";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";

interface ServiceDetailsProps {
    params: Promise<{ id: string }>
}

export default async function ServiceDetails({ params }: ServiceDetailsProps) {
    const { id } = await params;
    const user = await auth();
    const service = await prisma.service.findUnique({
        where: { id },
        include: {
            images: true,
            owner: {
                select: {
                    id: false,
                    clerkId: false,
                    name: true,
                    email: true,
                    imageUrl: true,
                    services: false,
                    reviews: false,
                }
            },
            tiers: true,
            reviews: {
                include: {
                    user: {
                        select: {
                            name: true,
                            imageUrl: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
        },
    });

    if (!service) {
        return <div>Service not found</div>;
    }

    return (
        <section className="bg-gray-50 min-h-screen py-12">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 space-y-12">
                {/* Service Details Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="flex-1 min-w-0">
                        <ServiceCardCarousel images={service?.images.length ? service.images : []} />
                        <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{service.description}</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-[500px] shrink-0">
                        <ServicePackages tiers={service?.tiers.length ? service.tiers : []} />

                        {/* Host Info */}
                        <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <img
                                src={service.owner.imageUrl || ""}
                                alt={service.owner.name || "Owner"}
                                className="w-14 h-14 rounded-full object-cover border border-gray-100"
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
                                <div className="bg-amber-50 rounded-xl p-8 text-center border border-amber-100 sticky top-8">
                                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageSquarePlus className="w-8 h-8 text-amber-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Have you used this service?</h3>
                                    <p className="text-gray-600 mb-6">Log in to share your experience with the community.</p>
                                    <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
                                        <Link href="/sign-in">Sign In to Review</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}