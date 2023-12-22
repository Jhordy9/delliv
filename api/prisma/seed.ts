import { OrderStatus, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();
const orderStatuses: OrderStatus[] = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'RETURNED',
];

async function main() {
  // Seed users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const email = `user${i}@example.com`;
    const password = hashSync('password', 10);
    const name = `User ${i}`;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    users.push(user);
  }

  // Seed orders
  for (let i = 1; i <= 120; i++) {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const userId = users[randomUserIndex].id;
    const address = `123 Example St, City ${i}, Country ${i + 1}`;
    const status =
      orderStatuses[Math.floor(Math.random() * orderStatuses.length)];

    await prisma.order.create({
      data: {
        user_id: userId,
        address,
        status,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
