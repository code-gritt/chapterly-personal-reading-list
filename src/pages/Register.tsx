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
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

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
