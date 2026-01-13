import PortfolioGallery from "@/components/web/protfolio-gallery";

export default function PortfolioPage() {
    return (
        <div>
            <header className="py-8 md:py-10 lg:py-14 px-6 bg-slate-800">
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-bold text-blue-300 font-semibold">Portfolio {" "}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-400 via-orange-500 to-red-600">Gallery</span>
                </h1>
            </header>
            <main className="w-full max-w-7xl mx-auto min-h-screen">
                <PortfolioGallery />
            </main>
        </div>
    )
}