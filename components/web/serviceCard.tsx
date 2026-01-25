import { Card, CardContent } from '@/components/ui/card';
import { BrickWallFire } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
    index?: number
    id?: string;
    title: string;
    description: string;
    images: {
        key: string
    }[];
    children?: React.ReactNode
}

export function ServiceCard({
    index = 0,
    id,
    title,
    description,
    images,
    children
}: ServiceCardProps) {
    if (children) {

        const oddOrEven = index + 1 ? (index + 1) % 2 : 0
        return (
            <Card className={`flex justify-between flex-col md:flex-row bg-gray-200 hover:border-orange-400 mt-10`}>
                <div className={`flex-1 shrink-0 min-w-sm md:min-w-md lg:min-w-lg ${oddOrEven ? "order-1 pl-8" : "order-2 pr-8"}`}>
                    {children}
                </div>
                <div className={`max-w-xl shirnk-1 wrap-break-word flex-1 flex flex-col gap-4 p-4 ${index && ((index + 1) % 2 !== 0) ? "order-2" : "order-1"}`}>
                    <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900'>{title}</h3>
                    <p className='text-slate-500 leading-relaxed wrap-break-word mt-4'>{description}</p>
                    <Link className="flex mt-5 items-center gap-2 text-[#f25f29] font-bold text-sm hover:text-[#d64d1c] transition-colors" href={`/services${id ? `/${id}` : ""}`}>Learn More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </Card>
        )
    } else {
        return (
            <Card className="w-full max-w-5xl mx-auto flex flex-row shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500 bg-gray-100">
                {/* Left Column: Content */}
                <div className="flex h-full flex-col items-start flex-1 shrink p-4">

                    {/* Icon Box */}
                    <div className="bg-[#7a2e12] p-3 rounded-xl flex items-center justify-center mb-8">
                        <BrickWallFire className="text-white w-7 h-7 stroke-2" />
                    </div>

                    <div className="space-y-3 mb-8">
                        <h3 className="text-2xl font-bold text-slate-900">
                            {title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed wrap-anywhere line-clamp-5">
                            {description}
                        </p>
                    </div>

                    {/* Link with hover effect */}
                    <Link
                        href="/services"
                        className="group flex items-center gap-2 text-[#f25f29] font-bold text-sm hover:text-[#d64d1c] transition-colors"
                    >
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Right Column: Image */}
                <div className="shrink-0 flex-1 h-full">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${images[0].key}`}
                        alt={images[0].key}
                        className="w-full min-w-50 h-full object-center object-cover"
                        width={300}
                        height={120}
                    />
                </div>
            </Card>
        )
    }
}