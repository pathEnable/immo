import prisma from "@/lib/prisma";
import {
    Users,
    Home,
    CheckCircle2,
    TrendingUp,
    BarChart3,
    ArrowUpRight,
    Clock,
    DollarSign,
    ShieldCheck
} from "lucide-react";

export default async function AdminDashboardPage() {
    // Fetch dashboard stats
    const [totalUsers, totalProperties, verifiedProperties, latestTransactions] = await Promise.all([
        prisma.user.count(),
        prisma.property.count(),
        prisma.property.count({ where: { isVerified: true } }),
        prisma.transaction.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
        })
    ]);

    const stats = [
        { name: "Utilisateurs Totaux", value: totalUsers, icon: <Users className="text-blue-500" />, trend: "+4% ce mois" },
        { name: "Biens Listés", value: totalProperties, icon: <Home className="text-purple-500" />, trend: String(totalProperties) },
        { name: "Biens Vérifiés", value: verifiedProperties, icon: <ShieldCheck className="text-green-500" />, trend: `${Math.round((verifiedProperties / totalProperties) * 100)}% du parc` },
        { name: "Revenus (Paiements)", value: "3,150,000 F", icon: <DollarSign className="text-gold-immo" />, trend: "+12%" },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-2">Centre de Contrôle</h1>
                <p className="text-gray-500 font-medium italic">Vue d&apos;ensemble de la plateforme IMMO.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-indigo-immo group-hover:text-white transition-colors">
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.trend}</span>
                        </div>
                        <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[11px] mb-1">{stat.name}</h3>
                        <p className="text-3xl font-black text-indigo-immo">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Latest Activity */}
                <div className="lg:col-span-2 bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black text-indigo-immo tracking-tight">Transactions Récentes</h3>
                        <button className="text-indigo-immo font-bold text-sm flex items-center gap-2 hover:text-gold-immo transition-colors">
                            Voir tout <ArrowUpRight size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {latestTransactions.map((tx: { id: string; type: string; provider: string; status: string; amount: number; currency: string; createdAt: Date }) => (
                            <div key={tx.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-indigo-immo/10 hover:bg-white transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl ${tx.status === "COMPLETED" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                                        {tx.status === "COMPLETED" ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-indigo-immo group-hover:text-indigo-immo transition-colors">{tx.type.replace('_', ' ')}</p>
                                        <p className="text-xs text-gray-400 font-bold">{tx.provider} • {new Date(tx.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-indigo-immo">{tx.amount.toLocaleString()} {tx.currency}</p>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${tx.status === "COMPLETED" ? "text-green-500" : "text-amber-500"}`}>
                                        {tx.status === "COMPLETED" ? "Complet" : "En attente"}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {latestTransactions.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-gray-400 font-bold">Aucune transaction enregistrée.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-8">
                    <div className="bg-indigo-immo rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-6 tracking-tight">Actions Rapides</h3>
                            <div className="space-y-3">
                                <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-sm text-left flex items-center justify-between group transition-all">
                                    Valider nouveaux biens
                                    <ArrowUpRight size={18} className="text-gold-immo group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                                <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-sm text-left flex items-center justify-between group transition-all">
                                    Gérer rôles utilisateurs
                                    <ArrowUpRight size={18} className="text-gold-immo group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                                <button className="w-full py-4 px-6 bg-white hover:bg-gold-immo text-indigo-immo rounded-2xl font-black text-sm text-left flex items-center justify-between group transition-all">
                                    Exporter rapports (Excel)
                                    <TrendingUp size={18} className="text-indigo-immo" />
                                </button>
                            </div>
                        </div>
                        <BarChart3 className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 -rotate-12" />
                    </div>

                    <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-black text-indigo-immo mb-6 tracking-tight">Configuration Site</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="text-sm font-bold text-gray-500">Maintenance</span>
                                <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gold-immo/50">
                                <span className="text-sm font-black text-indigo-immo">Vérification Auto</span>
                                <div className="w-10 h-5 bg-indigo-immo rounded-full relative">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
