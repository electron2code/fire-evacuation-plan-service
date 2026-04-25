'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
                />
            ))}
        </div>
    );
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
        Autoplay({ delay: 4000, stopOnInteraction: false })
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        setSelectedIndex(emblaApi.selectedScrollSnap());

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        What Our <span className="text-orange-600">Customers Say</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Read reviews from satisfied clients who trusted us for their fire evacuation planning needs.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Main Carousel */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 pl-4 pr-4"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mx-2 transform transition-all duration-300 hover:shadow-xl">
                                        {/* Quote Icon */}
                                        <div className="mb-6">
                                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                                <Quote className="w-6 h-6 text-orange-600" />
                                            </div>
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                            "{testimonial.comment}"
                                        </p>

                                        {/* Divider */}
                                        <div className="h-px bg-gray-100 mb-6" />

                                        {/* Author Info */}
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                                    {testimonial.user.imageUrl ? (
                                                        <Image
                                                            src={testimonial.user.imageUrl}
                                                            alt={testimonial.user.name || 'User'}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-orange-600 text-white text-xl font-semibold">
                                                            {testimonial.user.name?.[0]?.toUpperCase() || 'U'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 text-lg">
                                                        {testimonial.user.name || 'Anonymous'}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <StarRating rating={testimonial.rating} />
                                                        <span className="text-gray-500 text-sm">
                                                            {testimonial.rating}/5
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 text-emerald-600">
                                                    <CheckCircle2 size={18} />
                                                    <span className="text-sm font-medium">Verified</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <p className="text-gray-400 text-sm mt-4">
                                            {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-all duration-200"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-all duration-200"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === selectedIndex
                                        ? 'bg-orange-600 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
