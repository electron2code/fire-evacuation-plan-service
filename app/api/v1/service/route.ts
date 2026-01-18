import prisma from "@/lib/prisma";
import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import { z } from "zod"

const DeleteRequestSchema = z.object({
    serviceId: z.string(),
})

export async function DELETE(request: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized Access", success: false, data: null }, { status: 401 });
        }

        const { serviceId } = await request.json();
        const validation = DeleteRequestSchema.safeParse({ serviceId });

        if (!validation.success) {
            return NextResponse.json({ message: "Bad request", success: false, data: null }, { status: 400 });
        }
        const existedService = await prisma.service.findUnique({
            where: {
                id: serviceId,
            },
            include: {
                images: true
            }
        });

        if (!existedService) {
            return NextResponse.json({ message: "Service is not found", success: false, data: null }, { status: 404 });
        }
        const existedServiceImages = existedService.images.map(img => ({ key: img.key }));

        const deletedService = await prisma.service.delete({
            where: { id: existedService.id, ownerId: user.id }
        });

        if (!deletedService) {
            for (const image of existedServiceImages) {
                const command = new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME || "",
                    Key: image.key,
                });

                await S3.send(command);
            }

            return NextResponse.json({ message: "Something went wrong", success: false, data: null }, { status: 200 });
        }
        return NextResponse.json({ message: "Successfully Delete service", success: true, data: deletedService }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false, data: null }, { status: 500 });
    }
}