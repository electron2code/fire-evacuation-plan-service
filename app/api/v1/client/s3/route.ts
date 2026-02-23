import { NextResponse } from "next/server";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { S3 } from "@/lib/s3Client"
import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const deleteReqestSchema = z.object({
    key: z.string()
})

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const validation = deleteReqestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: "No key found in request" }, { status: 400 });
        }
        const { key } = validation.data;

        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        });

        await S3.send(command);

        return NextResponse.json({ message: "Deleted Successfully", image: { key } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

const S3UploadSchema = z.object({
    fileName: z.string(),
    contentType: z.string(),
    size: z.number().max(1024 * 1024 * 300), // Max 300MB
});


export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = S3UploadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
        }
        const { fileName, contentType, size } = validation.data;
        const uniqueKey = `${uuidv4()}-${fileName}`.replace(/\s/g, '');
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
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}