import { Suspense } from "react";
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

    return (
        <Suspense fallback={
            <div className="bg-cream-immo min-h-screen">
                <div className="bg-indigo-immo py-8 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-14 skeleton rounded-xl w-full max-w-2xl" />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                <div className="h-60 skeleton" />
                                <div className="p-6 space-y-4">
                                    <div className="h-3 skeleton w-1/3" />
                                    <div className="h-5 skeleton w-3/4" />
                                    <div className="h-4 skeleton w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }>
            <SearchResults initialProperties={properties} />
        </Suspense>
    );
}
