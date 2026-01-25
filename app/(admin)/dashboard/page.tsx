import Hero from "@/components/web/dashboard/hero";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const user = await currentUser();
    let heroContent: string = "";
    if (user?.publicMetadata.role === "admin") {
        const banner = await prisma.banner.findUnique({
            where: {
                creatorId: user.id,
            }
        });
        heroContent = banner?.content || ""
    }
    return (
        <div className="w-full">
            <Hero heroContent={heroContent} />
        </div>
    )
}