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
    name: "Apple Inc.",
    ticker: "APPL",
    available: 7665,
    change: 12,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
    paymentIds: ["m5gr84i9"],
    income: 10400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Wealthfront",
    available: 4566,
    change: -3,
    date: "2023-12-12T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
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
    category: "Accounts",
    income: 9400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(790),
  },
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775d",
    name: "Disney",
    ticker: "DIS",
    available: 4665,
    change: 8,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
    paymentIds: ["m5gr84i9"],
    income: 5400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775am",
    name: "Amazon.com",
    ticker: "AMZN",
    available: 8665,
    change: -2,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
    paymentIds: ["m5gr84i9"],
    income: 13400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775t",
    name: "Tesla Inc.",
    ticker: "TSLA",
    available: 5665,
    change: 12,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
    paymentIds: ["m5gr84i9"],
    income: 12400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775m",
    name: "Microsoft Corp.",
    ticker: "MSFT",
    available: 3665,
    change: 9,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
    paymentIds: ["m5gr84i9"],
    income: 9400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775f",
    name: "Facebook",
    ticker: "FB",
    available: 3443,
    change: 15,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
    paymentIds: ["m5gr84i9"],
    income: 11400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775g",
    name: "Alphabet(Google)",
    ticker: "GOOG",
    available: 3443,
    change: 12,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Accounts",
    paymentIds: ["m5gr84i9"],
    income: 12400,
    limit: 25000,
    monthlyIncomeData: generateMonthlyIncomeData(1052),
  },
  // {
  //   id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
  //   name: "Regular Savings",
  //   available: 4568,
  //   change: 14,
  //   text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
  //   date: "2023-12-31T09:00:00",
  //   read: true,
  //   labels: ["Reccuring"],
  //   category: "Savings",
  //   monthlyIncomeData: generateMonthlyIncomeData(758),
  // },
  // {
  //   id: "3e7c3f6d-bdf5-46ae-8d90-17112333",
  //   name: "Checkings Account",
  //   available: 8574,
  //   change: -2,
  //   text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
  //   date: "2023-12-31T09:00:00",
  //   read: true,
  //   labels: ["Reccuring"],
  //   category: "Savings",
  // },
  // {
  //   id: "3e7c3f6d-bdf5-46ae-8d90-17131231231",
  //   name: "Robinhood",
  //   available: 5010,
  //   change: -26,
  //   text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
  //   date: "2023-12-31T09:00:00",
  //   read: true,
  //   labels: ["Reccuring"],
  //   category: "Investments",
  //   monthlyIncomeData: generateMonthlyIncomeData(500),
  // },
  // {
  //   id: "3e7c3f6d-bdf5-4sdae-8d90-17131231231",
  //   name: "Wealthfront",
  //   available: 10708,
  //   change: 19,
  //   text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
  //   date: "2023-12-31T09:00:00",
  //   read: true,
  //   labels: ["Reccuring"],
  //   category: "Investments",
  //   monthlyIncomeData: generateMonthlyIncomeData(500),
  // },
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

export type DataPoint = {
  time: string;
  revenue: number;
};

export type InvestmentData = {
  id: number;
  title: string;
  name: string;
  dataPoints: DataPoint[];
  revenue: number;
  subscription: number;
  mailId: string;
};

// Placeholder function for generating random data points
const generateDataPoints = (count: number): DataPoint[] => {
  const dataPoints: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    dataPoints.push({
      time: `2021-Q${i + 1}`,
      revenue: Math.floor(Math.random() * 20000 + 5000),
    });
  }
  return dataPoints;
};

// Placeholder data for investments
export const investmentData: InvestmentData[] = [
  {
    id: 1,
    title: "DIS",
    name: "Disney",
    dataPoints: generateDataPoints(4),
    revenue: 10400,
    subscription: 240,
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775d", // Link to a stock
  },
  {
    id: 2,
    title: "AAPL",
    name: "Apple",
    dataPoints: generateDataPoints(4),
    revenue: 14405,
    subscription: 300,
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
  },
  {
    id: 3,
    title: "GOOG",
    name: "Alphabet (Google)",
    dataPoints: generateDataPoints(4),
    revenue: 15040,
    subscription: 350,
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775g",
  },
  {
    id: 4,
    title: "FB",
    name: "Facebook",
    dataPoints: generateDataPoints(4),
    revenue: 12405,
    subscription: 250,
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775f",
  },
  {
    id: 5,
    title: "AMZN",
    name: "Amazon Inc.",
    dataPoints: generateDataPoints(4),
    revenue: 11405,
    subscription: 600,
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775am",
  },
  {
    id: 6,
    title: "TSLA",
    name: "Tesla Inc.",
    dataPoints: generateDataPoints(4),
    revenue: 17405,
    subscription: 390,
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775t",
  },
  {
    id: 7,
    title: "MSFT",
    name: "Microsoft Corp.",
    dataPoints: generateDataPoints(4),
    revenue: 16405,
    subscription: 250,
    mailId: "6c84fb90-12c4-11e1-840d-7b25c5ee775m",
  },
  // Add more items as needed...
];
