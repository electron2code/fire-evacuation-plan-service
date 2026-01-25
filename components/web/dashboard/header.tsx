import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import ThemeToggle from "../theme-toggle";
import AppBreadcrumb from "./app-breadcrumb";


export default function Header() {
    return (
        <header className="flex items-center justify-between h-16 pr-4 sticky top-0 z-10 bg-secondary/95">
            <SidebarTrigger />
            <AppBreadcrumb />
            <div className="flex h-full items-center gap-4">
                <ThemeToggle />
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </header>
    );
}