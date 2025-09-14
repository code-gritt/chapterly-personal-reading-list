import { useState } from "react";
import Logo from "../assets/images/Logo.svg";
import { navLinks } from "../utils/nav-links";
import * as Icons from "./icons";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black">
      <div className="container flex items-center justify-between py-4">
        {/* Logo + Title */}
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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-opacity-60 transition hover:text-opacity-100"
            >
              {link.title}
            </a>
          ))}
          <button className="rounded-lg bg-white px-4 py-2 font-medium text-black">
            Get for free
          </button>
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white text-opacity-80 transition hover:text-opacity-100"
              >
                {link.title}
              </a>
            ))}
            <button className="rounded-lg bg-white px-4 py-2 font-medium text-black">
              Get for free
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
