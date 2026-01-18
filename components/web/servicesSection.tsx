import { Home, Sofa, AlertTriangle, Droplets } from 'lucide-react';
import { ServiceCard } from './serviceCard';
import prisma from '@/lib/prisma';
import ServiceSectionGallery from './service-section-gallery';

export default async function OurServices() {
    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl py-16 px-4 sm:px-6 lg:px-8 mx-auto min-h-screen">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Our Services
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Quality craftsmanship for your home's exterior needs
                    </p>
                </div>
                <div className='pt-20'>
                    <ServiceSectionGallery className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7' limit={6} />
                </div>
            </div>
        </section>
    );
}