import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    ShieldCheck,
    CheckCircle2,
    Phone,
    MessageCircle,
    ArrowLeft,
    Share2,
    Heart
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const property = await prisma.property.findUnique({
        where: { id },
        select: { title: true, description: true, neighborhood: true, images: true },
    });

    if (!property) return { title: "Bien non trouvé - IMMO" };

    return {
        title: `${property.title} - IMMO`,
        description: property.description.substring(0, 160),
        openGraph: {
            title: property.title,
            description: property.description.substring(0, 160),
            images: property.images[0] ? [{ url: property.images[0] }] : [],
        },
    };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const property = await prisma.property.findUnique({
        where: { id },
        include: { agent: true },
    });

    if (!property) {
        notFound();
    }

    return (
        <div className="bg-cream-immo min-h-screen pb-40 lg:pb-20">
            {/* Header Controls */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                <Link href="/search" className="flex items-center gap-2 text-indigo-immo font-bold bg-white px-4 py-2 rounded-xl shadow-sm hover:text-gold-immo transition-all">
                    <ArrowLeft size={20} />
                    Retour aux résultats
                </Link>
                <div className="flex gap-3">
                    <button className="p-3 bg-white rounded-xl shadow-sm text-indigo-immo hover:text-gold-immo transition-all">
                        <Share2 size={20} />
                    </button>
                    <button className="p-3 bg-white rounded-xl shadow-sm text-indigo-immo hover:text-terracotta-immo transition-all">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-10">
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Gallery */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[600px] group">
                        <Image
                            src={property.images[0]}
                            alt={property.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        {property.isVerified && (
                            <div className="absolute top-6 left-6 verified-badge py-3 px-6 text-base scale-110 shadow-xl border border-white/20">
                                <ShieldCheck size={20} />
                                Vérifié par IMMO
                            </div>
                        )}
                        <div className="absolute bottom-6 left-6 flex gap-2">
                            <button className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-indigo-immo shadow-lg">
                                Voir toutes les photos ({property.images.length})
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail Gallery */}
                    {property.images.length > 1 && (
                        <div className="grid grid-cols-3 gap-3">
                            {property.images.slice(1, 4).map((img, i) => (
                                <div key={i} className="relative h-32 md:h-40 rounded-2xl overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`${property.title} - Photo ${i + 2}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 33vw, 22vw"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Info Card */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gold-immo font-black uppercase tracking-[0.2em] text-xs">
                                    <MapPin size={14} />
                                    {property.neighborhood} • {property.location}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-indigo-immo tracking-tight">
                                    {property.title}
                                </h1>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl md:text-5xl font-black text-indigo-immo">
                                    {property.price.toLocaleString()} FCFA
                                </div>
                                <span className="text-gray-400 font-bold tracking-widest text-sm uppercase">par mois</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">À propos de ce bien</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="mt-12 space-y-6">
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Ce que propose ce logement</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                                {property.amenities.map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-indigo-immo font-bold">
                                        <CheckCircle2 size={20} className="text-gold-immo" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Agent Card */}
                <aside className="mt-10 lg:mt-0 space-y-8">
                    <div className="bg-indigo-immo rounded-3xl p-8 text-white shadow-2xl sticky top-32">
                        <h3 className="text-gold-immo font-black uppercase tracking-[0.2em] text-xs mb-8">Agent de confiance</h3>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="relative">
                                {property.agent.profileImage ? (
                                    <Image
                                        src={property.agent.profileImage}
                                        alt={property.agent.name}
                                        width={64}
                                        height={64}
                                        className="rounded-2xl object-cover border-2 border-gold-immo"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-gold-immo/20 flex items-center justify-center text-gold-immo font-black text-xl border-2 border-gold-immo">
                                        {property.agent.name.charAt(0)}
                                    </div>
                                )}
                                {property.agent.isCertified && (
                                    <div className="absolute -bottom-2 -right-2 bg-gold-immo text-indigo-immo p-1 rounded-full border-2 border-indigo-immo">
                                        <ShieldCheck size={14} fill="currentColor" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-xl font-black tracking-tight">{property.agent.name}</p>
                                <p className="text-indigo-300 text-sm font-bold uppercase tracking-wider">
                                    {property.agent.isCertified ? "Agent Certifié IMMO" : "Agent IMMO"}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={`https://wa.me/${property.agent.whatsapp || ""}?text=Bonjour, je suis intéressé par le bien: ${property.title}`}
                                className="btn-secondary w-full py-5 flex items-center justify-center gap-3 shadow-lg hover:translate-y-[-2px] hover:shadow-gold-immo/20"
                            >
                                <MessageCircle size={22} fill="currentColor" />
                                Contacter via WhatsApp
                            </Link>
                            <button className="w-full py-4 border-2 border-white/20 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                                <Phone size={20} />
                                Appeler l&apos;agent
                            </button>
                        </div>

                        <p className="mt-8 text-indigo-200 text-sm italic text-center leading-relaxed">
                            &quot;En tant qu&apos;expert local, j&apos;ai personnellement vérifié la conformité de ce bien aux standards IMMO.&quot;
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="p-3 bg-terracotta-immo/10 text-terracotta-immo rounded-2xl">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <p className="font-black text-indigo-immo">Achat Sécurisé</p>
                            <p className="text-sm text-gray-500">Protection IMMO garantie sur vos transactions.</p>
                        </div>
                    </div>
                </aside>
            </div>
            {/* Mobile Sticky CTA Bar */}
            <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex gap-4">
                    <Link
                        href={`https://wa.me/${property.agent.whatsapp || ""}?text=Bonjour, je suis intéressé par le bien: ${property.title}`}
                        className="flex-grow btn-secondary py-4 flex items-center justify-center gap-2 text-sm"
                    >
                        <MessageCircle size={18} fill="currentColor" />
                        WhatsApp
                    </Link>
                    <button className="flex-grow py-4 bg-indigo-immo text-white rounded-2xl font-bold flex items-center justify-center gap-2 text-sm">
                        <Phone size={18} />
                        Appeler
                    </button>
                </div>
            </div>
        </div>
    );
}
