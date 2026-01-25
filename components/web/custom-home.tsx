import { CheckCircle2, ArrowRight } from 'lucide-react';
import HeroBackground from './heroBackground';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import prisma from '@/lib/prisma';
import parse from 'html-react-parser';
import Link from 'next/link';

interface review {
    id: string;
    rating: number;
    comment: string;
    serviceId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

async function App() {
    const reviews = await prisma.review.findMany();
    const banner = await prisma.banner.findFirst({
        include: {
            creator: false
        }
    }) || {
        content: `
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
        Expert Fire Evacuation
        </h2>
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-8 leading-tight">
        Emergency Exit Planner
        </h3>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
        Transforming Texas homes with award-winning craftsmanship, innovative solutions, and unwavering commitment to excellence
        </p>
        `};

    const contentReactNode = parse(banner.content);

    function calcAvgRating(reviews: review[]) {
        let totalRating = 0
        for (const review of reviews) {
            totalRating += review.rating;
        }

        return Number((totalRating / reviews.length).toFixed(1));
    }

    return (
        <div className="min-h-screen relative">
            <HeroBackground />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/60 to-black/50"></div>
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                            <span className="text-yellow-400 text-lg">🔥</span>
                            <span className="text-white text-sm font-medium">Fire Safety & Evacuation Planning Specialists</span>
                        </div>
                        <div className='content mb-7 text-shadow-zinc-400 text-shadow-2xs'>
                            {contentReactNode}
                        </div>
                        <Link href="/contact">
                            <Button className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 bg-linear-to-br from-orange-600 via-red-600 to-red-700 text-white shadow-premium hover:from-orange-500 hover:via-red-500 hover:to-red-600 group relative gradient-primary hover:shadow-glow text-lg px-20 py-5 h-auto font-semibold shine-effect overflow-hidden transition-all duration-300 hover:scale-105 rounded-full z-10">
                                <span className='leading-2'> Order Evacuation Plan Now</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 max-w-3xl w-full">
                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition flex items-center">
                            <div className="flex items-center space-x-3 h-full">
                                <div className="w-10 h-10 bg-teal-300 text-2xl rounded-full flex items-center justify-center shrink-0">
                                    🏢
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Suitable for All Building Types</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition flex items-center">
                            <div className="flex items-center space-x-3 h-full">
                                <div className="w-10 h-10 bg-gray-700 text-2xl rounded-full flex items-center justify-center shrink-0">
                                    ⏱
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">On-Time Delivery</p>

                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition flex items-center">
                            <div className="flex items-center space-x-3 h-full">
                                <div className="w-10 h-10 bg-gray-700 text-2xl rounded-full flex items-center justify-center shrink-0">
                                    ♻
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Unlimited Revisions</p>

                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition flex items-center">
                            <div className="flex items-center space-x-3 h-full">
                                <div className="w-10 h-10 bg-gray-700 text-2xl rounded-full flex items-center justify-center shrink-0">
                                    📞
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">After-Sales Assistance</p>

                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition flex items-center">
                            {reviews.length && <div className="flex items-center space-x-3 h-full justify-between">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Google Rating</p>
                                    <div className="flex space-x-0.5 mt-0.5">
                                        {[...new Array(calcAvgRating(reviews))].map((_, index) => (
                                            <span key={index} className="text-yellow-400 text-xs">⭐</span>
                                        ))}
                                    </div>
                                </div>
                            </div>}
                        </Card>
                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition flex items-center">
                            <div className="flex items-center space-x-3 h-full">
                                <div className="w-10 h-10 bg-teal-700 text-2xl rounded-full flex items-center justify-center shrink-0">
                                    📄
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Approved by Fire Safety Guidelines</p>

                                </div>
                            </div>
                        </Card>
                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition flex items-center">
                            <div className="flex items-center space-x-3 h-full">
                                <div className="w-10 h-10 bg-teal-400 text-2xl rounded-full flex items-center justify-center shrink-0">
                                    🧯
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Clear Exit Routes & Assembly Points</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;