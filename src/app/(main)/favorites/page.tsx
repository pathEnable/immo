import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import FavoritesClient from "@/components/FavoritesClient";

export const metadata = {
    title: "Mes Favoris - IMMO",
    description: "Retrouvez tous les biens immobiliers que vous avez sauvegardés.",
};

export default async function FavoritesPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
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

    return <FavoritesClient initialFavorites={favorites} />;
}
