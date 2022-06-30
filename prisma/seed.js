const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getPosts().map((post) => {
      return db.post.create({ data: post });
    })
  );
}

function getPosts() {
  return [
    {
      title: "My Self-Improvement Journey",
      body: "It has been a long, arduous, rewarding journey of self-discovery.",
    },
    {
      title: "My Dogs - An Ode to Rocky and Tyga",
      body: "They're the best. In the words of Tina Turner - Simply The Best.",
    },
    {
      title: "My Thoughts on Remote Work",
      body: "I've been finding a lot of success working at coffe shops with friends. Working at home has been trying - at times, I get distracted.",
    },
  ];
}

seed();
