import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // Only AGENT or ADMIN can create properties
        if (session.user.role !== "AGENT" && session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Vous devez être un agent certifié pour publier un bien" },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { title, description, price, location, neighborhood, type, images, amenities } = body;

        // Validate required fields
        if (!title || !description || !price || !location || !neighborhood || !type) {
            return NextResponse.json(
                { error: "Tous les champs obligatoires doivent être remplis" },
                { status: 400 }
            );
        }

        if (!images || images.length === 0) {
            return NextResponse.json(
                { error: "Au moins une photo est requise" },
                { status: 400 }
            );
        }

        // Find the Agent record associated with this user
        const agent = await prisma.agent.findUnique({
            where: { email: session.user.email! },
        });

        if (!agent) {
            return NextResponse.json(
                { error: "Profil agent introuvable. Vérifiez votre statut." },
                { status: 404 }
            );
        }

        const property = await prisma.property.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                price: parseFloat(price),
                location: location.trim(),
                neighborhood: neighborhood.trim(),
                type,
                images,
                amenities: amenities || [],
                status: "AVAILABLE",
                isVerified: false, // Needs admin verification
                agentId: agent.id,
            },
        });

        return NextResponse.json(property, { status: 201 });
    } catch (error) {
        console.error("Property creation error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const properties = await prisma.property.findMany({
            where: { status: "AVAILABLE" },
            orderBy: { createdAt: "desc" },
            include: { agent: true },
        });
        return NextResponse.json(properties);
    } catch (error) {
        console.error("Properties fetch error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
