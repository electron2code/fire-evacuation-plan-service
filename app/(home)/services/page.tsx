import ServiceCardCarousel from "@/components/web/service-card-carousel";
import ServiceSectionGallery from "@/components/web/service-section-gallery";

export default async function ServicesPage() {
    return (
        <div className="w-full relative overflow-x-hidden">
            <section className="py-8 md:py-10 lg:py-14 px-6 bg-slate-800">
                <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-bold text-blue-300 font-semibold">Our {" "}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-400 via-orange-500 to-red-600">Services</span>
                </h1>
            </section>
            <main className="w-full max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 relative">
                <ServiceSectionGallery className="w-full p-5" limit={100} Carousel={ServiceCardCarousel} />
            </main>
        </div>
    )
}