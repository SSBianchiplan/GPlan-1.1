import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gplan.com' },
    update: {},
    create: {
      email: 'admin@gplan.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  });

  console.log('✓ Admin user created:', admin.email);

  // Create sample products
  const products = [
    {
      code: 'PROD-001',
      name: 'Componente Eletrônico A',
      description: 'Componente eletrônico padrão',
      category: 'Eletrônicos',
      unit: 'UN',
      minStock: 50,
      maxStock: 500,
      currentStock: 150,
      unitPrice: 12.50,
    },
    {
      code: 'PROD-002',
      name: 'Placa de Circuito B',
      description: 'Placa de circuito impresso',
      category: 'Eletrônicos',
      unit: 'UN',
      minStock: 20,
      maxStock: 200,
      currentStock: 80,
      unitPrice: 45.00,
    },
    {
      code: 'PROD-003',
      name: 'Conector C',
      description: 'Conector tipo USB-C',
      category: 'Conectores',
      unit: 'UN',
      minStock: 100,
      maxStock: 1000,
      currentStock: 350,
      unitPrice: 3.75,
    },
    {
      code: 'PROD-004',
      name: 'Resistor 10K',
      description: 'Resistor 10K Ohm 1/4W',
      category: 'Componentes',
      unit: 'UN',
      minStock: 500,
      maxStock: 5000,
      currentStock: 1200,
      unitPrice: 0.15,
    },
    {
      code: 'PROD-005',
      name: 'Capacitor 100uF',
      description: 'Capacitor eletrolítico 100uF',
      category: 'Componentes',
      unit: 'UN',
      minStock: 300,
      maxStock: 3000,
      currentStock: 45, // Low stock
      unitPrice: 0.25,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: {},
      create: product,
    });
  }

  console.log('✓ Sample products created');

  // Create a production plan
  const plan = await prisma.productionPlan.create({
    data: {
      name: 'Plano de Produção Q1 2024',
      description: 'Planejamento do primeiro trimestre de 2024',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      status: 'IN_PROGRESS',
      userId: admin.id,
    },
  });

  console.log('✓ Sample production plan created');

  // Get products for orders
  const allProducts = await prisma.product.findMany();

  // Create sample production orders
  for (let i = 0; i < 5; i++) {
    const product = allProducts[i % allProducts.length];
    await prisma.productionOrder.create({
      data: {
        orderNumber: `OP-2024-${String(i + 1).padStart(3, '0')}`,
        productionPlanId: plan.id,
        productId: product.id,
        quantity: Math.floor(Math.random() * 100) + 50,
        priority: ['LOW', 'NORMAL', 'HIGH', 'URGENT'][Math.floor(Math.random() * 4)] as any,
        status: ['PENDING', 'IN_PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 3)] as any,
        scheduledDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
        userId: admin.id,
      },
    });
  }

  console.log('✓ Sample production orders created');

  // Create some stock movements
  for (const product of allProducts.slice(0, 3)) {
    await prisma.stockMovement.create({
      data: {
        productId: product.id,
        type: 'IN',
        quantity: 100,
        reference: 'NF-' + Math.floor(Math.random() * 10000),
        notes: 'Entrada inicial de estoque',
        userId: admin.id,
      },
    });
  }

  console.log('✓ Sample stock movements created');

  console.log('🌱 Seed completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('   Email: admin@gplan.com');
  console.log('   Password: admin123\n');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
