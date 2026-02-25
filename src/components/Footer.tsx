import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-indigo-immo text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-black tracking-tighter text-white">
                                IMMO<span className="text-gold-immo">.</span>
                            </span>
                        </Link>
                        <p className="text-indigo-100 leading-relaxed">
                            La plateforme immobilière de confiance en Afrique. Nous connectons locataires et propriétaires en toute sécurité et simplicité.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-gold-immo hover:text-indigo-immo transition-all">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-gold-immo hover:text-indigo-immo transition-all">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-gold-immo hover:text-indigo-immo transition-all">
                                <Twitter size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-gold-immo mb-6">Liens Rapides</h4>
                        <ul className="space-y-4">
                            <li><Link href="/search" className="hover:text-gold-immo transition-colors">Rechercher un bien</Link></li>
                            <li><Link href="/dashboard" className="hover:text-gold-immo transition-colors">Gestion Propriétaire</Link></li>
                            <li><Link href="/agents" className="hover:text-gold-immo transition-colors">Nos Agents Certifiés</Link></li>
                            <li><Link href="/about" className="hover:text-gold-immo transition-colors">À propos de nous</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold text-gold-immo mb-6">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="hover:text-gold-immo transition-colors">Vérification de Biens</Link></li>
                            <li><Link href="#" className="hover:text-gold-immo transition-colors">Paiement Sécurisé Escrow</Link></li>
                            <li><Link href="#" className="hover:text-gold-immo transition-colors">Assistance 24/7</Link></li>
                            <li><Link href="#" className="hover:text-gold-immo transition-colors">Conseil Immobilier</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-gold-immo mb-6">Contact</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Phone className="text-gold-immo" size={20} />
                                <span>+225 01 02 03 04 05</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-gold-immo" size={20} />
                                <span>contact@immo-afrique.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="text-gold-immo" size={20} />
                                <span>Cocody, Plateau, Abidjan</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-center text-indigo-200 text-sm pb-20 md:pb-0">
                    <p>© {new Date().getFullYear()} IMMO Platform. Tous droits réservés. Développé pour l&apos;Afrique.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
