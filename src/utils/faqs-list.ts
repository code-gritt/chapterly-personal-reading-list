export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsList: FaqItem[] = [
  {
    id: "1",
    question: "How do credits work in Chapterly?",
    answer:
      "Every new user starts with 100 free credits. Adding a book costs 5 credits, and generating a reading summary costs 10 credits. You can purchase more credits anytime via PayPal.",
  },
  {
    id: "2",
    question: "What payment methods are available?",
    answer:
      "Currently, Chapterly supports PayPal for purchasing additional credits. More payment options will be added in future updates.",
  },
  {
    id: "3",
    question: "Can I use Chapterly on mobile devices?",
    answer:
      "Yes! Chapterly is fully responsive and works seamlessly on desktops, tablets, and smartphones so you can manage your reading list anywhere.",
  },
  {
    id: "4",
    question: "What kind of books can I add?",
    answer:
      "You can add any book you like by entering the title, author, and optional notes. Chapterly is designed to be flexible for all types of readers—fiction, non-fiction, or academic.",
  },
  {
    id: "5",
    question: "Do my credits or books expire?",
    answer:
      "No, your credits and saved books do not expire. You can return anytime and continue from where you left off.",
  },
];
