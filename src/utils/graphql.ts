import axios from "axios";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://chapterly-backend.onrender.com/graphql";

export const graphqlRequest = async (
  query: string,
  variables: any = {},
  token?: string,
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.post(
      backendUrl,
      { query, variables },
      { headers },
    );
    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((e: any) => e.message).join(", "),
      );
    }
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.message || "API request failed");
  }
};
