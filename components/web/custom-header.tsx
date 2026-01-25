import { ArrowRight, Home, Phone } from "lucide-react";
import Link from "next/link";
import AuthAction from "./authAction";
import { currentUser } from "@clerk/nextjs/server";
import { buttonVariants } from "../ui/button";
import { MobileMenu } from "./mobile-menu";
import DesktopMenu from "./desktop-menu";
import Image from "next/image";

export default async function CustomHeader() {
    const user = await currentUser()
    let isAdmin = false;
    if (user?.publicMetadata.role === "admin") {
        console.log("admin");
        isAdmin = true;
    }
    return (
        <header className="backdrop-blur-sm shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-gray-300/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-3">
                        <Image src="/logo.png" className="" width={200} height={50} alt="Evacuation Plan Service Logo" />
                    </div>

                    <div className="flex">
                        <DesktopMenu />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="https://wa.me/+8801601770053" target="_blank" className="hidden lg:flex items-center space-x-2 text-gray-700">
                            <Phone className="w-4 h-4 text-red-600" />
                            <div>
                                <p className="text-xs text-gray-500">Call Us Now</p>
                                <p className="text-sm font-semibold">+880 1601-770053</p>
                            </div>
                        </Link>
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
                    <div className="flex md:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}