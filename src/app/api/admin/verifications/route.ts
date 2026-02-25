import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
        }

        const requests = await prisma.verificationRequest.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(requests);
    } catch (error) {
        console.error("Fetch Verifications Error:", error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
