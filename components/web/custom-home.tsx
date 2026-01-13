import { CheckCircle2, ArrowRight } from 'lucide-react';
import HeroBackground from './heroBackground';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

function App() {
    return (
        <div className="min-h-screen relative">
            <HeroBackground />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/60 to-black/50"></div>
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                            <span className="text-yellow-400 text-lg">⭐</span>
                            <span className="text-white text-sm font-medium">Most Trusted Emergency Fire Evacuation Plan Designer</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                            Expert Fire Evacuation
                        </h2>
                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-8 leading-tight">
                            Emergency Exit Planner
                        </h3>

                        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
                            Transforming Texas homes with award-winning craftsmanship, innovative solutions, and unwavering commitment to excellence
                        </p>

                        <Button className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 bg-linear-to-br from-orange-600 via-red-600 to-red-700 text-white shadow-premium hover:from-orange-500 hover:via-red-500 hover:to-red-600 group relative gradient-primary hover:shadow-glow text-lg px-20 py-5 h-auto font-semibold shine-effect overflow-hidden transition-all duration-300 hover:scale-105 rounded-full z-10">
                            <span className='leading-2'>Get Started on WhatsApp</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-20 max-w-2xl w-full">
                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Texas Licensed &</p>
                                    <p className="text-white font-semibold text-sm">Insured</p>
                                </div>
                            </div>
                        </Card>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Property Claims</p>
                                    <p className="text-white font-semibold text-sm">Assistance</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Google Rating</p>
                                    <div className="flex space-x-0.5 mt-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className="text-yellow-400 text-xs">⭐</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">24/7 Emergency</p>
                                    <p className="text-white font-semibold text-sm">Repairs</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 hover:bg-white/15 transition">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">Family owned and</p>
                                    <p className="text-white font-semibold text-sm">operated</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;