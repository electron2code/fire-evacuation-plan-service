import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            include: {
                images: true,
                owner: true,
                reviews: true,
                tiers: true
            }
        });
        if (!services.length) {
            return NextResponse.json({ message: "No service", success: false }, { status: 404 });
        }
        return NextResponse.json({ message: "Successfully fetched services", data: services, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong fetching services", success: false }, { status: 500 });
    }
}