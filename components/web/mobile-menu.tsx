import { BookUser, Boxes, FolderCode, Home, Menu, Phone, Users } from "lucide-react"

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
        icon: <Boxes className="w-4 h-4 text-red-600 group-hover:text-white" />,
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
    {
        icon: <BookUser className="w-4 h-4 text-red-600 group-hover:text-white" />,
        name: "Contact",
        href: "/contact",
    },
]

export function MobileMenu() {
    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant="outline"><Menu className="size-6" /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="hidden">
                        <DrawerTitle>Menu</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="mt-3 flex flex-col gap-4">
                            {
                                links.map((link) => (
                                    <DrawerClose asChild key={link.name}>
                                        <Link href={link.href} className="flex justify-center gap-2 items-center text-gray-700 hover:bg-black/90 rounded border border-black/50 px-3 py-2 transition group">
                                            {link.icon}
                                            <div>
                                                <p className="text-xs text-gray-700 group-hover:text-white">{link.name}</p>
                                            </div>
                                        </Link>
                                    </DrawerClose>
                                ))
                            }
                            <DrawerClose asChild>
                                <Link href="https://wa.me/+8801601770053" target="_blank" className="flex justify-center gap-2 items-center text-gray-700 hover:bg-[#eb6635] rounded border border-black/50 px-3 py-2 transition group">
                                    <Phone className="w-4 h-4 text-red-600 group-hover:text-white" />
                                    <div>
                                        <p className="text-xs text-gray-700 group-hover:text-white">Whatsapp Us Now</p>
                                    </div>
                                </Link>
                            </DrawerClose>
                        </div>
                    </div>
                    <DrawerFooter className="hidden">
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
