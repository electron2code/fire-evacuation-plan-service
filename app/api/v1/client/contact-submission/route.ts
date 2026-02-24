import prisma from "@/lib/prisma";
import { S3 } from "@/lib/s3Client";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";


const ContactSubmissionSchema = z.object({
    projectAddress: z.string(),
    emergencyNumber: z.string(),
    googleMapLink: z.string(),
    companyLogo: z.object({
        key: z.string(),
        url: z.string(),
    }),
    safetyEquipmentMedia: z.array(z.object({
        key: z.string(),
        url: z.string(),
        type: z.string(),
    })),

    projectVisualsMedia: z.array(z.object({
        key: z.string(),
        url: z.string(),
        type: z.string(),
    }))
})

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const validation = ContactSubmissionSchema.safeParse(body);

        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 401 });
        }

        if (!validation.success) {
            return NextResponse.json({ success: false, message: "All fields are required to submit the form" }, { status: 400 });
        }

        const { companyLogo, safetyEquipmentMedia, projectVisualsMedia, ...restFormData } = validation.data;

        const contactSubmission = await prisma.contactSubmission.create({
            data: {
                userId: user.id,
                ...restFormData,
                companyLogo: {
                    create: {
                        ...companyLogo
                    }
                },
                safetyEquipmentMedia: {
                    createMany: {
                        data: safetyEquipmentMedia
                    }
                },
                projectVisualsMedia: {
                    createMany: {
                        data: projectVisualsMedia
                    }
                }
            },
            include: {
                companyLogo: true,
                safetyEquipmentMedia: true,
                projectVisualsMedia: true,
            }
        });

        if (!contactSubmission) {
            throw new Error("Something went wrong when creating contact submission");
        }

        return NextResponse.json({ contactSubmission }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Something went wrong, internal server error" }, { status: 500 });
    }
}

export const GET = async (request: Request) => {
    try {
        const user = await currentUser();
        const role = user?.publicMetadata.role;

        if (role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const contacts = await prisma.contactSubmission.findMany({
            include: {
                projectVisualsMedia: true,
                safetyEquipmentMedia: true,
                companyLogo: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        imageUrl: true,
                    }
                },
            }
        });

        return NextResponse.json({ contacts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Something went wrong, internal server error" }, { status: 500 });
    }
}


const DeleteContactSubmissionSchema = z.object({
    contactId: z.string(),
})
export const DELETE = async (request: Request) => {
    try {
        const user = await currentUser();
        const role = user?.publicMetadata.role;

        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json();

        const validation = DeleteContactSubmissionSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message }, { status: 400 });
        }

        const { contactId } = validation.data;

        const contact = await prisma.contactSubmission.findUnique({
            where: {
                id: contactId,
            },
            include: {
                companyLogo: true,
                safetyEquipmentMedia: true,
                projectVisualsMedia: true,
            }
        });

        if (!contact) {
            return NextResponse.json({ success: false, message: "No contact found with is id" }, { status: 404 });
        }

        const fileKeys = [
            ...contact.projectVisualsMedia.map(pvm => pvm.key),
            ...contact.safetyEquipmentMedia.map((sem) => sem.key),
            contact.companyLogo?.key
        ];

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {
                Objects: fileKeys.map((key) => ({ Key: key })),
                Quiet: false, // Set to true to get a simpler response
            },
        }

        const command = new DeleteObjectsCommand(params);
        const data = await S3.send(command);

        if (data.Errors) {
            return NextResponse.json({ success: false, message: `Errors during deletion: ${data.Errors.toString()}` }, { status: 500 });
        }

        const deletedContact = await prisma.contactSubmission.delete({
            where: {
                id: contact.id
            }
        });

        return NextResponse.json({ message: "Deleted Successfully", deletedContact }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message || "Something went wrong, internal server error" }, { status: 500 });

    }
}