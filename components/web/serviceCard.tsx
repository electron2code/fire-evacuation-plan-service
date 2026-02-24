import { Card } from '@/components/ui/card';
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
            <Card className={`flex p-0 justify-between items-center border border-gray-100/70 flex-col md:flex-row hover:border-orange-400 my-16 shadow-lg transition-transform duration-300 hover:-translate-y-1 max-w-5xl mx-auto backdrop-filter backdrop-blur-md bg-linear-to-r from-gray-100 to-gray-200`}>
                <div className={`flex-1 p-8 shrink-0 min-w-sm md:min-w-md lg:min-w-lg ${oddOrEven ? "order-1" : "order-2"}`}>
                    {children}
                </div>
                <div className={`max-w-xl shrink wrap-break-word flex-1 flex flex-col gap-4 p-7 ${index && ((index + 1) % 2 !== 0) ? "order-2" : "order-1"}`}>
                    <div className='flex-1'>
                        <h3 className='text-2xl md:text-3xl mb-10 font-bold text-slate-700'>{title}</h3>
                        <p className='text-slate-500 leading-relaxed wrap-anywhere mt-4'>{description}</p>
                    </div>
                    <div className='flex'>
                        <Link className="group flex rounded-full border border-white hover:border-orange-500 items-center gap-1 py-2 px-3 text-white font-bold text-sm bg-linear-to-r from-[#9dc94b] to-[#ff6a00] transition-all hover:scale-105" href={`/services${id ? `/${id}` : ""}`}>Learn More
                            <div className='border-r-2 border-white h-5' />
                            <ArrowRight className='size-3 text-white font-bold group-hover:translate-x-1' />
                        </Link>
                    </div>
                </div>
            </Card>
        )
    } else {
        return (
            <Card className="w-full p-0 border px-2 border-gray-300/80 max-w-5xl overflow-hidden mx-auto flex flex-col items-center md:flex-row shadow-[0_10px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500 bg-gray-100">
                {/* Left Column: Content */}
                <div className="flex-1 order-2 md:order-1 h-full w-full md:w-1/2 flex flex-col items-start shrink py-4 px-3">
                    <div className="space-y-3 mb-8 flex-1">
                        <h3 className="text-2xl font-bold text-slate-900">
                            {title}
                        </h3>
                        <p className="text-slate-700 leading-relaxed wrap-anywhere line-clamp-3">
                            {description}
                        </p>
                    </div>

                    {/* Link with hover effect */}
                    <Link
                        href="/services"
                        className="group flex rounded-full border border-white hover:border-orange-500 items-center gap-1 py-2 px-3 text-white font-bold text-sm bg-linear-to-r from-[#9dc94b] to-[#ff6a00] transition-all hover:scale-105"
                    >
                        Learn More
                        <div className='border-r-2 border-white h-5' />
                        <ArrowRight className='size-3 text-white font-bold group-hover:translate-x-1' />
                    </Link>
                </div>

                {/* Right Column: Image */}
                <div className="shrink-0 order-1 md:order-2 flex-1 flex items-center justify-center h-full w-full md:w-1/2 overflow-hidden bg-gray-400">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/${images[0].key}`}
                        alt={images[0].key}
                        className="w-full min-w-50 h-full object-center object-contain"
                        width={1000}
                        height={720}
                    />
                </div>
            </Card>
        )
    }
}