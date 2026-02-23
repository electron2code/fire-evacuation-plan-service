import { cache } from 'react'
import prisma from './prisma'

// getPost will be used twice, but execute only once
export const getService = cache(async (id: string) => {
    const service = await prisma.service.findUnique({
        where: { id },
        include: {
            images: true,
            owner: {
                select: {
                    id: false,
                    clerkId: false,
                    name: true,
                    email: true,
                    imageUrl: true,
                    services: false,
                    reviews: false,
                }
            },
            tiers: true,
            reviews: {
                include: {
                    user: {
                        select: {
                            name: true,
                            imageUrl: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            },
        },
    });
    return service
});
export const getBanner = cache(async () => {
    const banner = await prisma.banner.findFirst();
    const bannerImages = await prisma.bannerImage.findMany();
    return { banner, bannerImages };
});