import { BookUser, Boxes, BoxesIcon, FolderCode, HandHeart, HandPlatter, Home, Menu, Phone, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"

const links = [
    {
        icon: <Home className="w-4 h-4 text-red-600 group-hover:text-white" />,
        name: "Home",
        href: "/",
    },
    {
        icon: <BoxesIcon className="w-4 h-4 text-red-600 group-hover:text-white" />,
        name: "Services",
        href: "/services",

    },
    {
        icon: <FolderCode className="w-4 h-4 text-red-600 group-hover:text-white" />,
        name: "Portfolio",
        href: "/portfolio",
    },
    {
        icon: <Users className="w-4 h-4 text-red-600 group-hover:text-white" />,
        name: "About Us",
        href: "/about",
    },
]

export function MobileMenu() {
    return (
        <div className="flex flex-col">
            
        </div>
    )
}
