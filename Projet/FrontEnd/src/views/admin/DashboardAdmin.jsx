import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaUserTie,
  FaUserGraduate,
  FaMale,
  FaFemale,
  FaPlus,
  FaTimes
} from "react-icons/fa";

// Constantes
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const DASHBOARD_MENU = [
  {
    id: "finance",
    title: "Finance",
    icon: <FaMoneyBillWave className="text-orange-600 text-3xl" />,
    color: "bg-orange-50 hover:bg-orange-100",
    path: "/admin/finance",
    description: "Gérer les finances",
  },
  {
    id: "personnel",
    title: "Personnel",
    icon: <FaUserTie className="text-orange-600 text-3xl" />,
    color: "bg-orange-50 hover:bg-orange-100",
    path: "/admin/staff",
    description: "Gérer le personnel",
  },
  {
    id: "eleves",
    title: "Élèves",
    icon: <FaUserGraduate className="text-orange-600 text-3xl" />,
    color: "bg-orange-50 hover:bg-orange-100",
    path: "/admin/students",
    description: "Gérer les élèves",
  },
];

// Header
function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'))


  const handleBack = () => navigate('/admin/dashboard');
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login/staff');
  };

  return (
    <header className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white fixed top-0 left-0 right-0 z-50 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={handleBack} className="flex items-center space-x-2 focus:outline-none">
              <span className="text-2xl font-bold text-orange-900">Ω</span>
              <span className="text-xl font-bold hidden sm:inline-block">MEGA SCHOOL</span>
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-sm md:text-base text-orange-100">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-orange-200">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg text-sm font-semibold transition-colors duration-200 shadow hover:shadow-md"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Composant StatsCard
function StatsCard({ title, value, icon, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-orange-50 p-4 md:p-6 rounded-lg shadow-sm hover:shadow transition-all relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center w-full mb-2">
        <p className="text-sm font-medium text-gray-700">{title}</p>
      </div>
      <div className="flex items-center">
        {icon}
        <p className="text-2xl font-bold text-orange-600 ml-3">{value || "N/A"}</p>
      </div>

      {isHovered && children && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 border border-orange-200">
          {children}
        </div>
      )}
    </div>
  );
}

// Composant FinanceStats
function FinanceStats({ data, month, onMonthChange }) {
  return (
    <StatsCard
      title="Finance"
      value={data?.solde !== undefined ? `${data.solde} Dh` : "N/A"}
      icon={<FaMoneyBillWave className="text-orange-600 text-2xl" />}
    >
      <h4 className="text-lg font-bold text-orange-600 mb-3">Détails Financiers - {MONTHS[month - 1]}</h4>

      {/* Month selector */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sélectionner un mois:
        </label>
        <select
          value={month}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {MONTHS.map((monthName, index) => (
            <option key={index} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-green-600 font-medium">Produits</span>
            <span className="font-bold text-green-600">
              {data.produit?.stats?.total !== undefined ? `${data.produit.stats.total} Dh` : "N/A"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${data.produit?.stats?.total && data.charges?.stats?.total
                  ? (data.produit.stats.total / (data.produit.stats.total + data.charges.stats.total)) * 100
                  : 0}%`
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-red-600 font-medium">Charges</span>
            <span className="font-bold text-red-600">
              {data.charges?.stats?.total !== undefined ? `${data.charges.stats.total} Dh` : "N/A"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{
                width: `${data.charges?.stats?.total && data.produit?.stats?.total
                  ? (data.charges.stats.total / (data.produit.stats.total + data.charges.stats.total)) * 100
                  : 0}%`
              }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Solde</span>
            <span className={`font-bold ${data.solde >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.solde !== undefined ? `${data.solde} Dh` : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </StatsCard>
  );
}

// Composant PersonnelStats
function PersonnelStats({ data }) {
  const staffData = [
    { label: "Administrateurs", value: data?.admin || 0, color: "bg-orange-700" },
    { label: "Enseignants", value: data?.teacher || 0, color: "bg-orange-600" },
    { label: "Comptables", value: data?.accountant || 0, color: "bg-orange-500" },
    { label: "Secrétaires", value: data?.secretary || 0, color: "bg-orange-400" }
  ];

  return (
    <StatsCard
      title="Personnel"
      value={data?.total || "N/A"}
      icon={<FaUserTie className="text-orange-600 text-2xl" />}
    >
      <h4 className="text-lg font-bold text-orange-600 mb-3">Répartition du personnel</h4>
      <div className="space-y-3">
        {staffData.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-700">{item.label}</span>
              <span className="font-bold text-orange-700">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full`}
                style={{
                  width: `${data?.total > 0 ? (item.value / data.total) * 100 : 0}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </StatsCard>
  );
}

// Composant StudentsStats
function StudentsStats({ data }) {
  return (
    <StatsCard
      title="Élèves"
      value={data?.total || "N/A"}
      icon={<FaUserGraduate className="text-orange-600 text-2xl" />}
    >
      <h4 className="text-lg font-bold text-orange-600 mb-3">Répartition des élèves</h4>
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center text-blue-600">
              <FaMale className="mr-2" /> Garçons
            </span>
            <span className="font-bold text-blue-600">{data?.male || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${data?.total > 0 ? (data.male / data.total) * 100 : 0}%`
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center text-pink-600">
              <FaFemale className="mr-2" /> Filles
            </span>
            <span className="font-bold text-pink-600">{data?.female || 0}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-500 h-2 rounded-full"
              style={{
                width: `${data?.total > 0 ? (data.female / data.total) * 100 : 0}%`
              }}
            />
          </div>
        </div>
      </div>
    </StatsCard>
  );
}

// Composant AddOffer
function AddOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    contrat_type: "default"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Récupération de l'ID utilisateur
      const admin = JSON.parse(localStorage.getItem('user'));

      // Préparation des données pour l'API
      const userData = {
        ...form,
        is_active: true,
        created_by: admin.id // Utiliser directement l'ID utilisateur
      };

      console.log("Données envoyées:", userData); // Pour déboguer

      const response = await fetch("http://127.0.0.1:8000/api/admin/offer/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert("Offre ajoutée avec succès!");
        setIsOpen(false);
        setForm({
          title: "",
          description: "",
          contrat_type: "default"
        });
      } else {
        // Afficher plus de détails sur l'erreur
        const errorData = await response.json();
        console.error("Erreur détaillée:", errorData);
        throw new Error(`Erreur lors de l'ajout de l'offre: ${response.status}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
      >
        <FaPlus /> <span>Ajouter une offre</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold text-gray-800">Nouvelle Offre</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de contrat*
                </label>
                <select
                  id="type"
                  name="contrat_type"
                  value={form.contrat_type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="default">Choisir...</option>
                  <option value="Stage">Stage</option>
                  <option value="CDD">CDD</option>
                  <option value="CDI">CDI</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant principal DashboardAdmin
function DashboardAdmin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [staffData, setStaffData] = useState(null);
  const [studentsData, setStudentsData] = useState(null);
  const [financeData, setFinanceData] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const fetchData = useCallback(async (month = selectedMonth) => {
    try {
      setIsLoading(true);

      // Fetch staff data
      const staffResponse = await fetch("http://127.0.0.1:8000/api/admin/statistics/staff");
      if (staffResponse.ok) {
        setStaffData((await staffResponse.json()).data);
      }

      // Fetch students data
      const studentsResponse = await fetch("http://127.0.0.1:8000/api/admin/statistics/students");
      if (studentsResponse.ok) {
        setStudentsData((await studentsResponse.json()).data);
      }

      // Fetch finance data
      const financeResponse = await fetch(
        `http://127.0.0.1:8000/api/accountant/journal/statistics/${month}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );

      if (financeResponse.ok) {
        const result = await financeResponse.json();
        setFinanceData({
          produit: result.data.produit,
          charges: result.data.charges,
          solde: (result.data.produit.stats.total - result.data.charges.stats.total).toFixed(2)
        });
        showMessage("success", `Données financières mises à jour pour ${MONTHS[month - 1]}`);
      }
    } catch (error) {
      showMessage("error", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    fetchData(month);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100">
      <Header />

      <main className="flex-1 p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
            <AddOffer />
          </div>

          {/* Messages */}
          {message.type === "error" && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow">
              <p>{message.text}</p>
            </div>
          )}

          {message.type === "success" && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow">
              <p>{message.text}</p>
            </div>
          )}

          {/* Statistiques */}
          <div className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Statistiques Rapides</h3>

            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <FinanceStats
                  data={financeData}
                  month={selectedMonth}
                  onMonthChange={handleMonthChange}
                />
                <PersonnelStats data={staffData} />
                <StudentsStats data={studentsData} />
              </div>
            )}
          </div>

          {/* Menu du tableau de bord */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {DASHBOARD_MENU.map((item) => (
              <div
                key={item.id}
                className={`${item.color} rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer`}
                onClick={() => navigate(item.path)}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  {item.icon}
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 font-medium transition-colors shadow hover:shadow-md">
                  Voir détails
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardAdmin;