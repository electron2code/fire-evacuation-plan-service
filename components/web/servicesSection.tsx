import { Home, Sofa, AlertTriangle, Droplets } from 'lucide-react';
import { ServiceCard } from './serviceCard';

export default function OurServices() {
    const services = [
        {
            icon: Home,
            title: 'Roof Replacement',
            description:
                'Complete roof replacement using premium materials. We work with asphalt shingles, metal roofing, and tile to give your Texas home maximum protection against storms and extreme weather.',
            imageUrl: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=400&h=500',
            imageAlt: 'House with new roof',
        },
        {
            icon: Sofa,
            title: 'Interior Repairs',
            description:
                'Transform your living spaces with our expert interior remodeling services. From kitchen and bathroom renovations to complete home makeovers, we bring your vision to life with quality craftsmanship.',
            imageUrl: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400&h=500',
            imageAlt: 'Interior renovation work',
        },
        {
            icon: AlertTriangle,
            title: 'Emergency Services',
            description:
                'Available 24/7 for urgent repairs and emergency situations. Whether it\'s storm damage, water leaks, or structural issues, our rapid response team is ready to protect your property.',
            imageUrl: 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=400&h=500',
            imageAlt: 'Emergency repair service',
        },
        {
            icon: Droplets,
            title: 'Gutter Replacement',
            description:
                'Professional gutter installation and replacement services to protect your home from water damage. We offer seamless gutters, gutter guards, and complete drainage solutions.',
            imageUrl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=400&h=500',
            imageAlt: 'Gutter installation',
        },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Our Services
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Quality craftsmanship for your home's exterior needs
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}