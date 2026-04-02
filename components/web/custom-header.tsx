import { Phone } from "lucide-react";
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
                        <Image src="/emergency-evacuation-plan-service-main-logo.png" className="" width={300} height={80} alt="Evacuation Plan Service Logo" />
                    </div>

                    <div className="flex">
                        <DesktopMenu />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="https://wa.me/+8801601770053" target="_blank" className="hidden lg:flex gap-0.5 items-center text-gray-700 hover:bg-[#eb6635] rounded border border-black/50 px-3 py-2 transition group">
                            <Phone className="w-4 h-4 text-red-600 group-hover:text-white" />
                            <div>
                                <p className="text-xs text-gray-700 group-hover:text-white">Whatsapp Us Now</p>
                            </div>
                        </Link>
                        {
                            isAdmin && <Link className={buttonVariants({ variant: "outline", className: "text-gray-700 hover:text-gray-800 bg-transparent hover:bg-[#eb6635] group rounded border border-black/50" })} href="/dashboard">Go Dashboard</Link>
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