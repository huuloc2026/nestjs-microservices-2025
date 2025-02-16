import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️ Truncating database...');
  await prisma.$transaction([
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  console.log('✅ Database truncated');

  console.log('🌱 Seeding database...');
  const salt = '0000';
  // Seed Users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 100 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      salt: salt,
      verifyCode: '1111',
      password: hashSync(`password123.${salt}`, 10),
      role: faker.helpers.arrayElement(['ADMIN', 'CLIENT', 'SELLER']),
    })),
  });
  console.log('✅ Users seeded');

  // Seed Categories
  await prisma.category.createMany({
    data: [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home Appliances' },
    ],
  });
  console.log('✅ Categories seeded');

  // Fetch category IDs
  const categoryIds = (
    await prisma.category.findMany({ select: { id: true } })
  ).map((c) => c.id);

  // Seed Products
  await prisma.product.createMany({
    data: Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 5, max: 100 }),
      categoryId: faker.helpers.arrayElement(categoryIds),
    })),
  });
  console.log('✅ Products seeded');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((error) => {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
