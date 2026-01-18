"use server";

import prisma from "@/lib/prisma";
import { ServiceFormSchema, ServiceFormValues } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateServiceAction(serviceId: string, data: ServiceFormValues) {
    // 1. Validate data
    const result = ServiceFormSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data", details: result.error.flatten() };
    }

    const { title, language, description, tiers } = result.data;

    try {
        const user = await currentUser();
        if (!user) {
            return { error: "Authentication Error" };
        }

        // Verify ownership (optional but recommended)
        const existingService = await prisma.service.findUnique({
            where: { id: serviceId },
        });

        if (!existingService || existingService.ownerId !== user.id) {
            // Note: Schema uses clerkId for ownerId relationship, check schema if needed. 
            // In createServiceAction: ownerId: user.id. 
            // In Schema: owner User @relation(fields: [ownerId], references: [clerkId])
            // So ownerId matches Clerk User ID.
            return { error: "Service not found or unauthorized" };
        }

        /* 
           Update Strategy:
           - Update basic fields (title, description, etc.)
           - For Tiers: Delete existing tiers and recreate them. 
             This avoids complex diffing since there are only 3 fixed tiers usually.
             If you want to preserve IDs, you'd need to map them, but recreation is simpler for this structure.
        */

        await prisma.$transaction(async (tx) => {
            // Update Service
            await tx.service.update({
                where: { id: serviceId },
                data: {
                    title,
                    language,
                    description,
                },
            });

            // Delete existing images
            await tx.serviceImage.deleteMany({
                where: { serviceId: serviceId },
            });

            // Create new images
            if (result.data.imageKeys && result.data.imageKeys.length > 0) {
                await tx.serviceImage.createMany({
                    data: result.data.imageKeys.map((key) => ({
                        serviceId: serviceId,
                        key: key,
                    })),
                });
            }

            // Delete existing tiers
            await tx.serviceTier.deleteMany({
                where: { serviceId: serviceId },
            });

            // Create new tiers
            await tx.serviceTier.createMany({
                data: tiers.map((tier) => ({
                    serviceId: serviceId,
                    type: tier.type,
                    title: tier.title,
                    description: tier.description,
                    price: tier.price,
                })),
            });
        });

        revalidatePath("/dashboard/services/all-services");
        revalidatePath(`/services/${serviceId}`);
        return { success: true };

    } catch (error) {
        console.error("Update service error:", error);
        return { error: "Database error during update" };
    }
}
