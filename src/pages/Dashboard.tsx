import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { user, token } = useAuthStore();
  const { user: userData, fetchMe, loading, error } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    } else {
      fetchMe(token);
    }
  }, [user, token, navigate, fetchMe]);

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <Loader isLoading={loading} />
      <div className="container mx-auto">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Welcome to Your Dashboard
        </h2>
        {error && <p className="mb-4 text-center text-red-400">{error}</p>}
        {userData && (
          <div className="mx-auto max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-md">
            <p className="text-lg text-white">Username: {userData.username}</p>
            <p className="text-lg text-white">Credits: {userData.credits}</p>
          </div>
        )}
      </div>
    </div>
  );
}
