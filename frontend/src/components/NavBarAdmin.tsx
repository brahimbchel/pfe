import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Stethoscope, Briefcase, CalendarCheck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div>
      {/* Top Navbar */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center md:px-10 shadow-lg">

        <Link to="/" className={`flex items-center space-x-2 `}>
          <h2 className="text-2xl font-bold tracking-wide">SNTF</h2>
        </Link>
        <button
          className="md:hidden bg-gray-800 p-2 rounded focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className="hidden md:flex space-x-8 text-lg">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/admin/" className={`flex items-center space-x-2 ${location.pathname === "/admin/" ? "text-blue-400" : ""}`}>
              <CalendarCheck size={20} /> <span>Rendez-Vous</span>
            </Link>
          </li>

          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/admin/medcin-list" className={`flex items-center space-x-2 ${location.pathname === "/admin/medcin-list" ? "text-blue-400" : ""}`}>
              <Stethoscope size={20} /> <span>Medcins</span>
            </Link>
          </li>

          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/admin/employers-list" className={`flex items-center space-x-2 ${location.pathname === "/admin/employers-list" ? "text-blue-400" : ""}`}>
              <Briefcase size={20} /> <span>Employers</span>
            </Link>
          </li>

        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-64"
          } md:hidden`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
        <ul className="space-y-4 mt-10 text-lg">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/admin/medcin" className={`flex items-center space-x-2 ${location.pathname === "/admin/medcin" ? "text-blue-400" : ""}`}>
              <Stethoscope size={20} /> <span>Medcins</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/admin/employers" className={`flex items-center space-x-2 ${location.pathname === "/admin/employers" ? "text-blue-400" : ""}`}>
              <Briefcase size={20} /> <span>Employers</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/admin/rendez-vous" className={`flex items-center space-x-2 ${location.pathname === "/admin/rendez-vous" ? "text-blue-400" : ""}`}>
              <CalendarCheck size={20} /> <span>Rendez-Vous</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}