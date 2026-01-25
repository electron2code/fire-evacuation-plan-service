'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Star, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Testimonial {
    user: {
        id: string;
        name: string | null;
        imageUrl: string | null;
    };
    id: string;
    rating: number;
    comment: string;
    serviceId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
                        }`}
                />
            ))}
        </div>
    );
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    const [api, setApi] = useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setSelectedIndex(api.selectedScrollSnap());

        api.on('select', () => {
            setSelectedIndex(api.selectedScrollSnap());
        });
    }, [api]);

    // Auto-play functionality
    useEffect(() => {
        if (!api) {
            return;
        }

        const interval = setInterval(() => {
            api.scrollNext();
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(interval);
    }, [api]);

    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Read reviews from satisfied Texas homeowners
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative px-4">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: 'center',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-6 py-10">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className={`pl-6 basis-full md:basis-[70%] lg:basis-[35%] transition-all duration-500 ease-in-out ${index === selectedIndex
                                        ? 'opacity-100 scale-100 z-10'
                                        : 'opacity-30 scale-90 z-0'
                                        }`}
                                >
                                    <Card className="border-gray-200 bg-red-100/50 shadow-sm hover:shadow-md transition-shadow h-full">
                                        <CardContent className="p-6 flex flex-col h-full">
                                            {/* Header with avatar and info */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                                                        <Image src={testimonial.user.imageUrl ? testimonial.user.imageUrl : ""} width={60} height={60} alt={`profile of ${testimonial.user.name}`} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">
                                                            {testimonial.user.name}
                                                        </h4>
                                                        <StarRating rating={testimonial.rating} />
                                                    </div>
                                                </div>
                                                {testimonial.user.name && (
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0"
                                                    >
                                                        BBB
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Date */}
                                            <p className="text-sm text-gray-500 mb-3" suppressHydrationWarning>{new Date(testimonial.createdAt).toLocaleDateString()}</p>

                                            {/* Review text */}
                                            <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">
                                                {testimonial.comment}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <span className="text-sm text-gray-600">Google</span>
                                                {testimonial.user.name && (
                                                    <div className="flex items-center gap-1 text-emerald-600">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Verified</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation buttons at bottom center */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <CarouselPrevious className="static translate-y-0" />
                            <CarouselNext className="static translate-y-0" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
