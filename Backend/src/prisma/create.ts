import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(email: string, password: string, name: string) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
  return user;
}

async function createInvoice(
  amount: number,
  dueDate: Date,
  details: string,
  userId: number,
) {
  const invoice = await prisma.invoice.create({
    data: {
      amount,
      due_date: dueDate,
      details,
      userId,
    },
  });
  return invoice;
}

async function createBill(
  amount: number,
  dueDate: Date,
  details: string,
  userId: number,
) {
  const bill = await prisma.bill.create({
    data: {
      amount,
      due_date: dueDate,
      details,
      userId,
    },
  });
  return bill;
}

// Function to generate a random number within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random date within the next year
function getRandomDate() {
  const start = new Date();
  const end = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Details arrays for random selection
const invoiceDetails = [
  'Web Design Services',
  'Consulting Fee',
  'BOFA',
  'Laptop Purchase',
  'Phone Purchase',
  'Best Buy',
];
const billDetails = [
  'Electric Bill',
  'Car Bill',
  'House Rent',
  'Internet Bill',
  'Water Bill',
];

async function main() {
  // Specify the user ID for which you want to add random data
  const userId = 1; // Change this to your user's ID

  // Create a few random invoices and bills for the user
  for (let i = 0; i < 5; i++) {
    // Generate 5 random invoices and bills
    const invoice = await createInvoice(
      getRandomInt(100, 1000), // Random amount between 100 and 1000
      getRandomDate(), // Random due date within the next year
      invoiceDetails[getRandomInt(0, invoiceDetails.length - 1)], // Randomly selected detail
      userId,
    );
    console.log('Created invoice:', invoice);

    const bill = await createBill(
      getRandomInt(50, 500), // Random amount between 50 and 500
      getRandomDate(), // Random due date within the next year
      billDetails[getRandomInt(0, billDetails.length - 1)], // Randomly selected detail
      userId,
    );
    console.log('Created bill:', bill);
  }
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
