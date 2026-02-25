import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import 'dotenv/config'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding database...')

    // Clean existing data
    await prisma.property.deleteMany()
    await prisma.agent.deleteMany()

    // Create Agents
    const agent1 = await prisma.agent.create({
        data: {
            name: 'Moussa Diop',
            email: 'moussa.diop@immo.ci',
            profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
            bio: "Spécialiste du marché immobilier à Abidjan depuis plus de 8 ans. J'accompagne mes clients dans la recherche de biens d'exception.",
            experience: 8,
            isCertified: true,
            whatsapp: '+2250102030405',
            phoneNumber: '+2250102030405',
        },
    })

    const agent2 = await prisma.agent.create({
        data: {
            name: 'Aminata Koné',
            email: 'aminata.kone@immo.ci',
            profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd47?auto=format&fit=crop&q=80&w=400',
            bio: "Experte en immobilier résidentiel et commercial. 5 ans d'expérience sur le marché abidjanais.",
            experience: 5,
            isCertified: true,
            whatsapp: '+2250708091011',
            phoneNumber: '+2250708091011',
        },
    })

    const agent3 = await prisma.agent.create({
        data: {
            name: 'Jean-Baptiste Kouassi',
            email: 'jb.kouassi@immo.ci',
            profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
            bio: "Agent immobilier passionné, spécialisé dans les quartiers huppés de Cocody et Marcory.",
            experience: 3,
            isCertified: false,
            whatsapp: '+2250504050607',
            phoneNumber: '+2250504050607',
        },
    })

    console.log(`✅ Created ${3} agents`)

    // Create Properties
    const properties = [
        {
            title: 'Appartement de luxe - Cocody Lycée Technique',
            description: "Magnifique appartement de 3 pièces situé au cœur de Cocody, à deux pas du Lycée Technique. Cet espace moderne offre un grand salon lumineux, deux chambres spacieuses avec placards intégrés, et une cuisine entièrement équipée. Un balcon privé offre une vue dégagée sur le quartier.",
            price: 450000,
            location: 'Cocody, Abidjan',
            neighborhood: 'Lycée Technique',
            type: 'Appartement',
            status: 'AVAILABLE',
            isVerified: true,
            images: [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1512918766671-5079a0d8794c?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800',
            ],
            amenities: ['Parking Sécurisé', 'Climatisation', 'Gardien 24h/7', 'WiFi', 'Balcon'],
            agentId: agent1.id,
        },
        {
            title: 'Villa Moderne avec Piscine - Angré 7ème Tranche',
            description: "Superbe villa contemporaine dans le quartier prisé d'Angré 7ème Tranche. 4 chambres, piscine privée, jardin paysagé et garage double. Finitions haut de gamme, sécurité renforcée.",
            price: 850000,
            location: 'Cocody, Abidjan',
            neighborhood: '7ème Tranche',
            type: 'Villa',
            status: 'AVAILABLE',
            isVerified: true,
            images: [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
            ],
            amenities: ['Piscine', 'Parking Sécurisé', 'Climatisation', 'Gardien 24h/7', 'Jardin', 'Garage'],
            agentId: agent1.id,
        },
        {
            title: 'Studio Meublé Chic - Plateau Centre-Ville',
            description: "Studio entièrement meublé et équipé au cœur du Plateau, le quartier des affaires. Idéal pour un professionnel. Accès rapide aux transports et commerces.",
            price: 35000,
            location: 'Plateau, Abidjan',
            neighborhood: 'Centre-Ville',
            type: 'Studio',
            status: 'AVAILABLE',
            isVerified: true,
            images: [
                'https://images.unsplash.com/photo-1536376073347-35712e390ee5?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1522708323590-d248b6d0267d?auto=format&fit=crop&q=80&w=800',
            ],
            amenities: ['Meublé', 'Climatisation', 'WiFi', 'Ascenseur'],
            agentId: agent2.id,
        },
        {
            title: 'Appartement F3 - Rivera Palmeraie',
            description: "Bel appartement de 3 pièces à Rivera Palmeraie, quartier calme et résidentiel. Deux chambres, salon-séjour spacieux, cuisine équipée et balcon avec vue sur la verdure.",
            price: 350000,
            location: 'Cocody, Abidjan',
            neighborhood: 'Rivera Palmeraie',
            type: 'Appartement',
            status: 'AVAILABLE',
            isVerified: false,
            images: [
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1560448204-e02f11c07966?auto=format&fit=crop&q=80&w=800',
            ],
            amenities: ['Parking Sécurisé', 'Climatisation', 'Balcon'],
            agentId: agent2.id,
        },
        {
            title: 'Studio Meublé Moderne - Zone 4',
            description: "Studio moderne entièrement meublé situé dans la fameuse Zone 4. Proche de tous les commerces, restaurants et de la vie nocturne. Parfait pour les jeunes professionnels.",
            price: 500000,
            location: 'Marcory, Abidjan',
            neighborhood: 'Zone 4',
            type: 'Studio',
            status: 'AVAILABLE',
            isVerified: true,
            images: [
                'https://images.unsplash.com/photo-1522708323590-d248b6d0267d?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1560185127-6a8c7c5ad2b3?auto=format&fit=crop&q=80&w=800',
            ],
            amenities: ['Meublé', 'Climatisation', 'WiFi', 'Gardien 24h/7'],
            agentId: agent3.id,
        },
        {
            title: 'Villa Duplex Standing - Riviera Golf',
            description: "Villa duplex de grand standing dans le prestigieux quartier de Riviera Golf. 5 chambres, 4 salles de bain, double séjour, cuisine américaine, terrasse panoramique et piscine.",
            price: 1200000,
            location: 'Cocody, Abidjan',
            neighborhood: 'Riviera Golf',
            type: 'Villa',
            status: 'AVAILABLE',
            isVerified: true,
            images: [
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            ],
            amenities: ['Piscine', 'Parking Sécurisé', 'Climatisation', 'Gardien 24h/7', 'Jardin', 'Terrasse', 'Garage'],
            agentId: agent1.id,
        },
        {
            title: 'Chambre Meublée - Yopougon Millionnaire',
            description: "Chambre meublée propre et sécurisée dans une résidence à Yopougon Millionnaire. Accès eau et électricité inclus. Idéal pour étudiant ou jeune travailleur.",
            price: 75000,
            location: 'Yopougon, Abidjan',
            neighborhood: 'Millionnaire',
            type: 'Chambre',
            status: 'AVAILABLE',
            isVerified: false,
            images: [
                'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
            ],
            amenities: ['Meublé', 'Eau & Électricité inclus'],
            agentId: agent3.id,
        },
        {
            title: 'Bureau Open Space - Plateau Cité Administrative',
            description: "Espace de bureau moderne en open space au cœur de la Cité Administrative du Plateau. 120m², climatisé, fibre optique, parking souterrain. Idéal pour startup ou PME.",
            price: 650000,
            location: 'Plateau, Abidjan',
            neighborhood: 'Cité Administrative',
            type: 'Bureau',
            status: 'AVAILABLE',
            isVerified: true,
            images: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800',
            ],
            amenities: ['Climatisation', 'WiFi Fibre', 'Parking Sécurisé', 'Ascenseur', 'Salle de réunion'],
            agentId: agent2.id,
        },
    ]

    for (const prop of properties) {
        await prisma.property.create({ data: prop })
    }

    console.log(`✅ Created ${properties.length} properties`)
    console.log('🎉 Seeding complete!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
