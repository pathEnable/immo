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
                        <p className="text-indigo-200 leading-relaxed">
                            La plateforme immobilière de confiance en Afrique. Nous connectons locataires et propriétaires en toute sécurité et simplicité.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-gold-immo hover:text-indigo-immo transition-all" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-gold-immo hover:text-indigo-immo transition-all" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/10 rounded-full hover:bg-gold-immo hover:text-indigo-immo transition-all" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-gold-immo mb-6">Liens Rapides</h4>
                        <ul className="space-y-4">
                            <li><Link href="/search" className="text-indigo-200 hover:text-gold-immo transition-colors">Rechercher un bien</Link></li>
                            <li><Link href="/dashboard" className="text-indigo-200 hover:text-gold-immo transition-colors">Gestion Propriétaire</Link></li>
                            <li><Link href="/search" className="text-indigo-200 hover:text-gold-immo transition-colors">Nos Agents Certifiés</Link></li>
                            <li><Link href="/login" className="text-indigo-200 hover:text-gold-immo transition-colors">Se connecter</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold text-gold-immo mb-6">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href="/search" className="text-indigo-200 hover:text-gold-immo transition-colors">Vérification de Biens</Link></li>
                            <li><Link href="/dashboard" className="text-indigo-200 hover:text-gold-immo transition-colors">Paiement Sécurisé</Link></li>
                            <li><Link href="/chat" className="text-indigo-200 hover:text-gold-immo transition-colors">Assistance & Chat</Link></li>
                            <li><Link href="/dashboard/become-agent" className="text-indigo-200 hover:text-gold-immo transition-colors">Devenir Agent</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-gold-immo mb-6">Contact</h4>
                        <div className="space-y-4">
                            <a href="tel:+2250102030405" className="flex items-center gap-3 text-indigo-200 hover:text-gold-immo transition-colors">
                                <Phone className="text-gold-immo shrink-0" size={20} />
                                <span>+225 01 02 03 04 05</span>
                            </a>
                            <a href="mailto:contact@immo-afrique.com" className="flex items-center gap-3 text-indigo-200 hover:text-gold-immo transition-colors">
                                <Mail className="text-gold-immo shrink-0" size={20} />
                                <span>contact@immo-afrique.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-indigo-200">
                                <MapPin className="text-gold-immo shrink-0" size={20} />
                                <span>Cocody, Plateau, Abidjan</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-center text-indigo-300 text-sm pb-20 md:pb-0">
                    <p>© {new Date().getFullYear()} IMMO Platform. Tous droits réservés. Développé pour l&apos;Afrique.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
