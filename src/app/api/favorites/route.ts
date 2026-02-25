import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/favorites — fetch user's favorites
export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
        where: { userId: session.user.id },
        include: {
            property: {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    location: true,
                    neighborhood: true,
                    type: true,
                    images: true,
                    isVerified: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(favorites);
}

// POST /api/favorites — toggle a favorite
export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { propertyId } = await req.json();

    if (!propertyId) {
        return NextResponse.json({ error: "propertyId requis" }, { status: 400 });
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
        where: {
            userId_propertyId: {
                userId: session.user.id,
                propertyId,
            },
        },
    });

    if (existing) {
        // Remove favorite
        await prisma.favorite.delete({ where: { id: existing.id } });
        return NextResponse.json({ favorited: false });
    } else {
        // Add favorite
        await prisma.favorite.create({
            data: {
                userId: session.user.id,
                propertyId,
            },
        });
        return NextResponse.json({ favorited: true });
    }
}
