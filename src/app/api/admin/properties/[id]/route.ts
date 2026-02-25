import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        await prisma.property.delete({
            where: { id },
        });

        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
