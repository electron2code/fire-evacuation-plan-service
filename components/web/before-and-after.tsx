"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
    {
        title: "Original floor plan to evacuation plan",
        before: "/I-will-design-emergency-exit-plan-evacuation-map-before1.jpeg",
        after: "/I-will-design-emergency-exit-plan-evacuation-map-after1.jpeg",
    },
    {
        title: "Hand sketch floor plan to evacuation plan",
        before: "/I-will-design-emergency-exit-plan-evacuation-map-before2.jpeg",
        after: "/I-will-design-emergency-exit-plan-evacuation-map-after2.jpeg",
    },
    {
        title: "Your projects floor video to evacuation plan",
        before: "/video-to-evacuation-plan-design-service1.mp4",
        after: "/video-to-evacuation-plan-after.jpeg",
    },
    {
        title: "Floor plan to zone plan",
        before: "/I-will-Fire-Alarm-Zone-Plan-1.jpeg",
        after: "/I-will-fire-alarm-zone-plan-2.jpeg",
    },
    {
        title: "Google map to site plan",
        before: "/I-will-Fire-site-Plan1.jpeg",
        after: "/I-will-Fire-site-Plan-after.jpeg",
    },
    {
        title: "Floor plan image to safety plan",
        before: "/I-will-design-emergency-exit-plan-evacuation-map-before.jpeg",
        after: "/I-will-design-emergency-exit-plan-evacuation-map-after6.jpeg",
    },
];

interface BeforeAfterCardProps {
    title: string;
    before: string;
    after: string;
}

function BeforeAfterCard({ title, before, after }: BeforeAfterCardProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState(50);
    const [dragging, setDragging] = useState(false);
    const [initialImageWidth, setInitialImageWidth] = useState<number | null>(null);


    useEffect(() => {
        if (containerRef.current && initialImageWidth === null) {
            setInitialImageWidth(containerRef.current.getBoundingClientRect().width);
        }
    }, [containerRef, initialImageWidth]);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
        setPos(percent);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-center mb-5">
                <div className="py-3 px-4 border border-black/50 rounded-sm">
                    <h3 className="text-center text-gray-700 font-semibold">{title}</h3>
                </div>
            </div>

            <div
                ref={containerRef}
                onMouseMove={handleMove}
                onMouseLeave={() => setDragging(false)}
                className="relative h-72 rounded-2xl overflow-hidden border border-black/20 select-none"
            >
                {/* AFTER IMAGE */}
                <Image
                    src={after}
                    alt="After"
                    fill
                    priority
                    className="object-cover object-center"
                />

                {/* BEFORE IMAGE */}
                <div
                    className="absolute z-5 inset-0 overflow-hidden bg-white"
                    style={{ width: `${pos}%` }}
                >
                    <div className="relative" style={{ width: `${initialImageWidth}px`, height: "100%" }}>

                        {before.slice(-4) === ".mp4" ? (
                            <video className="h-full w-full object-cover" width="320" height="240" autoPlay loop controls muted preload="none">
                                <source src={before} type="video/mp4" />
                                <track
                                    src="/path/to/captions.vtt"
                                    kind="subtitles"
                                    srcLang="en"
                                    label="English"
                                />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <Image
                                src={before}
                                alt="Before"
                                width={Number(initialImageWidth)}
                                height={200}
                                loading="lazy"
                                className="object-cover object-center h-full w-full"
                            />
                        )}

                        <span className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                            Before
                        </span>
                    </div>
                </div>

                {/* DIVIDER */}
                <div
                    onMouseDown={() => setDragging(true)}
                    className="absolute z-3 top-0 h-full w-1 bg-[#ff6a00] cursor-ew-resize"
                    style={{ left: `${pos}%` }}
                />

                {/* HANDLE */}
                <div
                    onMouseDown={() => setDragging(true)}
                    className="absolute z-5 top-1/2 -translate-y-1/2 bg-[#ff6a00]/90 rounded-full p-2 shadow cursor-ew-resize"
                    style={{ left: `calc(${pos}% - 18px)` }}
                >
                    <ChevronLeft size={16} className="text-gray-200" />
                    <ChevronRight size={16} className="text-gray-200" />
                </div>

                {/* LABELS */}

                <span className="absolute z-2 bottom-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                    After
                </span>
            </div>
        </div>
    );
}

export default function BeforeAfterShowcase() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 mt-5">
            <h2 className="text-center text-gray-700 text-3xl md:text-4xl font-bold mb-4">Before & After</h2>
            <p className="text-center text-gray-500">
                See the transformation our expert team delivers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-20 mt-12">
                {data.map((item, index) => (
                    <BeforeAfterCard key={index} {...item} />
                ))}
            </div>
        </section>
    );
}


