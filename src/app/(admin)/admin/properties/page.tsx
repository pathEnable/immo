import prisma from "@/lib/prisma";
import Image from "next/image";
import {
    ShieldCheck,
    ShieldAlert,
    Trash2,
    ExternalLink,
    Search,
    Filter,
    MapPin,
    Tag
} from "lucide-react";
import AdminPropertyActions from "@/components/AdminPropertyActions";

export default async function AdminPropertiesPage() {
    const properties = await prisma.property.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            agent: {
                select: { name: true }
            }
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-2">Propriétés</h1>
                    <p className="text-gray-500 font-medium italic">Validez ou supprimez les annonces de la plateforme.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher un bien..."
                            className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-immo/20 font-bold text-sm w-64 transition-all"
                        />
                    </div>
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-immo transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Bien & Emplacement</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Statut</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Prix</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {properties.map((prop) => (
                            <tr key={prop.id} className="group hover:bg-indigo-immo/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                                            <Image
                                                src={prop.images[0]}
                                                alt={prop.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-black text-indigo-immo group-hover:text-gold-immo transition-colors line-clamp-1">{prop.title}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 font-bold">
                                                <MapPin size={10} /> {prop.neighborhood}, {prop.location}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col gap-1">
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg w-fit ${prop.isVerified ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                                            }`}>
                                            {prop.isVerified ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                                            {prop.isVerified ? "VÉRIFIÉ" : "EN ATTENTE"}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Agent: {prop.agent.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="font-black text-indigo-immo">{prop.price.toLocaleString()} F</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{prop.type}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <AdminPropertyActions propertyId={prop.id} isVerified={prop.isVerified} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {properties.length === 0 && (
                    <div className="py-20 text-center bg-gray-50/20">
                        <p className="text-gray-400 font-bold">Aucun bien à gérer pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
