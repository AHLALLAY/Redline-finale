import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaUserTie,
  FaUserGraduate,
  FaMale,
  FaFemale,
} from "react-icons/fa";

// Liste des mois en français
const mois = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// Options du menu principal
const menu_dashboard = [
  {
    id: "finance",
    titre: "Finance",
    icone: <FaMoneyBillWave className="text-orange-600 text-3xl" />,
    couleur: "bg-orange-50 hover:bg-orange-100",
    chemin: "/admin/finance",
    description: "Gérer les finances",
  },
  {
    id: "personnel",
    titre: "Personnel",
    icone: <FaUserTie className="text-orange-600 text-3xl" />,
    couleur: "bg-orange-50 hover:bg-orange-100",
    chemin: "/admin/staff",
    description: "Gérer le personnel",
  },
  {
    id: "eleves",
    titre: "Élèves",
    icone: <FaUserGraduate className="text-orange-600 text-3xl" />,
    couleur: "bg-orange-50 hover:bg-orange-100",
    chemin: "/admin/students",
    description: "Gérer les élèves",
  },
];

// Header
function Header() {
  const navigate = useNavigate();

  const back = () => navigate('/admin/dashboard');
  
  const logout = () => {
    localStorage.clear();
    navigate('/login/staff');
  }

  const role = localStorage.getItem('role') || 'Administrateur';
  const username = localStorage.getItem('username') || 'Utilisateur';

  return (
    <header className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white fixed top-0 left-0 right-0 z-50 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={back}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="text-2xl font-bold text-orange-900">Ω</span>
              <span className="text-xl font-bold hidden sm:inline-block">MEGA SCHOOL</span>
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-sm md:text-base text-orange-100">
              <p className="font-medium">{username}</p>
              <p className="text-xs text-orange-200">{role}</p>
            </div>
            
            <button
              onClick={logout}
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

// Dashboard
function DashboardAdmin() {
  // États pour gérer l'interface
  const [elementSurvole, setElementSurvole] = useState(null);
  const [message, setMessage] = useState({ type: "", texte: "" });
  const [chargement, setChargement] = useState(true);

  // États pour les données
  const [donneePersonnel, setDonneePersonnel] = useState(null);
  const [donneeEleves, setDonneeEleves] = useState(null);
  const [donneeFinance, setDonneeFinance] = useState(null);
  const [moisSelectionne, setMoisSelectionne] = useState(new Date().getMonth() + 1);

  const navigate = useNavigate();

  // Fonction pour afficher un message temporaire
  const afficherMessage = (type, texte) => {
    setMessage({ type, texte });
    setTimeout(() => {
      setMessage({ type: "", texte: "" });
    }, 3000);
  };

  // Fonction pour récupérer les statistiques
  const chargerStatistiques = useCallback(async (m = moisSelectionne) => {
    try {
      setChargement(true);

      // Récupération des données du personnel
      const reponsePersonnel = await fetch("http://127.0.0.1:8000/api/admin/statistics/staff");
      if (reponsePersonnel.ok) {
        const resultPersonnel = await reponsePersonnel.json();
        setDonneePersonnel(resultPersonnel);
      }

      // Récupération des données des élèves
      const reponseEleves = await fetch("http://127.0.0.1:8000/api/admin/statistics/students");
      if (reponseEleves.ok) {
        const resultEleves = await reponseEleves.json();
        setDonneeEleves(resultEleves);
      }

      // Récupération des données financières
      const reponseFinance = await fetch(
        `http://127.0.0.1:8000/api/accountant/journal/statistics/${m}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (reponseFinance.ok) {
        const resultFinance = await reponseFinance.json();
        setDonneeFinance({
          produit: resultFinance.data.produit,
          charges: resultFinance.data.charges,
          solde: (
            resultFinance.data.produit.stats.total -
            resultFinance.data.charges.stats.total
          ).toFixed(2)
        });
        afficherMessage("succes", `Données financières mises à jour pour ${mois[m - 1]}`);
      }
    } catch (erreur) {
      afficherMessage("erreur", erreur.message);
    } finally {
      setChargement(false);
    }
  }, [moisSelectionne]);

  // Charger les données au chargement du composant
  useEffect(() => {
    chargerStatistiques();
  }, [chargerStatistiques]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100">
      {/* En-tête fixe */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1 p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tableau de bord
          </h2>

          {/* Affichage des messages */}
          {message.type === "erreur" && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow">
              <p>{message.texte}</p>
            </div>
          )}

          {message.type === "succes" && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow">
              <p>{message.texte}</p>
            </div>
          )}

          {/* Section des statistiques */}
          <div className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Statistiques Rapides</h3>

            {chargement ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative">
                {/* Statistiques financières */}
                <div className="bg-orange-50 p-4 md:p-6 rounded-lg shadow-sm hover:shadow transition-all relative">
                  <div className="flex justify-between items-center w-full mb-2">
                    <p className="text-sm font-medium text-gray-700">Finance</p>
                    <select
                      className="z-50 rounded text-gray-600 bg-orange-100 text-sm"
                      value={moisSelectionne}
                      onChange={(e) => {
                        const mois = parseInt(e.target.value);
                        setMoisSelectionne(mois);
                        chargerStatistiques(mois);
                      }}
                    >
                      {mois.map((mois, index) => (
                        <option key={index} value={index + 1}>{mois}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-orange-600 text-2xl mr-3" />
                    <p className="text-2xl font-bold text-orange-600">
                      {donneeFinance?.solde !== undefined ? `${donneeFinance.solde} Dh` : "N/A"}
                    </p>
                  </div>

                  {/* Détails financiers (visible au survol) */}
                  {elementSurvole === "finance" && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 border border-orange-200">
                      <h4 className="text-lg font-bold text-orange-600 mb-3">
                        Détails Financiers - {mois[moisSelectionne - 1]}
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-green-600 font-medium">Produits</span>
                            <span className="font-bold text-green-600">
                              {donneeFinance.produit?.stats?.total !== undefined
                                ? `${donneeFinance.produit.stats.total} Dh`
                                : "N/A"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${donneeFinance.produit?.stats?.total && donneeFinance.charges?.stats?.total
                                  ? (donneeFinance.produit.stats.total /
                                    (donneeFinance.produit.stats.total + donneeFinance.charges.stats.total)) * 100
                                  : 0}%`
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-red-600 font-medium">Charges</span>
                            <span className="font-bold text-red-600">
                              {donneeFinance.charges?.stats?.total !== undefined
                                ? `${donneeFinance.charges.stats.total} Dh`
                                : "N/A"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{
                                width: `${donneeFinance.charges?.stats?.total && donneeFinance.produit?.stats?.total
                                  ? (donneeFinance.charges.stats.total /
                                    (donneeFinance.produit.stats.total + donneeFinance.charges.stats.total)) * 100
                                  : 0}%`
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium">Solde</span>
                            <span className={`font-bold ${donneeFinance.solde >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {donneeFinance.solde !== undefined ? `${donneeFinance.solde} Dh` : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Zone de survol */}
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onMouseEnter={() => setElementSurvole("finance")}
                    onMouseLeave={() => setElementSurvole(null)}
                  />
                </div>

                {/* Statistiques du personnel */}
                <div className="bg-orange-50 p-4 md:p-6 rounded-lg shadow-sm hover:shadow transition-all relative">
                  <p className="text-sm font-medium text-gray-700 mb-2">Personnel</p>
                  <div className="flex items-center">
                    <FaUserTie className="text-orange-600 text-2xl mr-3" />
                    <p className="text-2xl font-bold text-orange-600">
                      {donneePersonnel?.data?.total || "N/A"}
                    </p>
                  </div>

                  {/* Détails personnel (visible au survol) */}
                  {elementSurvole === "personnel" && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 border border-orange-200">
                      <h4 className="text-lg font-bold text-orange-600 mb-3">
                        Répartition du personnel
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Administrateurs</span>
                            <span className="font-bold text-orange-700">
                              {donneePersonnel.data.admin || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-700 h-2 rounded-full"
                              style={{
                                width: `${donneePersonnel.data.total > 0
                                  ? (donneePersonnel.data.admin / donneePersonnel.data.total) * 100
                                  : 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Enseignants</span>
                            <span className="font-bold text-orange-600">
                              {donneePersonnel.data.teacher || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{
                                width: `${donneePersonnel.data.total > 0
                                  ? (donneePersonnel.data.teacher / donneePersonnel.data.total) * 100
                                  : 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Comptables</span>
                            <span className="font-bold text-orange-500">
                              {donneePersonnel.data.accountant || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{
                                width: `${donneePersonnel.data.total > 0 && donneePersonnel.data.accountant > 0
                                  ? (donneePersonnel.data.accountant / donneePersonnel.data.total) * 100
                                  : 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Secrétaires</span>
                            <span className="font-bold text-orange-400">
                              {donneePersonnel.data.secretary || 0}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-400 h-2 rounded-full"
                              style={{
                                width: `${donneePersonnel.data.total > 0 && donneePersonnel.data.secretary > 0
                                  ? (donneePersonnel.data.secretary / donneePersonnel.data.total) * 100
                                  : 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Zone de survol */}
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onMouseEnter={() => setElementSurvole("personnel")}
                    onMouseLeave={() => setElementSurvole(null)}
                  />
                </div>

                {/* Statistiques des élèves */}
                <div className="bg-orange-50 p-4 md:p-6 rounded-lg shadow-sm hover:shadow transition-all relative">
                  <p className="text-sm font-medium text-gray-700 mb-2">Élèves</p>
                  <div className="flex items-center">
                    <FaUserGraduate className="text-orange-600 text-2xl mr-3" />
                    <p className="text-2xl font-bold text-orange-600">
                      {donneeEleves?.data?.total || "N/A"}
                    </p>
                  </div>

                  {/* Détails élèves (visible au survol) */}
                  {elementSurvole === "eleves" && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 border border-orange-200">
                      <h4 className="text-lg font-bold text-orange-600 mb-3">
                        Répartition des élèves
                      </h4>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center text-blue-600">
                            <FaMale className="mr-2" /> Garçons
                          </span>
                          <span className="font-bold text-blue-600">
                            {donneeEleves.data.male || 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${donneeEleves.data.total > 0
                                ? (donneeEleves.data.male / donneeEleves.data.total) * 100
                                : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center text-pink-600">
                            <FaFemale className="mr-2" /> Filles
                          </span>
                          <span className="font-bold text-pink-600">
                            {donneeEleves.data.female || 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-500 h-2 rounded-full"
                            style={{
                              width: `${donneeEleves.data.total > 0
                                ? (donneeEleves.data.female / donneeEleves.data.total) * 100
                                : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Zone de survol */}
                  <div
                    className="absolute inset-0 cursor-pointer"
                    onMouseEnter={() => setElementSurvole("eleves")}
                    onMouseLeave={() => setElementSurvole(null)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Menu du tableau de bord */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {menu_dashboard.map((item) => (
              <div
                key={item.id}
                className={`${item.couleur} rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer`}
                onClick={() => navigate(item.chemin)}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{item.titre}</h3>
                  {item.icone}
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