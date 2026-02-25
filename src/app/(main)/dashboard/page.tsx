import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
    LayoutDashboard,
    Home,
    DollarSign,
    TrendingUp,
    Users,
    PlusCircle,
    ArrowUpRight,
    Clock,
    MoreVertical,
    Wallet,
    CheckCircle2,
    AlertCircle,
    ShieldCheck
} from "lucide-react";

export const metadata = {
    title: "Tableau de Bord - IMMO",
    description: "Gérez vos propriétés et suivez vos paiements.",
};

export default async function DashboardPage() {
    const session = await auth();
    const userName = session?.user?.name || "Propriétaire";

    // Fetch real data
    const [propertyCount, totalProperties] = await Promise.all([
        prisma.property.count({ where: { status: "AVAILABLE" } }),
        prisma.property.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                price: true,
                status: true,
            },
        }),
    ]);

    const stats = [
        { name: "Revenu Total", value: "2,450,000 FCFA", icon: <DollarSign size={20} />, change: "+12.5%", positive: true },
        { name: "Biens Actifs", value: String(propertyCount), icon: <Home size={20} />, change: "0", positive: true },
        { name: "Locataires", value: "15", icon: <Users size={20} />, change: "+2", positive: true },
        { name: "En attente", value: "185,000 FCFA", icon: <Clock size={20} />, change: "-5%", positive: false },
    ];

    const recentPayments = [
        { id: 1, tenant: "Amadou Diallo", amount: 150000, date: "21 Fev 2026", provider: "WAVE", status: "COMPLETED" },
        { id: 2, tenant: "Fatou Traoré", amount: 250000, date: "20 Fev 2026", provider: "ORANGE", status: "COMPLETED" },
        { id: 3, tenant: "Jean Kouassi", amount: 450000, date: "18 Fev 2026", provider: "MTN", status: "PENDING" },
        { id: 4, tenant: "Leila Bamba", amount: 120000, date: "15 Fev 2026", provider: "WAVE", status: "COMPLETED" },
    ];

    return (
        <div className="bg-cream-immo min-h-screen py-10 pb-32 md:pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-2">Tableau de Bord</h1>
                        <p className="text-gray-500 font-medium">Bienvenue, {userName}. Voici un aperçu de votre patrimoine.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white text-indigo-immo border border-gray-100 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                            <Wallet size={20} className="text-gold-immo" />
                            Gérer Retraits
                        </button>
                        <Link href="/dashboard/list-property" className="btn-primary py-4 px-8 flex items-center gap-2">
                            <PlusCircle size={20} />
                            Mettre en ligne
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat) => (
                        <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-indigo-immo/5 text-indigo-immo rounded-xl group-hover:bg-gold-immo/20 group-hover:text-gold-immo transition-colors">
                                    {stat.icon}
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                                    <TrendingUp size={14} className={stat.positive ? "" : "rotate-180"} />
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">{stat.name}</p>
                            <h3 className="text-2xl font-black text-indigo-immo">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-2xl font-black text-indigo-immo tracking-tight">Paiements Récents</h3>
                                <button className="text-indigo-immo font-bold text-sm hover:text-gold-immo transition-colors flex items-center gap-1">
                                    Tous les paiements <ArrowUpRight size={16} />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left text-gray-400 font-bold uppercase tracking-widest text-xs border-b border-gray-50 pb-4">
                                            <th className="pb-4">Locataire</th>
                                            <th className="pb-4">Mode</th>
                                            <th className="pb-4 text-right">Montant</th>
                                            <th className="pb-4 text-right">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentPayments.map((pay) => (
                                            <tr key={pay.id} className="group hover:bg-cream-immo transition-colors">
                                                <td className="py-5">
                                                    <div className="font-bold text-indigo-immo">{pay.tenant}</div>
                                                    <div className="text-xs text-gray-400">{pay.date}</div>
                                                </td>
                                                <td className="py-5">
                                                    <span className={`px-3 py-1 rounded-lg text-xs font-black ring-1 ring-inset ${pay.provider === "WAVE" ? "bg-blue-50 text-blue-600 ring-blue-500/10" :
                                                        pay.provider === "ORANGE" ? "bg-orange-50 text-orange-600 ring-orange-500/10" :
                                                            "bg-yellow-50 text-yellow-600 ring-yellow-500/10"
                                                        }`}>
                                                        {pay.provider}
                                                    </span>
                                                </td>
                                                <td className="py-5 text-right font-black text-indigo-immo">
                                                    {pay.amount.toLocaleString()} FCFA
                                                </td>
                                                <td className="py-5 text-right">
                                                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${pay.status === "COMPLETED" ? "text-green-500" : "text-amber-500"
                                                        }`}>
                                                        {pay.status === "COMPLETED" ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                                        {pay.status === "COMPLETED" ? "Succès" : "En cours"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Property Status */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
                            <h3 className="text-2xl font-black text-indigo-immo tracking-tight mb-10">État du Patrimoine</h3>
                            <div className="space-y-4">
                                {totalProperties.map((prop) => (
                                    <div key={prop.id} className="flex items-center justify-between p-6 bg-cream-immo/50 rounded-2xl border border-gray-100 hover:border-gold-immo transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${prop.status === "AVAILABLE" ? "bg-green-500" : "bg-gold-immo animate-pulse"}`}></div>
                                            <div>
                                                <h4 className="font-bold text-indigo-immo group-hover:text-gold-immo transition-colors">{prop.title}</h4>
                                                <p className="text-sm text-gray-500">{prop.price.toLocaleString()} FCFA / mois</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-lg ${prop.status === "AVAILABLE" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                                                {prop.status === "AVAILABLE" ? "Disponible" : prop.status === "RENTED" ? "Loué" : "En attente"}
                                            </span>
                                            <button className="p-2 hover:bg-white rounded-lg transition-all">
                                                <MoreVertical size={20} className="text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions / Tips */}
                    <div className="space-y-8">
                        <div className="bg-indigo-immo rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-6 tracking-tight">Optimisez vos Revenus</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-sm">
                                        <CheckCircle2 size={18} className="text-gold-immo shrink-0" />
                                        Passez vos annonces en &quot;Vérifié&quot; pour louer 30% plus vite.
                                    </li>
                                    <li className="flex gap-3 text-sm">
                                        <CheckCircle2 size={18} className="text-gold-immo shrink-0" />
                                        Offrez la réservation via Mobile Money pour diminuer les visites inutiles.
                                    </li>
                                </ul>
                                <button className="w-full mt-8 py-4 bg-white/10 border border-white/20 rounded-xl font-bold text-sm tracking-wide hover:bg-white/20 transition-all">
                                    Voir mes statistiques
                                </button>
                            </div>
                            <TrendingUp className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12" />
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-indigo-immo mb-6 tracking-tight">Support Propriétaire</h3>
                            <div className="flex items-center gap-4 p-4 bg-indigo-immo/5 rounded-2xl mb-4">
                                <div className="p-2 bg-indigo-immo text-white rounded-lg">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-indigo-immo text-sm">Besoin d&apos;aide ?</p>
                                    <p className="text-xs text-gray-500">Un conseiller vous répond en 1h.</p>
                                </div>
                            </div>
                            <button className="w-full py-4 btn-secondary text-sm">
                                Ouvrir un ticket
                            </button>
                        </div>
                    </div>
                </div>

                {/* Become Agent CTA for non-agents */}
                {!session?.user?.role || session.user.role === "USER" ? (
                    <div className="mt-12 bg-white rounded-[40px] p-10 shadow-2xl border border-gold-immo/20 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-black text-indigo-immo tracking-tight mb-4">Prêt à devenir Agent Immobilier ?</h2>
                                <p className="text-gray-500 font-medium max-w-xl">
                                    Vendez et louez vos biens plus rapidement avec les outils professionnels d&apos;IMMO.
                                    Soumettez votre dossier de vérification dès aujourd&apos;hui.
                                </p>
                            </div>
                            <Link href="/dashboard/become-agent" className="btn-primary py-5 px-10 text-lg shadow-xl shadow-gold-immo/20 hover:scale-105 active:scale-95 transition-all">
                                Commencer la vérification
                            </Link>
                        </div>
                        <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-gold-immo/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
