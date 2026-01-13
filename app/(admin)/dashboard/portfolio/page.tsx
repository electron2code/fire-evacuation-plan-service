import PortfolioGallery from "@/components/web/dashboard/portfolio-gallery";
import UploadPortfolio from "@/components/web/dashboard/upload-portfolio";

export default function PortfolioPage() {
    return (
        <div>
            <div className="bg-blue-400 flex items-center justify-center gap-4 md:gap-8 flex-wrap dark:bg-black/50 min-h-80 px-6">
                <h1 className="dark:text-transparent bg-linear-to-r from-blue-800 to-blue-300 bg-clip-text text-3xl md:text-4xl lg:text-5xl transition-all">Upload Your Portfolio Here</h1>
                <UploadPortfolio />
            </div>
            <PortfolioGallery />
        </div>
    )
}