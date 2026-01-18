import prisma from "@/lib/prisma";
import ServiceEditForm from "@/components/web/dashboard/service-edit-form";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface EditServicePageProps {
    params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
    const { id } = await params;
    const user = await auth();

    if (!user.userId) {
        return <div>Unauthorized</div>;
    }

    const service = await prisma.service.findUnique({
        where: {
            id: id,
        },
        include: {
            images: true,
            tiers: {
                orderBy: {
                    price: 'asc' // Just to have consistent order, though we map by type usually
                }
            }
        }
    });

    if (!service) {
        notFound();
    }

    // Verify ownership
    // Note: service.ownerId maps to Clerk ID in this schema
    if (service.ownerId !== user.userId) {
        return <div className="p-8 text-center text-red-500">You are not authorized to edit this service.</div>;
    }

    return (
        <div className="w-full px-4 md:px-6 py-8">
            <ServiceEditForm service={service} />
        </div>
    );
}
