export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const featuresList: Feature[] = [
  {
    id: "1",
    title: "Personal Reading List",
    description:
      "Add and organize books with titles, authors, and notes. Mark them as “to-read” or “completed” to stay on track.",
  },
  {
    id: "2",
    title: "Progress Dashboard",
    description:
      "Get a clear summary of your reading journey, including total books, completed titles, and what’s next on your list.",
  },
  {
    id: "3",
    title: "Credits System",
    description:
      "Start with 100 free credits. Use them to add books, generate summaries, and purchase more credits as you grow.",
  },
];
