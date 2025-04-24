import { Link } from "react-router";

export default function MedNavbar() {

  return (
    <div>
      {/* Top Navbar */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center md:px-10 shadow-lg">
        <Link to="/medcin" className={`flex items-center space-x-2 `}>
          <h2 className="text-2xl font-bold tracking-wide">SNTF - Medcin</h2>
        </Link>
      </nav>

    </div>
  );
}