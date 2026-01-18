"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface ContactFormValues {
    fullName: string;
    phoneNumber: string;
    email: string;
    propertyAddress: string;
    serviceCategory: string;
    serviceType: string;
    notes: string;
    imageKey?: string | null;
}

export async function createContactSubmission(data: ContactFormValues) {
    try {
        await prisma.contactSubmission.create({
            data: {
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                propertyAddress: data.propertyAddress,
                serviceCategory: data.serviceCategory,
                serviceType: data.serviceType,
                notes: data.notes,
                imageKey: data.imageKey,
            },
        });

        // revalidatePath("/dashboard/contacts"); // If there was a dashboard page for this
        return { success: true };
    } catch (error) {
        console.error("Failed to create contact submission:", error);
        return { error: "Failed to save submission" };
    }
}

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/s3Client";

export async function deleteContactImage(key: string) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        });

        await S3.send(command);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete image:", error);
        return { error: "Failed to delete image" };
    }
}
