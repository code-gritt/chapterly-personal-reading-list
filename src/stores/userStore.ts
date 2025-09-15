import { create } from "zustand";
import { graphqlRequest } from "../utils/graphql";

interface UserState {
  user: { id: string; email: string; username: string; credits: number } | null;
  loading: boolean;
  error: string | null;
  fetchMe: (token: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchMe: async (token) => {
    set({ loading: true, error: null });
    try {
      const query = `
        query {
          me {
            id
            email
            username
            credits
          }
        }
      `;
      const data = await graphqlRequest(query, {}, token);
      set({ user: data.me, error: null, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
