import { useEffect, useState, useCallback } from "react";
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

// Composant principal Dashboard
function DashboardAdmin() {
  // États pour gérer l'interface
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
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
  const chargerStatistiques = useCallback( async (m = moisSelectionne) => {
    try {
      setChargement(true);

      // Récupération des données du personnel
      const reponsePersonnel = await fetch("http://127.0.0.1:8000/api/admin/statistics/staff");
      if (reponsePersonnel.ok) {
        const resultPersonnel = await reponsePersonnel.json();
        console.log(resultPersonnel);
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

// Fonction de déconnexion
const deconnexion = () => {
  localStorage.clear();
  navigate("/Login/staff");
};

// Fonction pour changer le mois sélectionné
const changerMois = (e) => {
  const mois = parseInt(e.target.value);
  setMoisSelectionne(mois);
  chargerStatistiques(mois);
};

return (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100">
    {/* En-tête */}
    <header className="fixed w-full top-0 z-50 bg-orange-500 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center">
            <span className="text-5xl font-bold text-white mr-2">Ω</span>
            <h1 className="text-xl md:text-3xl font-bold text-white">
              OMEGA SCHOOL
            </h1>
          </div>

          {/* Menu pour écrans moyens et grands */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={deconnexion}
              className="bg-red-500 hover:bg-red-600 rounded-lg px-6 py-2 text-white transition-colors font-medium shadow hover:shadow-md"
            >
              Déconnexion
            </button>
          </nav>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
            aria-label="Menu"
          >
            {menuMobileOuvert ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuMobileOuvert && (
        <div className="md:hidden bg-orange-400 p-4">
          <button
            onClick={deconnexion}
            className="w-full bg-red-500 hover:bg-red-600 rounded-lg px-6 py-2 text-white transition-colors font-medium"
          >
            Déconnexion
          </button>
        </div>
      )}
    </header>

    {/* Contenu principal */}
    <div className="flex flex-1 pt-24">
      <main className="flex-1 p-4 md:p-6 min-h-[calc(100vh-5rem)]">
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
                    onChange={changerMois}
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
                          <span className={`font-bold ${donneeFinance.solde >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {donneeFinance.solde !== undefined ? `${donneeFinance.solde} Dh` : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Zone cliquable pour le survol */}
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
                              width: `${donneePersonnel.data.total
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
                              width: `${donneePersonnel.data.total
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
                            {donneePersonnel.data.accoutant || 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{
                              width: `${donneePersonnel.data.total
                                ? (donneePersonnel.data.accoutant / donneePersonnel.data.total) * 100
                                : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-700">Secrétaires</span>
                          <span className="font-bold text-orange-400">
                            {donneePersonnel.data.Secretary || 0}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-400 h-2 rounded-full"
                            style={{
                              width: `${donneePersonnel.data.total
                                ? (donneePersonnel.data.Secretary / donneePersonnel.data.total) * 100
                                : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Zone cliquable pour le survol */}
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
                            width: `${donneeEleves.data.total
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
                            width: `${donneeEleves.data.total
                              ? (donneeEleves.data.female / donneeEleves.data.total) * 100
                              : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Zone cliquable pour le survol */}
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
      </main>
    </div>
  </div>
);
}

export default DashboardAdmin;