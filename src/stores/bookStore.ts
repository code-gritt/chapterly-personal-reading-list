import { create } from "zustand";
import { graphqlRequest } from "../utils/graphql";

interface Book {
  id: string;
  title: string;
  author: string;
  completed: boolean;
}

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  addBook: (title: string, author: string, token: string) => Promise<void>;
  fetchBooks: (token: string) => Promise<void>;
  markBookComplete: (id: string, token: string) => Promise<void>;
  editBook: (
    id: string,
    title: string,
    author: string,
    token: string,
  ) => Promise<void>;
  deleteBook: (id: string, token: string) => Promise<void>;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  loading: false,
  error: null,
  addBook: async (title, author, token) => {
    set({ loading: true, error: null });
    try {
      const query = `
        mutation AddBook($input: AddBookInput!) {
          addBook(input: $input) {
            book { id title author completed }
            errors
          }
        }
      `;
      const variables = { input: { title, author } };
      const data = await graphqlRequest(query, variables, token);
      if (data.addBook.errors?.length) {
        set({ error: data.addBook.errors.join(", "), loading: false });
      } else {
        set((state) => ({
          books: [...state.books, data.addBook.book],
          error: null,
          loading: false,
        }));
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  fetchBooks: async (token) => {
    set({ loading: true, error: null });
    try {
      const query = `
        query {
          books {
            id
            title
            author
            completed
          }
        }
      `;
      const data = await graphqlRequest(query, {}, token);
      set({ books: data.books, error: null, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  markBookComplete: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const query = `
        mutation MarkBookComplete($input: MarkBookCompleteInput!) {
          markBookComplete(input: $input) {
            book { id title author completed }
            errors
          }
        }
      `;
      const variables = { input: { id } };
      const data = await graphqlRequest(query, variables, token);
      if (data.markBookComplete.errors?.length) {
        set({ error: data.markBookComplete.errors.join(", "), loading: false });
      } else {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? data.markBookComplete.book : book,
          ),
          error: null,
          loading: false,
        }));
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  editBook: async (id, title, author, token) => {
    set({ loading: true, error: null });
    try {
      const query = `
        mutation EditBook($input: EditBookInput!) {
          editBook(input: $input) {
            book { id title author completed }
            errors
          }
        }
      `;
      const variables = { input: { id, title, author } };
      const data = await graphqlRequest(query, variables, token);
      if (data.editBook.errors?.length) {
        set({ error: data.editBook.errors.join(", "), loading: false });
      } else {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? data.editBook.book : book,
          ),
          error: null,
          loading: false,
        }));
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  deleteBook: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const query = `
        mutation DeleteBook($input: DeleteBookInput!) {
          deleteBook(input: $input) {
            book { id title author }
            errors
          }
        }
      `;
      const variables = { input: { id } };
      const data = await graphqlRequest(query, variables, token);
      if (data.deleteBook.errors?.length) {
        set({ error: data.deleteBook.errors.join(", "), loading: false });
      } else {
        set((state) => ({
          books: state.books.filter((book) => book.id !== id),
          error: null,
          loading: false,
        }));
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
