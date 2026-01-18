'use server'

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ReviewSchema } from "@/schema/schema";
import { revalidatePath } from "next/cache";

export async function createReview(prevState: any, formData: FormData) {
    const user = await auth();
    const userId = user.userId;

    if (!userId) {
        return { message: "Unauthorized", success: false };
    }

    const rawData = {
        rating: formData.get("rating"),
        comment: formData.get("comment"),
        serviceId: formData.get("serviceId"),
    };

    const validatedData = ReviewSchema.safeParse(rawData);

    if (!validatedData.success) {
        return {
            message: "Invalid data",
            errors: validatedData.error.flatten().fieldErrors,
            success: false
        };
    }

    try {
        await prisma.review.create({
            data: {
                rating: validatedData.data.rating,
                comment: validatedData.data.comment,
                serviceId: validatedData.data.serviceId,
                userId: userId,
            },
        });

        revalidatePath(`/services/${validatedData.data.serviceId}`);
        return { message: "Review added successfully", success: true };
    } catch (error) {
        console.error("Failed to create review:", error);
        return { message: "Failed to create review", success: false };
    }
}
