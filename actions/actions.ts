"use server";

import prisma from "@/lib/prisma"; // your prisma client
import { ServiceFormSchema, ServiceFormValues } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createServiceAction(data: ServiceFormValues, serviceImagesKeys: string[]) {
    // 1. Validate data on server
    const result = ServiceFormSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid data" };
    }

    const { title, language, description, tiers, imageKeys } = result.data;

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

    redirect("/dashboard");
}