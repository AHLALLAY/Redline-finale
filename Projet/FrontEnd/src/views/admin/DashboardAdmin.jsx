import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaMoneyBillWave,
  FaUserTie,
  FaUserGraduate,
  FaMale,
  FaFemale,
} from "react-icons/fa";

function DashboardAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [financeData, setFinanceData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoverItem, setHoverItem] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login/staff");
  };

  const getStats = async () => {
    try {
      // Fetch staff statistics
      const staffResponse = await fetch(
        "http://127.0.0.1:8000/api/admin/statistics/staff"
      );
      if (staffResponse.ok) {
        const staffResult = await staffResponse.json();
        setStaffData(staffResult);
      }

      const studentsResponse = await fetch(
        "http://127.0.0.1:8000/api/admin/statistics/students"
      );
      if (studentsResponse.ok) {
        const studentsResult = await studentsResponse.json();
        setStudentData(studentsResult);
      }
      const financeResponse = await fetch(
        "http://127.0.0.1:8000/api/accountant/journal/statistics/4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (financeResponse.ok) {
        const financeResult = await financeResponse.json();

        setFinanceData(parseInt(financeResult.data.produit.stats.total - financeResult.data.charges.stats.total));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const dashboardItems = [
    {
      id: "finance",
      title: "Finance",
      icon: <FaMoneyBillWave className="text-green-600 text-3xl" />,
      color: "bg-green-50",
      onClick: () => navigate("/admin/finance"),
    },
    {
      id: "personnel",
      title: "Personnel",
      icon: <FaUserTie className="text-blue-600 text-3xl" />,
      color: "bg-blue-50",
      onClick: () => navigate("/admin/staff"),
    },
    {
      id: "eleves",
      title: "Élèves",
      icon: <FaUserGraduate className="text-purple-600 text-3xl" />,
      color: "bg-purple-50",
      onClick: () => navigate("/admin/student"),
      hasHoverStats: true,
    },
  ];

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juiller",
    "Aoute",
    "September",
    "October",
    "Nouvember",
    "December",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center">
              <span className="text-5xl font-bold text-green-600 mr-2">Ω</span>
              <h1 className="text-xl md:text-3xl font-bold text-green-600">
                OMEGA SCHOOL
              </h1>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tableau de bord
          </h2>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}

          {/* Statistics section */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Effectif</h3>

            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {/* Finance statistics */}
                <div
                  className="bg-green-50 p-4 rounded-lg"
                  onMouseEnter={() => setHoverItem("finance")}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Finance</p>
                    <select name="" id="" className="rounded text-gray-600 focus-ring:none border-none bg-green-50">
                      <option value="default">month</option>
                      {months.map((m) => {
                        <option value={m.key}>{m.value}</option>;
                      })}
                    </select>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {financeData || "Non disponible"}
                  </p>

                  {/* Hover stats popup fro finance */}
                  {hoverItem == "finance" && financeData?.data && (
                    <div>this is a hover</div>
                  )}
                </div>

                {/* Staff total statistics */}
                <div
                  className="bg-blue-50 p-4 rounded-lg relative"
                  onMouseEnter={() => setHoverItem("personnel")}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <p className="text-sm text-gray-600">Personnel total</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {staffData?.data?.total || "Non disponible"}
                  </p>

                  {/* Hover stats popup for staff */}
                  {hoverItem === "personnel" && staffData?.data && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-200">
                      <h4 className="text-lg font-bold text-blue-600 mb-3">
                        Répartition du personnel
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">
                              Administrateurs
                            </span>
                            <span className="font-bold">
                              {staffData.data.admin || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-700 h-2 rounded-full"
                              style={{
                                width: `${
                                  staffData.data.total
                                    ? (staffData.data.admin /
                                        staffData.data.total) *
                                      100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Enseignants</span>
                            <span className="font-bold">
                              {staffData.data.teacher || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  staffData.data.total
                                    ? (staffData.data.teacher /
                                        staffData.data.total) *
                                      100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Comptables</span>
                            <span className="font-bold">
                              {staffData.data.accoutant || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${
                                  staffData.data.total
                                    ? (staffData.data.accoutant /
                                        staffData.data.total) *
                                      100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Secrétaires</span>
                            <span className="font-bold">
                              {staffData.data.Secretary || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-400 h-2 rounded-full"
                              style={{
                                width: `${
                                  staffData.data.total
                                    ? (staffData.data.Secretary /
                                        staffData.data.total) *
                                      100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Student statistics with hover */}
                <div
                  className="bg-purple-50 p-4 rounded-lg relative"
                  onMouseEnter={() => setHoverItem("eleves")}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <p className="text-sm text-gray-600">Élèves</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {studentData?.data?.total || "Non disponible"}
                  </p>

                  {/* Hover stats popup for students */}
                  {hoverItem === "eleves" && studentData?.data && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-200">
                      <h4 className="text-lg font-bold text-purple-600 mb-3">
                        Répartition des élèves
                      </h4>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center text-blue-600">
                            <FaMale className="mr-2" /> Garçons
                          </span>
                          <span className="font-bold">
                            {studentData.data.male || 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                studentData.data.total
                                  ? (studentData.data.male /
                                      studentData.data.total) *
                                    100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center text-pink-600">
                            <FaFemale className="mr-2" /> Filles
                          </span>
                          <span className="font-bold">
                            {studentData.data.female || 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-700 h-2 rounded-full"
                            style={{
                              width: `${
                                studentData.data.total
                                  ? (studentData.data.female /
                                      studentData.data.total) *
                                    100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dashboard menu items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardItems.map((item) => (
              <div
                key={item.id}
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