import prisma from "@/lib/prisma";
import {
    User,
    ShieldCheck,
    ShieldAlert,
    Trash2,
    Mail,
    Search,
    Filter,
    Clock
} from "lucide-react";
import AdminUserActions from "@/components/AdminUserActions";

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-2">Membres</h1>
                    <p className="text-gray-500 font-medium italic">Gérez les accès et les rôles des utilisateurs de la plateforme.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher un utilisateur..."
                            className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-immo/20 font-bold text-sm w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Utilisateur</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Rôle</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date d&apos;inscription</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-indigo-immo/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-immo/5 flex items-center justify-center text-indigo-immo font-black border border-indigo-immo/10">
                                            {user.name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <p className="font-black text-indigo-immo group-hover:text-gold-immo transition-colors">{user.name || "Utilisateur sans nom"}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 font-bold lowercase">
                                                <Mail size={10} /> {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg w-fit ${user.role === "ADMIN" ? "bg-indigo-immo text-white" : "bg-gray-100 text-gray-600"
                                        }`}>
                                        {user.role === "ADMIN" ? <ShieldCheck size={12} /> : <User size={12} />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="font-bold text-gray-500 text-sm flex items-center gap-2">
                                        <Clock size={14} className="text-gray-300" />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="px-8 py-6">
                                    <AdminUserActions userId={user.id} currentRole={user.role} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
