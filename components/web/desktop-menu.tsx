"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Services",
        href: "/services",
    },
    {
        name: "Portfolio",
        href: "/portfolio",
    },
    {
        name: "About Us",
        href: "/about",
    },
    {
        name: "Contact",
        href: "/contact",
    }
]

export default function DesktopMenu() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center space-x-8">
            {
                links.map((link) => (
                    <Link key={link.name} href={link.href} className={pathname === link.href ? `text-red-600 font-medium hover:text-red-700 transition` : `text-gray-800 hover:text-gray-700`}>{link.name}</Link>
                ))
            }
        </nav>
    )
}