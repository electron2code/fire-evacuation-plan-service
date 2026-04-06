import { Facebook, Instagram, Clock4, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollToTopButton from './scroll-to-top-button';
import FooterServices from './footer-services';
import { Suspense } from 'react';

function Footer() {
    return (
        <footer className="bg-[#1a2332] text-white relative">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div>
                                <Image src="/emergency-evacuation-plan-service-footer.png" width={200} height={200} alt="Evacuation Plan Service Logo" />
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Evacuation Plan Service is a reliable and experienced organization that prepares effective and realistic Emergency Evacuation Plans to ensure the safety of people in emergency situations
                        </p>
                        <div className="flex gap-3">
                            <Link
                                target='_blank'
                                href="https://www.facebook.com/evacuationplanservice/"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link
                                target='_blank'
                                href="https://www.instagram.com/evacuation_plans/"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link
                                target='_blank'
                                href="https://www.behance.net/sabbir_hossain_53"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                                aria-label="Behance"
                            >
                                <svg width={25} height={24} id="OBJECTS" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.2 22.87"><defs><style></style></defs><path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={0.5} d="M-141.34,264.66a5.36,5.36,0,0,0,2.24-1.81,4.76,4.76,0,0,0,.76-2.77,5.8,5.8,0,0,0-.51-2.57,4.26,4.26,0,0,0-1.43-1.68,6.17,6.17,0,0,0-2.22-.9,13.27,13.27,0,0,0-2.86-.28h-10.35v22h10.64a11.47,11.47,0,0,0,2.87-.37,7.93,7.93,0,0,0,2.5-1.14,5.57,5.57,0,0,0,1.73-2,6.06,6.06,0,0,0,.64-2.88,6.07,6.07,0,0,0-1-3.52A5.19,5.19,0,0,0-141.34,264.66Zm-9.54-6.27h4.52a6.39,6.39,0,0,1,1.25.11,3,3,0,0,1,1.06.38,2.06,2.06,0,0,1,.75.77,2.59,2.59,0,0,1,.27,1.26,2.28,2.28,0,0,1-.83,2,3.45,3.45,0,0,1-2.13.62h-4.89Zm8.44,13a2.27,2.27,0,0,1-.78.87,3.43,3.43,0,0,1-1.14.47,6.6,6.6,0,0,1-1.36.14h-5.16v-6.05h5.26a4.09,4.09,0,0,1,2.52.72,2.87,2.87,0,0,1,.95,2.42A3,3,0,0,1-142.44,271.39Z" transform="translate(155.96 -254.4)" /><path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={0.5} d="M-120.35,266.17a8.8,8.8,0,0,0-1.39-3,7.15,7.15,0,0,0-2.48-2.11,7.63,7.63,0,0,0-3.54-.78,8.21,8.21,0,0,0-3.31.64,8,8,0,0,0-2.58,1.78,7.64,7.64,0,0,0-1.66,2.66,9.33,9.33,0,0,0-.59,3.33,9.73,9.73,0,0,0,.57,3.39,7.88,7.88,0,0,0,1.61,2.65,7.42,7.42,0,0,0,2.57,1.71,9.34,9.34,0,0,0,3.39.6,8.25,8.25,0,0,0,4.61-1.24,7.29,7.29,0,0,0,2.83-4.1h-3.84a2.87,2.87,0,0,1-1.17,1.41,3.92,3.92,0,0,1-2.28.66,3.9,3.9,0,0,1-2.83-1,4.48,4.48,0,0,1-1.08-3.08H-120A11.2,11.2,0,0,0-120.35,266.17Zm-11.17.79a4.93,4.93,0,0,1,.2-1,3.11,3.11,0,0,1,.59-1.12,3.48,3.48,0,0,1,1.1-.88,3.77,3.77,0,0,1,1.74-.36,3.29,3.29,0,0,1,2.47.89,4.3,4.3,0,0,1,1,2.52Z" transform="translate(155.96 -254.4)" /><rect fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={0.5} x="23.55" y="1.72" width="8.9" height="2.17" /></svg>
                            </Link>
                            <Link
                                target='_blank'
                                href="https://x.com/SHSHUVO47228012"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                                aria-label="Twitter"
                            >
                                <svg width={24} height={24} id="objects" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.06 211.43"><defs><style></style></defs><path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={7} d="M-1901.65,914.43l80.37-86h-30.52l-63.09,67.48-48.3-67.48h-83.48l84.51,118-84.51,90.39h30.52l67.22-71.9,51.48,71.9H-1814Zm-102-63.86h29.11L-1857,1014.78h-29.1Z" transform="translate(2050.12 -826.96)" /></svg>
                            </Link>
                            <Link
                                target='_blank'
                                href="https://www.linkedin.com/in/md-sabbir-hossain-259322213/"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors"
                                aria-label="Linkedin"
                            >
                                <svg width={24} height={24} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.87 72.96"><defs><style></style></defs><path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={0.5} d="M46.58,30.24c2.51-2.83,5.59-3.45,8.85-3.4a66.5,66.5,0,0,1,10.1.48,15.43,15.43,0,0,1,12.53,15c.09,10.68,0,21.36,0,32,0,1.42-.49,1.88-1.92,1.88q-7.39,0-14.8,0c-1.47,0-1.87-.41-1.87-1.88q0-13.59,0-27.16A6.36,6.36,0,0,0,55.81,41a6.23,6.23,0,0,0-6.8.67,5.85,5.85,0,0,0-2.5,4.91q0,13.64,0,27.27c0,2-.32,2.34-2.32,2.34H29.88c-1.56,0-1.95-.39-1.95-1.94q0-22.68,0-45.37c0-1.54.39-1.91,2-1.92H44.09c2.14,0,2.38.23,2.43,2.36C46.52,29.54,46.54,29.74,46.58,30.24ZM30.9,29.87V73.24H43.61V46.64a9.3,9.3,0,0,1,11.52-8.89c4.49,1.15,7.23,4.74,7.24,9.62,0,8.2,0,16.4,0,24.6v1.26H75.1a3.81,3.81,0,0,0,.07-.44c0-10.24.06-20.47,0-30.71a12.56,12.56,0,0,0-9.49-11.81c-2.51-.55-5.18-.34-7.77-.57-4.79-.43-8.74.94-11.6,5a1.89,1.89,0,0,1-1.73.56,2.16,2.16,0,0,1-.9-1.61,36.65,36.65,0,0,1,0-3.79Z" transform="translate(-3.49 -3.52)" /><path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={0.5} d="M22.61,51.56v22.5c0,1.84-.3,2.17-2.1,2.17H6.2C4.44,76.23,4,75.82,4,74.1V29.21C4,27.36,4.39,27,6.23,27H20.66c1.59,0,1.95.35,1.95,1.94ZM7,29.88V73.23H19.7V29.88Z" transform="translate(-3.49 -3.52)" /><path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={0.5} d="M13.26,22.88A9.56,9.56,0,1,1,23,13.36,9.59,9.59,0,0,1,13.26,22.88Zm.09-16.2A6.66,6.66,0,1,0,13.29,20a6.66,6.66,0,1,0,.06-13.32Z" transform="translate(-3.49 -3.52)" /></svg>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Services</h4>
                        <Suspense fallback={<div className="h-40 w-full bg-gray-300 rounded animate-pulse" />}>
                            <FooterServices />
                        </Suspense>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm"
                        >
                            Explore More →
                        </Link>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Global (Remote Service)</h4>
                        <p className="text-sm text-gray-300 mb-6">Proudly serving clients worldwide through digital delivery.</p>
                        <ul className="mb-6">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    United States
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    United Kingdom
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Australia
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Canada
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Middle East
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Europe
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Asia
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    And all country
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254.95 254.97"><defs><style></style></defs><path fill="#fff" d="M142.44,12.84c-69.48,0-126.3,56.69-126.3,126A125.78,125.78,0,0,0,32,199.66L13.79,267.81,82.38,249.6a126.8,126.8,0,0,0,60.06,15.27c69.48,0,126.3-56.69,126.3-126S211.92,12.84,142.44,12.84Zm0,228.24a99.06,99.06,0,0,1-52.11-14.69l-4.42-2.34L47.35,234.32l10.3-38.18L55,191.73a101.87,101.87,0,0,1-15-52.87C40,82.46,85.91,36.63,142.44,36.63S244.89,82.46,244.89,138.86,199,241.08,142.44,241.08Z" transform="translate(-13.79 -12.84)" /><path fill="#fff" d="M87,94a21,21,0,0,0,1.71,1.89q11.6,9.84,23.21,19.66a3,3,0,0,1,1,1.92,34.12,34.12,0,0,0,2,6.93c3.38,7.39,8.45,13.6,14.11,19.34a98.21,98.21,0,0,0,28.15,20.37c4.33,2,8.78,3.71,13.63,4a1.67,1.67,0,0,0,.54,0c2.1-.74,3.36.61,4.74,1.8q11.06,9.42,22.16,18.77a14.59,14.59,0,0,0,1.36.9,23.05,23.05,0,0,1-9.4,6.64c-6.85,2.65-13.9,2.6-21,1.33-11.62-2.08-22.17-6.9-32.15-13a142.62,142.62,0,0,1-41.91-38.6c-5.55-7.76-10.1-16-12.42-25.39-1.73-7-2-14,1-20.75C84.58,97.9,85.76,96.2,87,94Z" transform="translate(-13.79 -12.84)" /><path fill='#fff' d="M115.36,113.6,89.51,91.7c1.92-2.31,3.75-4.79,5.86-7a8,8,0,0,1,10.78-.61q7,5.72,13.76,11.65a8.16,8.16,0,0,1,.76,11.51C118.92,109.35,117.15,111.46,115.36,113.6Z" transform="translate(-13.79 -12.84)" /><path fill='#fff' d="M202,187l-26.06-22.07c2.34-2.54,4.53-5.4,7.2-7.7a7.62,7.62,0,0,1,9.58.22c4.71,3.88,9.38,7.81,14,11.84a8.14,8.14,0,0,1,1,10.89c-.16.22-.35.42-.53.63C205.4,182.85,203.68,184.93,202,187Z" transform="translate(-13.79 -12.84)" /></svg>
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
                                    <svg width={26} height={26} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326.7 226.4"><defs><style></style></defs><path fill="#fff" d="M184.9,21.5h129c20.7,0,34.3,13.6,34.3,34.3V213.6c0,20.4-13.7,34.2-34.1,34.2H55.4c-20.2,0-33.9-13.8-33.9-34V55.2c0-20.1,13.8-33.8,34-33.8Q120.3,21.55,184.9,21.5ZM42.7,231.9c4.2,3.2,8.6,3.5,13.2,3.5H313.8a16.81,16.81,0,0,0,4.5-.2c3-.8,5.9-1.8,9.5-2.9-31-35.3-61.3-69.8-91.7-104.5-1.2,1-2.1,1.8-3.1,2.6q-21.3,18.75-42.4,37.4c-4.6,4-6.8,4-11.3,0-15-13.2-30-26.4-45.2-39.9C103.6,162.6,73.3,197.1,42.7,231.9ZM47.4,35.1c46,40.6,91.7,80.9,137.5,121.4C230.8,116,276.4,75.7,322.3,35.2,317.3,33.3,53.6,33.2,47.4,35.1ZM34.7,222.5c30.6-34.8,60.2-68.7,90.1-102.7-29.4-25.9-58.3-51.5-87.3-77-.4.1-.9.1-1.3.2-.7,3.8-2.1,7.6-2.1,11.5Q34,134.75,34,214.9C34,217,34.4,219.2,34.7,222.5Zm299.6-1.4,1.1-.3c.1-2.3.4-4.6.4-7V55.3a18.5,18.5,0,0,0-.2-4.1c-.7-2.8-1.7-5.6-2.7-8.9-29.6,26.1-58.5,51.6-87.6,77.3C275,153.6,304.6,187.3,334.3,221.1Z" transform="translate(-21.5 -21.4)" /></svg>
                                </div>
                                <div>
                                    <Link
                                        href="mailto:evacuationplanservice@gmail.com"
                                        className="text-sm hover:text-orange-500 transition-colors break-all"
                                    >
                                        evacuationplanservice@gmail.com
                                    </Link>
                                    <p className="text-xs text-gray-400">Official Email</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                    <Clock4 className='w-7 h-7' />
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
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>&copy; 2026 Evacuation Plan Service. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <span className="text-xs">
                                Developed by <span className="text-white">electron2code</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed top-0 right-0 flex justify-end pointer-events-none">
                <div className="pointer-events-auto">
                    <ScrollToTopButton />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
