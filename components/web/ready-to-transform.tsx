import Link from "next/link";

export default function ReadyToTransform() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden z-10 bg-slate-900 text-white">
            <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
                <div className="relative text-center max-w-4xl mx-auto">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl animate-float">
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Make Your <span className="relative inline-block"><span className="relative z-10 bg-clip-text text-transparent bg-linear-to-r from-amber-400 via-orange-500 to-red-600">Building</span><span className="absolute inset-0 blur-xl bg-linear-to-r from-amber-400 via-orange-500 to-red-600 opacity-40"></span></span> Safer?
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">Request your evacuation plan today and ensure your building is prepared with internationally compliant, life-safety focused solutions.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link className="justify-center whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 bg-linear-to-br from-orange-600 via-red-600 to-red-700 text-white hover:shadow-premium-lg hover:scale-105 hover:from-orange-500 hover:via-red-500 hover:to-red-600 h-14 rounded-xl shadow-glow-hover group px-10 py-8 text-base flex items-center" href="/contact">Request Evacuation Plan<span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span></Link>

                        <Link className=" justify-center whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/40 shadow-premium h-14 rounded-xl px-10 py-8 text-base group flex items-center" href="/services">Learn More About Our Services<span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}