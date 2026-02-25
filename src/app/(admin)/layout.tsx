import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Home,
    Users,
    CreditCard,
    LogOut,
    ShieldCheck,
    BarChart3,
    Settings
} from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Double check role on server side for safety
    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const menuItems = [
        { name: "Vue d'ensemble", icon: <LayoutDashboard size={20} />, href: "/admin" },
        { name: "Vérifications", icon: <ShieldCheck size={20} />, href: "/admin/verifications" },
        { name: "Propriétés", icon: <Home size={20} />, href: "/admin/properties" },
        { name: "Utilisateurs", icon: <Users size={20} />, href: "/admin/users" },
        { name: "Transactions", icon: <CreditCard size={20} />, href: "/admin/transactions" },
        { name: "Statistiques", icon: <BarChart3 size={20} />, href: "/admin/stats" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 font-outfit">
            {/* Sidebar Admin */}
            <aside className="w-72 bg-indigo-immo text-white flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="p-8">
                    <Link href="/" className="inline-block">
                        <span className="text-3xl font-black text-white tracking-tighter">
                            IMMO<span className="text-gold-immo">.</span>
                        </span>
                        <span className="block text-[10px] uppercase tracking-[0.3em] font-bold text-gold-immo/80 -mt-1">Administration</span>
                    </Link>
                </div>

                <nav className="flex-grow px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all font-bold group"
                        >
                            <span className="text-white/60 group-hover:text-gold-immo transition-colors">
                                {item.icon}
                            </span>
                            {item.name}
                        </Link>
                    ))}

                    {/* View Client Site Link */}
                    <div className="pt-8 mt-8 border-t border-white/10">
                        <Link
                            href="/"
                            className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gold-immo/10 text-gold-immo hover:bg-gold-immo hover:text-indigo-immo transition-all font-black text-sm uppercase tracking-widest"
                        >
                            <LayoutDashboard size={20} />
                            Voir le site
                        </Link>
                    </div>
                </nav>

                <div className="p-8 space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Connecté</span>
                        </div>
                        <p className="text-sm font-black truncate">{session.user.name}</p>
                    </div>
                    <form action="/api/auth/signout" method="POST">
                        <button
                            type="submit"
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold"
                        >
                            <LogOut size={20} />
                            Déconnexion
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow ml-72 p-10">
                {children}
            </main>
        </div>
    );
}
