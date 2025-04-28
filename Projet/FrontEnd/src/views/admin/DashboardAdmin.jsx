import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function DashboardAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.clear();
    navigate("/Login/staff");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3">
          {/* Menu Desktop */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="inline-flex items-center">
              <span className="hidden md:flex text-5xl font-bold text-green-600 mr-2">
                Ω
              </span>
              <h1 className="hidden md:flex text-3xl font-bold text-green-600">
                OMEGA SCHOOL
              </h1>
              <div className="inline-flex items-center md:hidden">
                <span className="text-5xl font-bold text-green-600 mr-2">
                  Ω
                </span>
                <h1 className="text-xl font-bold text-green-600">
                  OMEGA SCHOOL
                </h1>
              </div>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={handelLogout}
                className="bg-green-600 rounded-full px-4 py-2 text-white hover:bg-green-700 transition-colors"
              >
                Déconnexion
              </button>
            </nav>

            {/* Bouton Mobile */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <nav className="flex flex-col space-y-3 p-4">
              <button
                className="w-full text-left py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-md font-medium"
                onClick={() => {
                  handelLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Déconnexion
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex flex-1 pt-20"> {/* pt-20 pour compenser le header fixe */}
        {/* Sidebar */}
        <aside className="w-64 fixed h-[calc(100vh-5rem)] bg-white shadow-md p-4 overflow-y-auto">
          <nav className="space-y-2">
            <a
              href="#"
              className="w-full px-4 py-3 text-left rounded-md text-white flex items-center gap-3 bg-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Tableau de bord
            </a>
            <a
              href="#"
              className="w-full px-4 py-3 text-left rounded-md hover:bg-blue-100 text-gray-700 flex items-center gap-3 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Activité
            </a>
            <a
              href="#"
              className="w-full px-4 py-3 text-left rounded-md hover:bg-blue-100 text-gray-700 flex items-center gap-3 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                  clipRule="evenodd"
                />
              </svg>
              Notes des Élèves
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-64 p-6 bg-gray-50 min-h-[calc(100vh-5rem)]">
          {/* Votre contenu principal ici */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenue sur le tableau de bord</h2>
            <p className="text-gray-600">Contenu principal de votre application...</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardAdmin;