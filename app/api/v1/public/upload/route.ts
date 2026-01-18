import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { S3 } from "@/lib/s3Client";

const S3UploadSchema = z.object({
    fileName: z.string(),
    contentType: z.string().startsWith("image/"),
    size: z.number().max(1024 * 1024 * 5), // Max 5MB
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = S3UploadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: 'Invalid request data. Only images under 5MB are allowed.' }, { status: 400 });
        }
        const { fileName, contentType, size } = validation.data;
        // Prefix public uploads to keep them separate
        const uniqueKey = `public/contact/${uuidv4()}-${fileName}`.replace(/\s/g, "_");

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
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Public upload error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
