import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaMoneyBillWave, FaUserTie, FaUserGraduate } from "react-icons/fa";

function DashboardAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login/staff");
  };

  const getStats = async () => {
    try {
      // Fetch staff statistics
      const staffResponse = await fetch("http://127.0.0.1:8000/api/admin/statistics/staff");
      if (!staffResponse.ok) {
        throw new Error(`Erreur personnel: ${staffResponse.status}`);
      }
      const staffResult = await staffResponse.json();
      
      // Fetch student statistics
      const studentsResponse = await fetch("http://127.0.0.1:8000/api/admin/statistics/students");
      if (!studentsResponse.ok) {
        throw new Error(`Erreur élèves: ${studentsResponse.status}`);
      }
      const studentsResult = await studentsResponse.json();
      
      // Set the state with the full response objects
      setStaffData(staffResult);
      setStudentData(studentsResult);
      
      // Debug logs
      console.log("Staff data:", staffResult);
      console.log("Student data:", studentsResult);
      
    } catch (err) {
      setError(err.message);
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  // Create dashboard menu items
  const dashboardItems = [
    { 
      title: "Finance", 
      icon: <FaMoneyBillWave className="text-green-600 text-3xl" />, 
      color: "bg-green-50",
      onClick: () => navigate("/admin/finance")
    },
    { 
      title: "Personnel", 
      icon: <FaUserTie className="text-blue-600 text-3xl" />, 
      color: "bg-blue-50",
      onClick: () => navigate("/admin/personnel")
    },
    { 
      title: "Élèves", 
      icon: <FaUserGraduate className="text-purple-600 text-3xl" />, 
      color: "bg-purple-50",
      onClick: () => navigate("/admin/eleves")
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center">
              <span className="text-5xl font-bold text-green-600 mr-2">Ω</span>
              <h1 className="text-xl md:text-3xl font-bold text-green-600">OMEGA SCHOOL</h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={handleLogout}
                className="bg-green-600 rounded-full px-6 py-2 text-white hover:bg-green-700 transition-colors font-medium"
              >
                Déconnexion
              </button>
            </nav>

            <button
              className="md:hidden text-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4">
            <button
              onClick={handleLogout}
              className="w-full bg-green-600 rounded-full px-6 py-2 text-white hover:bg-green-700 transition-colors font-medium"
            >
              Déconnexion
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="flex flex-1 pt-24">
        <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-5rem)]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>

          {/* Error display */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}

          {/* Statistics section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Statistiques</h3>
            
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Staff total statistics */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Personnel total</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {staffData?.data?.total || "Non disponible"}
                  </p>
                </div>
                
                {/* Teacher statistics */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Enseignants</p>
                  <p className="text-2xl font-bold text-green-600">
                    {staffData?.data?.teacher || "Non disponible"}
                  </p>
                </div>
                
                {/* Student statistics */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Élèves</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {studentData?.data?.total || "Non disponible"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional student statistics */}
          {!loading && studentData?.data && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Répartition des élèves</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Garçons</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {studentData?.data?.male || "Non disponible"}
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Filles</p>
                  <p className="text-2xl font-bold text-pink-600">
                    {studentData?.data?.female || "Non disponible"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard menu items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={item.onClick}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  {item.icon}
                </div>
                <p className="text-gray-600 mb-4">
                  Gérer les {item.title.toLowerCase()}
                </p>
                <button className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-800 font-medium hover:bg-gray-50">
                  Voir détails
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardAdmin;