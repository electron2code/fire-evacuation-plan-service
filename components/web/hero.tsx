import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { HeroSlider } from "./heroSlider";
import { Phone } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="flex justify-center items-center min-h-screen gap-20">
            <article className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span>Professional Fire Safety Planning</span></div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">Expert Fire Evacuation<span className="text-red-600"> Plan Design</span></h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mt-4 md:mt-6 lg:mt-8">Protect lives with professionally designed emergency evacuation plans. Compliant, clear, and customized for your commercial, residential, or industrial property.</p>

                <ul className="list-style mt-4">
                    <li className="list-style">Fully compliant with safety regulations and codes</li>
                    <li>Clear, professional designs easy to understand</li>
                    <li>Fast turnaround with unlimited revisions</li>
                </ul>
                <div className="flex justify-center md:justify-start gap-4 mt-6">
                    <Button className="bg-green-600 cursor-pointer hover:scale-105"><Phone className="size-4" /> Get Started on WhatsApp</Button>{" "}
                    <Link href="/services" className={`${buttonVariants({variant: "outline"})}bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer hover:scale-105 transition-all`} >View Services</Link>
                </div>
            </article>
            <div className="hidden md:flex flex-1 overflow-hidden pr-20 justify-end">
                <HeroSlider />
            </div>
        </section>
    )
}