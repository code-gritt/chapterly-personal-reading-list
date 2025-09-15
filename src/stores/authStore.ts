import { create } from "zustand";
import { persist } from "zustand/middleware";
import { graphqlRequest } from "../utils/graphql";

interface User {
  id: string;
  email: string;
  username: string;
  credits: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleOAuth: (idToken: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      register: async (email, password, username) => {
        set({ loading: true, error: null });
        try {
          const query = `
            mutation Register($input: RegisterInput!) {
              register(input: $input) {
                user { id email username credits }
                token
                errors
              }
            }
          `;
          const variables = { input: { email, password, username } };
          const data = await graphqlRequest(query, variables);

          if (data.register.errors?.length) {
            set({ error: data.register.errors.join(", "), loading: false });
          } else {
            set({
              user: data.register.user,
              token: data.register.token,
              error: null,
              loading: false,
            });
          }
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const query = `
            mutation Login($input: LoginInput!) {
              login(input: $input) {
                user { id email username credits }
                token
                errors
              }
            }
          `;
          const variables = { input: { email, password } };
          const data = await graphqlRequest(query, variables);

          if (data.login.errors?.length) {
            set({ error: data.login.errors.join(", "), loading: false });
          } else {
            set({
              user: data.login.user,
              token: data.login.token,
              error: null,
              loading: false,
            });
          }
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      googleOAuth: async (idToken) => {
        set({ loading: true, error: null });
        try {
          const query = `
            mutation GoogleOAuth($input: GoogleOAuthInput!) {
              googleOAuth(input: $input) {
                user { id email username credits }
                token
                errors
              }
            }
          `;
          const variables = { input: { id_token: idToken } }; // snake_case to match backend
          const data = await graphqlRequest(query, variables);

          if (data.googleOAuth.errors?.length) {
            set({ error: data.googleOAuth.errors.join(", "), loading: false });
          } else {
            set({
              user: data.googleOAuth.user,
              token: data.googleOAuth.token,
              error: null,
              loading: false,
            });
          }
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      logout: () =>
        set({ user: null, token: null, error: null, loading: false }),
    }),
    { name: "auth-storage" },
  ),
);
