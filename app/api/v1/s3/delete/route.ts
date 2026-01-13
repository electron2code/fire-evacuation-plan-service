import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/s3Client"
import { z } from "zod";
import prisma from "@/lib/prisma";

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