import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { S3 } from "@/lib/s3Client";
import prisma from "@/lib/prisma";

const S3UploadSchema = z.object({
    fileName: z.string(),
    contentType: z.string(),
    size: z.number().max(1024 * 1024 * 10), // Max 10MB
});


export async function POST(request: Request) {
    try {
        const user = await currentUser();
        const role = user?.publicMetadata.role;

        if (role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const validation = S3UploadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
        }
        const { fileName, contentType, size } = validation.data;
        const uniqueKey = `${uuidv4()}-${fileName}`;


        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: uniqueKey,
            ContentType: contentType,
            ContentLength: size
        });

        const presignedUrl = await getSignedUrl(S3, command, { expiresIn: 360 });

        if (!presignedUrl) {
            return NextResponse.json({ message: "Internal S3 bucket error" }, { status: 500 });
        }

        const response = {
            presignedUrl,
            key: uniqueKey,
        };
        const bannerImage = await prisma.portfolioImage.create({
            data: {
                key: uniqueKey
            }
        })
        if (!bannerImage) {
            throw new Error("Internal Database Error");
        }
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
const GetRequestSchema = z.object({
    limit: z.number().int(),
    page: z.number().int()
})
export async function GET(request: Request) {
    console.log("Get request");
    try {
        const { searchParams } = new URL(request.url);
        const limit = Number(searchParams.get("limit"));
        const page = Number(searchParams.get("page"));

        const validation = GetRequestSchema.safeParse({ limit, page });

        if (!validation.success) {
            return NextResponse.json({ message: "Bad Request" }, { status: 400 });
        }
        const { limit: limitValue, page: pageValue } = validation.data;

        const portfolioImages = await prisma.portfolioImage.findMany({
            take: limitValue,
            skip: limitValue * (pageValue - 1),
        });

        if (!portfolioImages.length) {
            return NextResponse.json({ message: "No more portfolio" }, { status: 404 });
        }

        let response: Array<{
            id: string,
            key: string,
            url: string,
        }> = [];

        for (const image of portfolioImages) {
            const imageUrl = `https://${process.env.S3_BUCKET_NAME}.t3.storage.dev/${image.key}`;
            const newImage = { ...image, url: imageUrl }
            response.push(newImage)
        }

        return NextResponse.json({ images: response }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


const DeleteRequestSchema = z.object({
    id: z.string(),
    key: z.string()
})
export async function DELETE(request: Request) {
    try {
        const user = await currentUser();
        const role = user?.publicMetadata.role;

        if (role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const validation = DeleteRequestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: "Bad Request" }, { status: 400 });
        }

        const { id, key } = validation.data;

        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        });

        await S3.send(command);

        const deletedPortfolioImage = await prisma.portfolioImage.delete({
            where: { id, key }
        });

        if (!Object.keys(deletedPortfolioImage).length) {
            return NextResponse.json({ message: "Not found in database" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}