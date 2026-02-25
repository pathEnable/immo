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
        const { role } = await req.json();

        const updated = await prisma.user.update({
            where: { id },
            data: { role },
        });

        return NextResponse.json(updated);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
