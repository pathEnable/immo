import prisma from "@/lib/prisma";
import {
    CreditCard,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    Search,
    Filter,
    DollarSign,
    ArrowDownLeft
} from "lucide-react";

export default async function AdminTransactionsPage() {
    const transactions = await prisma.transaction.findMany({
        orderBy: { createdAt: "desc" },
    });

    const totalVolume = transactions
        .filter(t => t.status === "COMPLETED")
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-2">Flux Financiers</h1>
                    <p className="text-gray-500 font-medium italic">Suivi en temps réel de tous les paiements et dépôts.</p>
                </div>
                <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Volume Total (Sucess)</p>
                            <p className="text-xl font-black text-indigo-immo">{totalVolume.toLocaleString()} F</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center animate-pulse">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">WAVE</p>
                        <p className="text-lg font-black text-indigo-immo">{transactions.filter(t => t.provider === "WAVE").length} Transactions</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">ORANGE</p>
                        <p className="text-lg font-black text-indigo-immo">{transactions.filter(t => t.provider === "ORANGE").length} Transactions</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">MTN/MOOV</p>
                        <p className="text-lg font-black text-indigo-immo">{transactions.filter(t => t.provider !== "WAVE" && t.provider !== "ORANGE").length} Transactions</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date & Référence</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Type / Provider</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Statut</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Montant</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-6">
                                    <p className="font-bold text-indigo-immo text-sm">{new Date(tx.createdAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                    <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">REF: {tx.reference}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${tx.type.includes('WITHDRAWAL') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                                            {tx.type.includes('WITHDRAWAL') ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-indigo-immo uppercase tracking-tight">{tx.type.replace('_', ' ')}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">{tx.provider}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-xl ${tx.status === "COMPLETED" ? "bg-green-50 text-green-600" :
                                            tx.status === "FAILED" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                                        }`}>
                                        {tx.status === "COMPLETED" ? <CheckCircle2 size={12} /> :
                                            tx.status === "FAILED" ? <AlertCircle size={12} /> : <Clock size={12} />}
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <p className="text-lg font-black text-indigo-immo tracking-tight">{tx.amount.toLocaleString()} {tx.currency}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {transactions.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Aucune donnée financière disponible.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
