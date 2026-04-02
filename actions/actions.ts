"use server";

import prisma from "@/lib/prisma"; // your prisma client
import { ServiceFormSchema, ServiceFormValues } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function createServiceAction(data: ServiceFormValues & { description: string }, serviceImagesKeys: string[]) {
    // 1. Validate data on server
    const result = ServiceFormSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    const { title, language, tiers } = result.data;
    const description = data.description; // Get description from form data (or you can handle it separately if needed)

    // 2. Create Service with Nested Writes (Transaction)
    try {
        const user = await currentUser();
        if (!user) {
            return { error: "Authentication Error" }
        }
        const service = await prisma.service.create({
            data: {
                title,
                language,
                description,
                ownerId: user.id, // Assumed you get this from session

                // Create Images relation
                images: {
                    create: serviceImagesKeys.map((key) => ({ key })),
                },

                // Create Tiers relation
                tiers: {
                    create: tiers.map((tier) => ({
                        type: tier.type,
                        title: tier.title,
                        description: tier.description,
                        price: tier.price,
                        deliveryTime: tier.deliveryTime,
                        projectSize: tier.projectSize,
                        evacuationPlan: tier.evacuationPlan,
                        floorPlanRedesign: tier.floorPlanRedesign,
                        sitePlan: tier.sitePlan,
                        zonePlan: tier.zonePlan,
                        revisions: tier.revisions,
                    })),
                },
            },
        });

        if (service) {
            return { data: service };
        }
    } catch (error) {
        console.error(error);
        return { error: "Database error" };
    }
}