import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3Client";

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