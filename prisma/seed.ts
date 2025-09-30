import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  //* Create fake todos
  await prisma.todo.createMany({
    data: Array.from({ length: 20 }, () => ({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    })),
  });

  //* Create fake users
  // await prisma.user.createMany({
  //   data: Array.from({ length: 20 }, () => ({
  //     name: faker.internet.userName(),
  //     email: faker.internet.email(),
  //     address: {
  //       street: faker.address.street(),
  //       city: faker.address.city(),
  //       state: faker.address.state(),
  //       zip: faker.address.zipCode(),
  //     },
  //   })),
  // });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
