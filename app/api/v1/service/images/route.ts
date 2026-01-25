import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { S3 } from "@/lib/s3Client";

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
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


const DeleteSchema = z.object({
    key: z.string(),
})
export async function DELETE(request: Request) {
    try {
        const user = await currentUser();
        const role = user?.publicMetadata.role;

        if (role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = DeleteSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: "Bad request" }, { status: 400 });
        }

        const { key } = validation.data;

        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        });

        await S3.send(command);
        return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}