import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Loader from "../components/Loader";

declare global {
  interface Window {
    google: any;
  }
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, googleOAuth, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleRegister = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "548839657777-ikmkge4he6kdmjrnf6rotd53doi5r9kr.apps.googleusercontent.com",
        callback: async (response: any) => {
          await googleOAuth(response.credential);
          if (!error) navigate("/dashboard");
        },
      });
      window.google.accounts.id.prompt();
    }
  };

  const handleRegister = async () => {
    await register(email, password, username);
    if (!error) navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
      <Loader isLoading={loading} />
      <div className="w-full max-w-md rounded-lg bg-white/10 p-8 backdrop-blur-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Join Chapterly
        </h2>
        {error && <p className="mb-4 text-center text-red-400">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded-lg border border-white/20 bg-black/50 p-3 text-white focus:border-[#9560EB] focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-white/20 bg-black/50 p-3 text-white focus:border-[#9560EB] focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border border-white/20 bg-black/50 p-3 text-white focus:border-[#9560EB] focus:outline-none"
        />
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-lg bg-[#9560EB] p-3 font-medium text-white hover:bg-[#6B46C1] disabled:opacity-50"
        >
          Register
        </button>
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-black hover:bg-gray-100 disabled:opacity-50"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="h-5 w-5"
          />
          Continue with Google
        </button>
        <p className="mt-4 text-center text-white/70">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#9560EB] hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
