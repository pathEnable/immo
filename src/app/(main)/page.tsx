import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Home, ShieldCheck, Zap, ArrowRight, User } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const featuredProperties = await prisma.property.findMany({
    where: { status: "AVAILABLE", isVerified: true },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      price: true,
      location: true,
      neighborhood: true,
      type: true,
      images: true,
      isVerified: true,
    },
  });

  // Dynamic stats from DB
  const [propertyCount, userCount] = await Promise.all([
    prisma.property.count({ where: { status: "AVAILABLE" } }),
    prisma.user.count(),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-indigo-immo overflow-hidden">
        {/* Background Pattern/Gradients */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-immo/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-gold-immo font-bold text-sm tracking-wide border border-white/20">
                <ShieldCheck size={18} />
                Vérifié & Certifié pour votre sécurité
              </div>

              <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Votre <span className="text-gold-immo">chez-vous</span>, <br className="hidden md:block" />
                vérifié et sécurisé.
              </h1>

              <p className="text-lg md:text-xl text-indigo-200 max-w-lg leading-relaxed">
                Connectez-vous aux meilleures propriétés certifiées d&apos;Abidjan. Paiements Wave/Orange sécurisés.
              </p>

              {/* Search Bar */}
              <form action="/search" method="GET" className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100">
                  <MapPin className="text-gold-immo shrink-0" size={20} />
                  <input
                    type="text"
                    name="q"
                    placeholder="Quartier (ex: Cocody, Angré...)"
                    className="w-full outline-none text-indigo-immo font-medium placeholder:text-gray-400"
                  />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <Home className="text-gold-immo shrink-0" size={20} />
                  <select name="type" className="w-full outline-none text-indigo-immo font-medium bg-transparent cursor-pointer">
                    <option value="">Type de bien</option>
                    <option value="Appartement">Appartement</option>
                    <option value="Villa">Villa</option>
                    <option value="Studio">Studio</option>
                    <option value="Bureau">Bureau</option>
                    <option value="Chambre">Chambre</option>
                  </select>
                </div>
                <button type="submit" className="btn-secondary flex items-center justify-center gap-2 py-4 px-8">
                  <Search size={20} />
                  Rechercher
                </button>
              </form>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">{propertyCount}+</span>
                  <span className="text-sm text-indigo-300">Biens disponibles</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">{userCount}+</span>
                  <span className="text-sm text-indigo-300">Utilisateurs inscrits</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative z-10 card-immo p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
                  alt="Maison moderne avec piscine"
                  width={600}
                  height={500}
                  className="rounded-xl w-full h-[500px] object-cover"
                  priority
                />
                <div className="absolute top-8 right-8 verified-badge py-2 px-4 text-sm scale-125">
                  <ShieldCheck size={16} />
                  Vérifié par IMMO
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gold-immo/20 rounded-xl text-gold-immo">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-bold text-indigo-immo text-lg leading-tight">Réservation Rapide</p>
                    <p className="text-sm text-gray-500">Via Mobile Money</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-cream-immo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-gold-immo font-bold tracking-widest uppercase text-sm mb-3">Sélection Premium</h2>
              <h3 className="text-4xl font-black text-indigo-immo tracking-tight">Propriétés en Vedette</h3>
            </div>
            <Link href="/search" className="flex items-center gap-2 text-indigo-immo font-bold hover:text-gold-immo transition-colors group">
              Voir tout le catalogue
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((prop) => (
                <Link key={prop.id} href={`/property/${prop.id}`} className="card-immo group block">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={prop.images[0]}
                      alt={prop.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {prop.isVerified && (
                      <div className="absolute top-4 left-4 verified-badge">
                        <ShieldCheck size={14} />
                        Vérifié
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-indigo-immo text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                      {prop.price.toLocaleString()} FCFA
                      <span className="text-xs font-normal opacity-80 block text-right">/mois</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                      <MapPin size={16} />
                      {prop.location} • {prop.neighborhood}
                    </div>
                    <h4 className="text-xl font-bold text-indigo-immo leading-tight group-hover:text-gold-immo transition-colors">
                      {prop.title}
                    </h4>
                    <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Home size={16} />
                        {prop.type}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-cream-immo rounded-full flex items-center justify-center mx-auto mb-6">
                <Home size={36} className="text-gold-immo" />
              </div>
              <h4 className="text-2xl font-bold text-indigo-immo mb-3">Bientôt disponible</h4>
              <p className="text-gray-500 max-w-md mx-auto">
                Nos agents certifiés préparent les meilleures propriétés pour vous. Revenez très vite !
              </p>
              <Link href="/search" className="btn-primary inline-flex items-center gap-2 mt-8">
                <Search size={18} />
                Voir toutes les propriétés
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-indigo-immo mb-12">Pourquoi choisir IMMO ?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gold-immo/10 rounded-2xl flex items-center justify-center text-gold-immo mx-auto">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold text-indigo-immo">Vérification Physique</h4>
              <p className="text-gray-600">Nos agents visitent chaque bien pour garantir que les photos correspondent à la réalité.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-indigo-immo/10 rounded-2xl flex items-center justify-center text-indigo-immo mx-auto">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold text-indigo-immo">Paiement Instantané</h4>
              <p className="text-gray-600">Utilisez Wave ou Orange Money pour vos réservations et loyers en toute simplicité.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-terracotta-immo/10 rounded-2xl flex items-center justify-center text-terracotta-immo mx-auto">
                <User size={32} />
              </div>
              <h4 className="text-xl font-bold text-indigo-immo">Agents Certifiés</h4>
              <p className="text-gray-600">Travaillez avec des professionnels de l&apos;immobilier formés et notés par la communauté.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
