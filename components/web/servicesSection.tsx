import { Suspense } from 'react';
import ServiceSectionGallery from './service-section-gallery';
import ServiceSkeleton from './service-skeleton';

export default async function OurServices() {
    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl py-16 px-4 sm:px-6 lg:px-8 mx-auto min-h-screen">
                <div className="text-center mb-6 md:mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        All plans are compliant, clear, and professionally designed.
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Quality craftsmanship for your home's exterior needs
                    </p>
                </div>
                <div className='pt-20'>
                    <Suspense fallback={<ServiceSkeleton />}>
                        <ServiceSectionGallery className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-7 items-center' limit={6} />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}