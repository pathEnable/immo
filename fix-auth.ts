import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
    // 1. Promote existing user
    const updatedUser = await prisma.user.update({
        where: { email: 'patrice03dev@gmail.com' },
        data: { role: 'ADMIN' }
    })
    console.log('PROMOTED_USER:', updatedUser.email, updatedUser.role)

    // 2. Create a new admin account with known password
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@immo.ci' },
        update: { password: hashedPassword, role: 'ADMIN' },
        create: {
            email: 'admin@immo.ci',
            name: 'Admin IMMO',
            password: hashedPassword,
            role: 'ADMIN'
        }
    })
    console.log('ADMIN_ACCOUNT_READY:', adminUser.email, 'password: admin123')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
