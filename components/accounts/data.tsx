type MonthlyIncomeData = {
  income: number;
  change: number;
  limit: number;
};

const generateMonthlyIncomeData = (baseIncome: number): MonthlyIncomeData[] => {
  let monthlyData: MonthlyIncomeData[] = [];
  for (let i = 0; i < 12; i++) {
    const change = Math.floor(Math.random() * 20) - 10;
    const income = baseIncome + (baseIncome * change) / 100;
    monthlyData.push({ income, change, limit: 25000 });
  }
  return monthlyData;
};

export const mails = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "American Express",
    available: 7665,
    change: 12,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Credit Card",
    paymentIds: ["m5gr84i9"],
    income: 10400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Chase Credit Card",
    available: 4566,
    change: -3,
    date: "2023-12-12T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Credit Card",
    paymentIds: ["3u1reuv4"],
    income: 14405,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(500),
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Cash Rewards",
    available: 4568,
    change: 1,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Credit Card",
    income: 9400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(790),
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Regular Savings",
    available: 4568,
    change: 14,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Savings",
    monthlyIncomeData: generateMonthlyIncomeData(758),
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-17112333",
    name: "Checkings Account",
    available: 8574,
    change: -2,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Savings",
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-17131231231",
    name: "Robinhood",
    available: 5010,
    change: -26,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Investments",
    monthlyIncomeData: generateMonthlyIncomeData(500),
  },
  {
    id: "3e7c3f6d-bdf5-4sdae-8d90-17131231231",
    name: "Wealthfront",
    available: 10708,
    change: 19,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Investments",
    monthlyIncomeData: generateMonthlyIncomeData(500),
  },
];

export type Mail = (typeof mails)[number];

export const payments = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "Spotify",
    label: "Subscriptions",
    date: "2024-01-01T09:00:00",
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
  },
  {
    id: "m5gr84i9",
    amount: 29,
    status: "Amazon",
    label: "Subscriptions",
    date: "2024-12-31T09:00:00",
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "Food",
    label: "Food",
    date: "2024-01-01T09:00:00",
    mailId: "110e8400-e29b-11d4-a716-446655440000",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "Gas",
    label: "Car",
    date: "2024-01-01T09:00:00",
    mailId: "110e8400-e29b-11d4-a716-446655440000",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "Screws",
    label: "House",
    date: "2024-01-01T09:00:00",
    mailId: "110e8400-e29b-11d4-a716-446655440000",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "Pizzamania",
    label: "Food",
    date: "2024-01-01T09:00:00",
    mailId: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "Fixed car",
    label: "Car",
    date: "2024-01-01T09:00:00",
    mailId: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "Home supplies",
    label: "House",
    date: "2024-01-01T09:00:00",
    mailId: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "Electrical bill",
    label: "House",
    date: "2024-01-01T09:00:00",
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "Pizza",
    label: "Food",
    date: "2023-10-01T09:00:00",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "Meme-food",
    label: "Food",
    date: "2023-12-01T09:00:00",
  },
];

export type Payment = (typeof payments)[number];

export const accounts = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@gmail.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@me.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export type Account = (typeof accounts)[number];

export const contacts = [
  {
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
  },
  {
    name: "Liam Wilson",
    email: "liam.wilson@example.com",
  },
  {
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
  },
  {
    name: "Noah Martinez",
    email: "noah.martinez@example.com",
  },
  {
    name: "Ava Taylor",
    email: "ava.taylor@example.com",
  },
  {
    name: "Lucas Brown",
    email: "lucas.brown@example.com",
  },
  {
    name: "Sophia Smith",
    email: "sophia.smith@example.com",
  },
  {
    name: "Ethan Wilson",
    email: "ethan.wilson@example.com",
  },
  {
    name: "Isabella Jackson",
    email: "isabella.jackson@example.com",
  },
  {
    name: "Mia Clark",
    email: "mia.clark@example.com",
  },
  {
    name: "Mason Lee",
    email: "mason.lee@example.com",
  },
  {
    name: "Layla Harris",
    email: "layla.harris@example.com",
  },
  {
    name: "William Anderson",
    email: "william.anderson@example.com",
  },
  {
    name: "Ella White",
    email: "ella.white@example.com",
  },
  {
    name: "James Thomas",
    email: "james.thomas@example.com",
  },
  {
    name: "Harper Lewis",
    email: "harper.lewis@example.com",
  },
  {
    name: "Benjamin Moore",
    email: "benjamin.moore@example.com",
  },
  {
    name: "Aria Hall",
    email: "aria.hall@example.com",
  },
  {
    name: "Henry Turner",
    email: "henry.turner@example.com",
  },
  {
    name: "Scarlett Adams",
    email: "scarlett.adams@example.com",
  },
];

export type Contact = (typeof contacts)[number];
