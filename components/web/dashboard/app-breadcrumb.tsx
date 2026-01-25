"use client";
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";

export default function AppBreadcrumb() {
    const pathname = usePathname();

    const locations = pathname.split("/");

    console.log(locations);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    locations.map((location, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    {pathname === (index === 0 ? '/' : locations.slice(0, index + 1).join("/")) ? <BreadcrumbPage>
                                        <Link href={index === 0 ? '/' : locations.slice(0, index + 1).join("/")}>{location === "" ? "Home" : location.charAt(0).toUpperCase() + location.slice(1)}</Link>
                                    </BreadcrumbPage> :
                                        <Link href={index === 0 ? '/' : locations.slice(0, index + 1).join("/")}>{location === "" ? "Home" : location.charAt(0).toUpperCase() + location.slice(1)}</Link>
                                    }
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {
                                index !== (pathname.length - 1) && <BreadcrumbSeparator />
                            }
                        </div>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
