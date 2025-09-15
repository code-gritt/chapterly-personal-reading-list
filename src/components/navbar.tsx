import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Logo from "../assets/images/Logo.svg";
import * as Icons from "./icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="bg-black">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo + Title */}
        <Link to="/">
          <div className="flex items-center">
            <img className="h-12 w-12" alt="Chapterly logo" src={Logo} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 300 50"
              className="ml-2 h-8"
            >
              <text
                x="0"
                y="35"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                fontSize="32"
                fill="white"
                letterSpacing="1"
              >
                Chapterly
              </text>
            </svg>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {user && token ? (
            <>
              <span className="text-white text-opacity-80">
                Credits: {user.credits}
              </span>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-white text-opacity-60 transition hover:text-opacity-100"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="text-white text-opacity-60 transition hover:text-opacity-100"
              >
                Logout
              </button>
              <span className="text-white text-opacity-80">
                {user.username[0].toUpperCase()}
              </span>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-white text-opacity-60 transition hover:text-opacity-100"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="rounded-lg bg-white px-4 py-2 font-medium text-black"
              >
                Get for free
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Icons.XLogo /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="flex flex-col items-center gap-4 py-6">
            {user && token ? (
              <>
                <span className="text-white text-opacity-80">
                  {user.username[0].toUpperCase()}
                </span>
                <span className="text-white text-opacity-80">
                  Credits: {user.credits}
                </span>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="text-white text-opacity-80 transition hover:text-opacity-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-white text-opacity-80 transition hover:text-opacity-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="text-white text-opacity-80 transition hover:text-opacity-100"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                  className="rounded-lg bg-white px-4 py-2 font-medium text-black"
                >
                  Get for free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
