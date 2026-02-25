import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await auth();

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
        }

        const { status, adminMessage } = await req.json();

        if (status !== "APPROVED" && status !== "REJECTED") {
            return NextResponse.json({ message: "Statut invalide" }, { status: 400 });
        }

        const request = await prisma.verificationRequest.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!request) {
            return NextResponse.json({ message: "Demande introuvable" }, { status: 404 });
        }

        // Update request status
        await prisma.verificationRequest.update({
            where: { id },
            data: {
                status,
                adminMessage: status === "REJECTED" ? adminMessage : null,
            },
        });

        // If approved, upgrade user role to AGENT
        if (status === "APPROVED") {
            await prisma.user.update({
                where: { id: request.userId },
                data: { role: "AGENT" },
            });

            // Optionally create Agent record if it doesn't exist
            const existingAgent = await prisma.agent.findUnique({
                where: { email: request.user.email as string }
            });

            if (!existingAgent) {
                await prisma.agent.create({
                    data: {
                        name: request.user.name as string,
                        email: request.user.email as string,
                        phoneNumber: request.professionalPhone,
                        isCertified: true,
                    }
                });
            } else {
                await prisma.agent.update({
                    where: { email: request.user.email as string },
                    data: { isCertified: true, phoneNumber: request.professionalPhone }
                });
            }
        }

        return NextResponse.json({ message: `Demande ${status.toLowerCase()}e` });
    } catch (error) {
        console.error("Admin Verification Error:", error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
