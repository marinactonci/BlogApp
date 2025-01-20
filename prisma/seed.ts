const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

type Category = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

async function main() {
  // Seed Users
  const userEmails = new Set<string>();
  while (userEmails.size < 1000) {
    userEmails.add(faker.internet.email());
  }

  const users = await Promise.all(
    Array.from(userEmails).map(async (email) => {
      return prisma.user.create({
        data: {
          email,
          name: faker.person.fullName(),
          image: faker.image.avatar(),
        },
      });
    })
  );

  // Seed Categories (ensure unique names)
  const categoryNames = new Set<string>();
  while (categoryNames.size < 20) {
    categoryNames.add(faker.lorem.word());
  }

  const categories = await Promise.all(
    Array.from(categoryNames).map(async (name) => {
      return prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    })
  );

  // Seed Blogs
  const blogs = await Promise.all(
    Array.from({ length: 10000 }).map(async () => {
      return prisma.blog.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(3),
          authorId: faker.helpers.arrayElement(users).id,
          categories: {
            connect: faker.helpers
              .arrayElements(categories, { min: 1, max: 3 })
              .map((category: Category) => ({ id: category.id })),
          },
        },
      });
    })
  );

  // Seed Comments
  await Promise.all(
    Array.from({ length: 700 }).map(async () => {
      return prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: faker.helpers.arrayElement(users).id,
          blogId: faker.helpers.arrayElement(blogs).id,
        },
      });
    })
  );

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
