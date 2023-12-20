import { prismaClient } from '../src/utils/db';
// @ts-ignore
import { customers } from './seeds/customers';

async function main() {
  for (const customer of customers) {
    await prismaClient.customer.upsert({
      where: { id: customer.id },
      update: {},
      create: customer,
    });
  }
  console.log(`Created ${customers.length} customers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
