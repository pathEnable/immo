"use client";

import React from "react";
import Link from "next/link";
import {
    MessageCircle,
    Search,
    MoreVertical,
    CheckCheck,
    ShieldCheck,
    ArrowLeft,
    Phone
} from "lucide-react";

const mockChats = [
    {
        id: "1",
        name: "Moussa Diop",
        lastMessage: "Le bien à Cocody est toujours disponible pour une visite demain.",
        time: "10:45",
        unread: 2,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        isAgent: true,
    },
    {
        id: "2",
        name: "Fatou Traoré",
        lastMessage: "Merci, j'ai bien reçu le reçu de paiement.",
        time: "Hier",
        unread: 0,
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e16fd47?auto=format&fit=crop&q=80&w=200",
        isAgent: false,
    },
    {
        id: "3",
        name: "Amadou Diallo",
        lastMessage: "Est-ce que le parking est inclus dans le loyer ?",
        time: "Lun",
        unread: 0,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        isAgent: false,
    },
];

const ChatPage = () => {
    return (
        <div className="bg-cream-immo min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-50 flex flex-col md:flex-row h-[80vh]">
                    {/* Sidebar Chat List */}
                    <aside className="w-full md:w-96 border-r border-gray-50 flex flex-col bg-white">
                        <div className="p-8 border-b border-gray-50 space-y-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-black text-indigo-immo tracking-tight">Messages</h1>
                                <button className="p-2 bg-indigo-immo/5 text-indigo-immo rounded-full hover:bg-gold-immo transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher une discussion..."
                                    className="w-full bg-cream-immo/50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-gold-immo transition-all text-sm font-medium"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto">
                            {mockChats.map((chat) => (
                                <div key={chat.id} className="p-6 flex gap-4 cursor-pointer hover:bg-cream-immo transition-all border-b border-gray-50 group">
                                    <div className="relative shrink-0">
                                        <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-immo/5" />
                                        {chat.isAgent && (
                                            <div className="absolute -bottom-1 -right-1 bg-gold-immo text-indigo-immo p-1 rounded-full border-2 border-white">
                                                <ShieldCheck size={10} fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0 flex flex-col justify-center">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold text-indigo-immo truncate group-hover:text-gold-immo transition-colors">{chat.name}</h3>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{chat.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500 truncate pr-4">{chat.lastMessage}</p>
                                            {chat.unread > 0 ? (
                                                <span className="bg-gold-immo text-indigo-immo text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                                                    {chat.unread}
                                                </span>
                                            ) : (
                                                <CheckCheck size={14} className="text-green-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Chat Preview (Placeholder for desktop) */}
                    <main className="hidden md:flex flex-grow flex-col items-center justify-center bg-cream-immo/30 p-10 text-center space-y-6">
                        <div className="p-8 bg-white rounded-full shadow-xl">
                            <MessageCircle size={64} className="text-gold-immo" strokeWidth={1} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Vos Discussions IMMO</h2>
                            <p className="text-gray-500 max-w-xs font-medium leading-relaxed">
                                Connectez-vous directement aux agents certifiés pour vos visites et questions.
                            </p>
                        </div>
                        <Link href="https://wa.me/+2250102030405" className="btn-primary flex items-center gap-2 py-3 px-6 text-sm">
                            <Phone size={16} />
                            Support WhatsApp Rapide
                        </Link>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
