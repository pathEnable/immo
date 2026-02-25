import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
        }

        const userId = session.user.id;
        const { professionalPhone, agencyName, idCardUrl, address } = await req.json();

        if (!professionalPhone || !agencyName || !idCardUrl) {
            return NextResponse.json({ message: "Informations manquantes" }, { status: 400 });
        }

        // Check if a request already exists
        const existingRequest = await prisma.verificationRequest.findUnique({
            where: { userId },
        });

        if (existingRequest && existingRequest.status === "PENDING") {
            return NextResponse.json({ message: "Une demande est déjà en cours" }, { status: 400 });
        }

        // Create or update request
        const request = await prisma.verificationRequest.upsert({
            where: { userId },
            update: {
                professionalPhone,
                agencyName,
                idCardUrl,
                address,
                status: "PENDING",
                adminMessage: null,
            },
            create: {
                userId: userId as string,
                professionalPhone,
                agencyName,
                idCardUrl,
                address,
                status: "PENDING",
            },
        });

        return NextResponse.json(request, { status: 201 });
    } catch (error) {
        console.error("Verification Request Error:", error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
