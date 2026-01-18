import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const user = await currentUser()
        if (user) {
            const userInfo = await prisma.user.findUnique({
                where: {
                    clerkId: user.id
                }
            });

            if (!userInfo) {
                return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
            }

            return NextResponse.json({ data: userInfo, success: true }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}