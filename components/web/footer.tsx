"use client";

import { Facebook, Instagram, Mail, Phone, ArrowUp, Clock1 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#1a2332] text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            {/* <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-500">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                </svg>
                            </div> */}
                            <div>
                                <Image src="/footer-logo.png" width={200} height={200} alt="Evacuation Plan Service Logo" />
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Evacuation Plan Service is a reliable and experienced organization that prepares effective and realistic Emergency Evacuation Plans to ensure the safety of people in emergency situations
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="#"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Services</h4>
                        <ul className="space-y-3 mb-6">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Emergency Evacuation Plans
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Site Map Planning
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Google Map Planning
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Floor Plan Re-Design
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Plan Updates & Revisions
                                </Link>
                            </li>
                        </ul>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm"
                        >
                            Explore More →
                        </Link>
                    </div>

                    {/* <div>
                        <h4 className="font-bold text-lg mb-6">Service Areas</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            Proudly serving the DFW Metroplex & Central Texas
                        </p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span className="text-gray-300 text-sm">Dallas, TX</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span className="text-gray-300 text-sm">Arlington, TX</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span className="text-gray-300 text-sm">Mansfield, TX</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span className="text-gray-300 text-sm">Fort Worth, TX</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span className="text-gray-300 text-sm">Irving, TX</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                    <span className="text-gray-300 text-sm">Killeen, TX</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-xs">& surrounding areas</p>
                    </div> */}

                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                    <svg fill="#fefefe" width="64px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#fefefe"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>whatsapp</title> <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path> </g></svg>
                                </div>
                                <div>
                                    <Link href="https://wa.me/+8801601770053" className="font-semibold hover:text-orange-500 transition-colors">
                                        1601770053
                                    </Link>
                                    <p className="text-xs text-gray-400">Main Office</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <Link
                                        href="mailto:example@gmail.com"
                                        className="text-sm hover:text-orange-500 transition-colors break-all"
                                    >
                                        example@gmail.com
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                    <Clock1 className='w-5 h-5' />
                                </div>
                                <div>
                                    <p>
                                        Business Hours:
                                    </p>
                                    <p>Available 24/7 (All Time)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8">
                    <div className="mb-8">
                        <h5 className="text-xs font-semibold text-gray-400 mb-4 tracking-wider">
                            CERTIFICATIONS & RECOGNITION
                        </h5>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/5 rounded-lg px-4 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">BBB</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold">BBB</p>
                                    <p className="text-xs text-gray-400">Accredited</p>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg px-4 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">G</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Google Rating</p>
                                    <div className="flex items-center gap-1">
                                        <span className="font-bold">5.0</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-yellow-400 text-xs">★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg px-4 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Texas</p>
                                    <p className="text-xs font-semibold">Licensed & Insured</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>© 2026 Southern Traditions Roofing & Construction LLC. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <span className="text-xs">
                                Developed by <span className="text-white">electron2code</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                className="fixed bottom-20 right-8 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </footer>
    );
}

export default Footer;
