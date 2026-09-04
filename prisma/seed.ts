import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.post.deleteMany()
  
  await prisma.post.createMany({
    data: [
      { crop: "Tomato", grade: "Grade A", quantity: "50kg", price: 1800, rating: 4.5 },
      { crop: "Onion", grade: "Grade B", quantity: "100kg", price: 2500, rating: 4.2 },
      { crop: "Potato", grade: "Grade A", quantity: "200kg", price: 4400, rating: 4.8 },
      { crop: "Carrot", grade: "Grade C", quantity: "30kg", price: 900, rating: 3.5 },
    ]
  })
  console.log("Database seeded successfully!");
}
main().catch(console.error).finally(() => prisma.$disconnect())
