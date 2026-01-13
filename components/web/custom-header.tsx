import { ArrowRight, Home, Phone } from "lucide-react";
import Link from "next/link";
import AuthAction from "./authAction";
import { currentUser } from "@clerk/nextjs/server";
import { buttonVariants } from "../ui/button";

export default async function CustomHeader() {
    const user = await currentUser()
    let isAdmin = false;
    if (user?.publicMetadata.role === "admin") {
        console.log("admin");
        isAdmin = true;
    }
    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                            <Home className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Southern Traditions</h1>
                            <p className="text-xs text-gray-600 tracking-wide">TEXAS ROOFING & CONSTRUCTION</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-red-600 font-medium hover:text-red-700 transition">Home</Link>
                        <Link href="/services" className="text-gray-700 hover:text-red-600 transition">Services</Link>
                        <Link href="/portfolio" className="text-gray-700 hover:text-red-600 transition">Portfolio</Link>
                        <Link href="/about-us" className="text-gray-700 hover:text-red-600 transition">About Us</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-red-600 transition">Contact</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="hidden lg:flex items-center space-x-2 text-gray-700">
                            <Phone className="w-4 h-4 text-red-600" />
                            <div>
                                <p className="text-xs text-gray-500">Call Us Now</p>
                                <p className="text-sm font-semibold">(318) 609-3348</p>
                            </div>
                        </div>
                        {
                            isAdmin ? <Link className={buttonVariants({ variant: "outline", className: "bg-transparent text-black/50 hover:text-black/70 border border-black/50" })} href="/dashboard">Go Dashboard</Link> : (
                                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-medium transition flex items-center space-x-2 shadow-lg">
                                    <span>Free Inspection</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            )
                        }
                        <AuthAction />
                    </div>
                </div>
            </div>
        </header>
    )
}