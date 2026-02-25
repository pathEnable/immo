import prisma from "@/lib/prisma";
import SearchResults from "@/components/SearchResults";

export const metadata = {
    title: "Rechercher un bien - IMMO",
    description: "Explorez les meilleurs biens immobiliers vérifiés à Abidjan. Filtrez par type, quartier et budget pour trouver votre logement idéal.",
};

export default async function SearchPage() {
    const properties = await prisma.property.findMany({
        where: { status: "AVAILABLE" },
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
        orderBy: { createdAt: "desc" },
    });

    return <SearchResults initialProperties={properties} />;
}
