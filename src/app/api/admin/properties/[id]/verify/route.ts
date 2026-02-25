import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const property = await prisma.property.findUnique({
            where: { id },
        });

        if (!property) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const updated = await prisma.property.update({
            where: { id },
            data: { isVerified: !property.isVerified },
        });

        return NextResponse.json(updated);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
