"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const setBannerContent = async (content: string) => {
    try {
        const user = (await currentUser());
        if (!user) {
            return null;
        }
        if (user.publicMetadata.role !== "admin") {
            return null;
        }

        const existingBanner = await prisma.banner.findUnique({
            where: {
                creatorId: user.id
            }
        });

        // console.log(existingBanner);

        if (existingBanner) {
            const updatedBanner = await prisma.banner.update({
                where: {
                    creatorId: user.id,
                },
                data: {
                    content,
                },
            });
            return existingBanner;
        }

        const banner = await prisma.banner.create({
            data: {
                content,
                creator: {
                    connect: {
                        clerkId: user.id,
                    },
                },
            },
        });
        return banner;
    } catch (error) {
        console.log(error);
        return null;
    }
}