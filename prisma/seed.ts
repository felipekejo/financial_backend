import { prisma } from "@/lib/prisma";

async function seed() {
  await prisma.user.create({
    data: {
      id: "57ce83d9-50e4-4e03-8521-ad12dba76049",
      email: "felipe@felipe.com",
      name: "Felipe",
      password_hash: "123456",
    },
  });
}

seed().then(() => {
  console.log("Seed complete");
  prisma.$disconnect();
});
