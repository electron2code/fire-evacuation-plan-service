"use client"

import * as React from "react"
import { Menu } from "lucide-react"

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
                                        <Link href={link.href}>{link.name}</Link>
                                    </DrawerClose>
                                ))
                            }
                        </div>
                    </div>
                    <DrawerFooter className="hidden">
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
