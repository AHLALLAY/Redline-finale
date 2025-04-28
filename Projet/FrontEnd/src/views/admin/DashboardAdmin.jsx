import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaMoneyBillWave, FaUserTie, FaUserGraduate } from "react-icons/fa";

function DashboardAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login/staff");
  };

  const dashboardItems = [
    { title: "Finance", icon: <FaMoneyBillWave className="text-green-600 text-3xl" />, color: "bg-green-50" },
    { title: "Personnel", icon: <FaUserTie className="text-blue-600 text-3xl" />, color: "bg-blue-50" },
    { title: "Élèves", icon: <FaUserGraduate className="text-purple-600 text-3xl" />, color: "bg-purple-50" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
                onClick={handleLogout}
                className="bg-green-600 rounded-full px-6 py-2 text-white hover:bg-green-700 transition-colors font-medium flex items-center"
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
                  handleLogout();
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
      <div className="flex flex-1 pt-24">
        {/* Main Content Area*/}
        <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-5rem)]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord administrateur</h2>
          
          {/* Quick Stats Section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Statistiques rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Enseignants</p>
                <p className="text-2xl font-bold text-blue-600">24</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Élèves actifs</p>
                <p className="text-2xl font-bold text-purple-600">320</p>
              </div>
            </div>
          </div>
          
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <div key={index} className={`${item.color} rounded-lg shadow-md overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:scale-105`}>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                    {item.icon}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Gérer les données {item.title.toLowerCase()}
                  </p>
                  <button className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-800 font-medium hover:bg-gray-50 transition-colors flex justify-center items-center shadow-sm">
                    Voir les détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardAdmin;