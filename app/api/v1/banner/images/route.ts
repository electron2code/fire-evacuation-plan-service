import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3Client";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

interface Response {
    id: string
    key: string
    url: string
}

export async function GET() {
    try {
        const images = await prisma.bannerImage.findMany({
            take: 5,
        })
        if (!images.length) {
            return NextResponse.json({ message: "No banner image found" }, { status: 404 })
        }

        let response: Array<Response> = [];

        for (const image of images) {
            const imageUrl = `https://${process.env.S3_BUCKET_NAME}.t3.storage.dev/${image.key}`;
            const newImage = { ...image, url: imageUrl }
            response.push(newImage);
        }
        // console.log(response);
        return NextResponse.json({ images: response }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


const deleteReqestSchema = z.object({
    id: z.string(),
    key: z.string()
})

export async function DELETE(request: Request) {
    console.log("DELETING");
    try {
        const user = await currentUser();
        const role = user?.publicMetadata.role;

        if (role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const body = await request.json();
        const validation = deleteReqestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: "No key found in request" }, { status: 400 });
        }
        const { id, key } = validation.data;

        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        });

        await S3.send(command);

        const deletedImage = await prisma.bannerImage.delete({
            where: { id, key }
        })

        if (!deletedImage) {
            return NextResponse.json({ message: "Internal Database Error" }, { status: 500 });
        }

        return NextResponse.json({ message: "Deleted Successfully", image: { id, key } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}