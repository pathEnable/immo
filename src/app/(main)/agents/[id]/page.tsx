import React from "react";
import Link from "next/link";
import {
    ShieldCheck,
    Star,
    MapPin,
    MessageCircle,
    Phone,
    Award,
    Users,
    Home,
    ArrowRight,
    ChevronRight
} from "lucide-react";

const mockAgent = {
    id: "moussa",
    name: "Moussa Diop",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    title: "Expert Immobilier Senior",
    location: "Abidjan, Cocody",
    isCertified: true,
    bio: "Spécialiste du marché immobilier à Abidjan depuis plus de 8 ans. J'accompagne mes clients dans la recherche de biens d'exception, avec une rigueur absolue sur la vérification juridique et technique de chaque propriété.",
    stats: {
        experience: 8,
        activeListings: 12,
        rating: 4.9,
        reviews: 45,
        verifiedDeals: 120
    },
    listings: [
        {
            id: "1",
            title: "Appartement de luxe - Cocody Lycée Technique",
            price: 450000,
            images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400"],
            type: "Appartement"
        },
        {
            id: "2",
            title: "Villa Moderne - Angré 7ème Tranche",
            price: 850000,
            images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400"],
            type: "Villa"
        }
    ]
};

const AgentProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div className="bg-cream-immo min-h-screen">
            {/* Profile Header */}
            <section className="bg-indigo-immo pt-20 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                        <div className="relative">
                            <img
                                src={mockAgent.profileImage}
                                alt={mockAgent.name}
                                className="w-48 h-48 rounded-3xl object-cover border-4 border-gold-immo shadow-2xl"
                            />
                            {mockAgent.isCertified && (
                                <div className="absolute -bottom-4 -right-4 bg-gold-immo text-indigo-immo p-3 rounded-2xl border-4 border-indigo-immo shadow-xl">
                                    <ShieldCheck size={28} fill="currentColor" />
                                </div>
                            )}
                        </div>

                        <div className="flex-grow text-center md:text-left space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-gold-immo text-sm font-bold uppercase tracking-widest border border-white/20">
                                < Award size={14} />
                                Agent Certifié IMMO
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{mockAgent.name}</h1>
                            <p className="text-xl text-indigo-200 font-medium max-w-2xl">{mockAgent.bio}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6">
                                <button className="btn-secondary py-4 px-8 flex items-center gap-3">
                                    <MessageCircle size={22} fill="currentColor" />
                                    Contacter via WhatsApp
                                </button>
                                <button className="py-4 px-8 border-2 border-white/20 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-3">
                                    <Phone size={20} />
                                    Appeler l&apos;agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Summary */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center md:border-r border-gray-100">
                        <div className="text-3xl font-black text-indigo-immo mb-1">{mockAgent.stats.experience}+</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ans d&apos;expertise</div>
                    </div>
                    <div className="text-center md:border-r border-gray-100">
                        <div className="text-3xl font-black text-indigo-immo mb-1">{mockAgent.stats.rating}</div>
                        <div className="flex justify-center gap-1 text-gold-immo mb-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{mockAgent.stats.reviews} Avis Clients</div>
                    </div>
                    <div className="text-center md:border-r border-gray-100">
                        <div className="text-3xl font-black text-indigo-immo mb-1">{mockAgent.stats.activeListings}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Biens Actifs</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-black text-gold-immo mb-1">{mockAgent.stats.verifiedDeals}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ventes/Locations</div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Active Listings */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex justify-between items-end">
                            <h2 className="text-3xl font-black text-indigo-immo tracking-tight">Portfolio Actuel</h2>
                            <span className="text-indigo-immo bg-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm border border-gray-50">
                                {mockAgent.stats.activeListings} Annonces en cours
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {mockAgent.listings.map((item) => (
                                <Link href={`/property/${item.id}`} key={item.id} className="card-immo group flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute top-4 right-4 bg-indigo-immo/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold">
                                            {item.price.toLocaleString()} FCFA
                                        </div>
                                    </div>
                                    <div className="p-5 space-y-2">
                                        <p className="text-xs font-bold text-gold-immo uppercase tracking-widest">{item.type}</p>
                                        <h3 className="font-bold text-indigo-immo line-clamp-1 group-hover:text-gold-immo transition-colors">{item.title}</h3>
                                        <div className="flex items-center gap-2 pt-3 text-indigo-immo/40 font-bold text-xs">
                                            Voir les détails <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Recommendations */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-indigo-immo mb-6">Pourquoi faire confiance à {mockAgent.name.split(' ')[0]} ?</h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-gold-immo/10 rounded-xl flex items-center justify-center text-gold-immo">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-immo underline decoration-gold-immo decoration-2">Vérification terrain</h4>
                                        <p className="text-sm text-gray-500">Expertise physique de tous les biens présentés dans son catalogue.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-indigo-immo/10 rounded-xl flex items-center justify-center text-indigo-immo">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-immo">Accompagnement VIP</h4>
                                        <p className="text-sm text-gray-500">Service personnalisé du premier rdv à la signature du bail.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-terracotta-immo rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-4 tracking-tight">Voulez-vous devenir Agent Certifié ?</h3>
                                <p className="text-terracotta-100 text-sm mb-6">Rejoignez le réseau leader de l&apos;immobilier de confiance en Afrique.</p>
                                <button className="bg-white text-terracotta-immo px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl">
                                    En savoir plus <ArrowRight size={16} />
                                </button>
                            </div>
                            <Award className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 -rotate-12 transition-transform group-hover:scale-110" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AgentProfilePage;
