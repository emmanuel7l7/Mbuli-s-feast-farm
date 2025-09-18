import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mbulis.com' },
    update: {},
    create: {
      email: 'admin@mbulis.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create delivery user
  const deliveryPassword = await bcrypt.hash('delivery123', 10);
  
  const delivery = await prisma.user.upsert({
    where: { email: 'driver@mbulis.com' },
    update: {},
    create: {
      email: 'driver@mbulis.com',
      password: deliveryPassword,
      role: 'DELIVERY',
    },
  });

  // Create sample products
  const products = [
    {
      name: 'Whole Chicken',
      description: 'Fresh, farm-raised whole chicken. Perfect for roasting. Approx. 1.5kg.',
      price: 15000,
      stock: 50,
      status: 'in-stock',
    },
    {
      name: 'Chicken Thighs (1kg)',
      description: 'Juicy and tender chicken thighs, bone-in and skin-on. Ideal for grilling or stewing.',
      price: 18000,
      stock: 30,
      status: 'in-stock',
    },
    {
      name: 'Chicken Wings (1kg)',
      description: 'Perfectly portioned wings, ready for your favorite sauce. Great for parties.',
      price: 12000,
      stock: 0,
      status: 'out-of-stock',
    },
    {
      name: 'Chicken Breast (1kg)',
      description: 'Lean and versatile boneless, skinless chicken breast. A healthy choice for any meal.',
      price: 20000,
      stock: 25,
      status: 'in-stock',
    },
    {
      name: 'Chicken Drumsticks (1kg)',
      description: 'A family favorite, these drumsticks are meaty and flavorful. Perfect for frying or baking.',
      price: 16000,
      stock: 8,
      status: 'low-stock',
    },
    {
      name: 'Ground Chicken (500g)',
      description: 'Lean ground chicken, a great alternative for burgers, meatballs, and sauces.',
      price: 9000,
      stock: 40,
      status: 'in-stock',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }

  // Create sample delivery
  await prisma.delivery.upsert({
    where: { id: 'sample-delivery' },
    update: {},
    create: {
      id: 'sample-delivery',
      address: '123 Mbezi Beach, Dar es Salaam, Tanzania',
      status: 'pending',
      userId: delivery.id,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin login: admin@mbulis.com / admin123');
  console.log('🚚 Delivery login: driver@mbulis.com / delivery123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });