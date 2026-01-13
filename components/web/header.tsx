import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import AuthAction from "./authAction";
import { currentUser } from "@clerk/nextjs/server";

export default async function Header() {
    const user = await currentUser();
    const role = user?.publicMetadata.role;
    return (
        <header className="flex justify-between items-center py-4 gap-4 w-full sticky top-0 z-10">
            <div className="flex items-center">
                <h1 className="text-xl font-bold"><span className="text-red-500">FireSafe</span> Plans</h1>
            </div>
            <nav className="flex items-center gap-2">
                <Link className={buttonVariants({variant: "ghost"})} href="/">Home</Link>
                <Link className={buttonVariants({variant: "ghost"})} href="/">Services</Link>
                <Link className={buttonVariants({variant: "ghost"})} href="/">Portfolio</Link>
                <Link className={buttonVariants({variant: "ghost"})} href="/">Reviews</Link>
                <Link className={buttonVariants({variant: "ghost"})} href="/">Contact</Link>
                {role === "admin" && <Link className={buttonVariants({variant: "ghost"})} href="/dashboard">Go Dashboard</Link>}
                <AuthAction />
            </nav>
        </header>
    )
}