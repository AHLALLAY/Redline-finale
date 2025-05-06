import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaArrowLeft,
  FaChartLine,
  FaFileInvoiceDollar,
  FaFilter
} from "react-icons/fa";

// Liste des mois en français
const mois = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
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

function Finance() {
  // États pour gérer les données
  const [data, setData] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState({ type: "", texte: "" });
  const [moisSelectionne, setMoisSelectionne] = useState(new Date().getMonth() + 1);
  const [donneeFinance, setDonneeFinance] = useState({
    produit: { stats: { total: 0 } },
    charges: { stats: { total: 0 } },
    solde: 0
  });
  
  // État pour le filtre uniquement
  const [typeFiltre, setTypeFiltre] = useState("Tous");


  // Fonction pour afficher un message temporaire
  const afficherMessage = (type, texte) => {
    setMessage({ type, texte });
    setTimeout(() => {
      setMessage({ type: "", texte: "" });
    }, 3000);
  };

  // Récupérer les données du journal
  const chargerDonneesJournal = useCallback(async () => {
    try {
      setChargement(true);
      const reponse = await fetch("http://127.0.0.1:8000/api/accountant/journal/all");
      if (!reponse.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const resultat = await reponse.json();
      console.log(resultat.data);
      setData(resultat.data);
      afficherMessage("succes", "Données du journal récupérées avec succès");
    } catch (erreur) {
      afficherMessage("erreur", erreur.message);
    } finally {
      setChargement(false);
    }
  }, []);

  // Récupérer les statistiques
  const chargerStatistiques = useCallback(async (m = moisSelectionne) => {
    try {
      const reponse = await fetch(
        `http://127.0.0.1:8000/api/accountant/journal/statistics/${m}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      
      if (!reponse.ok) {
        throw new Error("Erreur lors de la récupération des statistiques");
      }

      const resultat = await reponse.json();
      
      setDonneeFinance({
        produit: resultat.data.produit,
        charges: resultat.data.charges,
        solde: (
          resultat.data.produit.stats.total -
          resultat.data.charges.stats.total
        ).toFixed(2)
      });
      
      afficherMessage("succes", `Statistiques financières mises à jour pour ${mois[m - 1]}`);
    } catch (erreur) {
      afficherMessage("erreur", erreur.message);
    }
  }, [moisSelectionne]);

  // Charger les données au chargement du composant
  useEffect(() => {
    chargerDonneesJournal();
    chargerStatistiques(moisSelectionne);
  }, [chargerDonneesJournal, chargerStatistiques, moisSelectionne]);

  // Filtrer les données par type uniquement
  const donneesFiltrees = data.filter(item => {
    if (typeFiltre === "Tous") {
      return true;
    } else {
      return item.type === typeFiltre;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100">
      {/* En-tête fixe */}
      <Header />

      {/* Contenu principal avec padding pour compenser le header fixe */}
      <main className="flex-1 p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800">Gestion Financière</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                className="rounded-lg text-gray-700 bg-orange-100 text-sm px-3 py-2 shadow-sm border border-orange-200"
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
          </div>

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

          {/* Statistiques financières */}
          <div className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-orange-600" />
              Statistiques pour {mois[moisSelectionne - 1]}
            </h3>

            {chargement ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Produits */}
                <div className="bg-green-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Produits</p>
                    <FaMoneyBillWave className="text-green-600 text-xl" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {donneeFinance.produit.stats.total} Dh
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${donneeFinance.produit.stats.total && donneeFinance.charges.stats.total
                          ? (donneeFinance.produit.stats.total /
                            (donneeFinance.produit.stats.total + donneeFinance.charges.stats.total)) * 100
                          : 0}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Charges */}
                <div className="bg-red-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Charges</p>
                    <FaMoneyBillWave className="text-red-600 text-xl" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    {donneeFinance.charges.stats.total} Dh
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${donneeFinance.charges.stats.total && donneeFinance.produit.stats.total
                          ? (donneeFinance.charges.stats.total /
                            (donneeFinance.produit.stats.total + donneeFinance.charges.stats.total)) * 100
                          : 0}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Solde */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Solde</p>
                    <FaMoneyBillWave className={`${donneeFinance.solde >= 0 ? "text-green-600" : "text-red-600"} text-xl`} />
                  </div>
                  <p className={`text-2xl font-bold ${donneeFinance.solde >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {donneeFinance.solde} Dh
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`${donneeFinance.solde >= 0 ? "bg-green-500" : "bg-red-500"} h-2 rounded-full`}
                      style={{
                        width: `${Math.abs(donneeFinance.solde) / 
                          (donneeFinance.produit.stats.total + donneeFinance.charges.stats.total) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Options de filtrage uniquement */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500" />
              <select
                className="rounded-lg border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={typeFiltre}
                onChange={(e) => setTypeFiltre(e.target.value)}
              >
                <option value="Tous">Tous les types</option>
                <option value="Revenu">Revenu</option>
                <option value="Dépense">Dépense</option>
              </select>
            </div>
          </div>

          {/* Tableau des opérations */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 bg-orange-50 flex items-center">
              <FaFileInvoiceDollar className="text-orange-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Journal des opérations</h3>
            </div>
            
            {chargement ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Libellé</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Référence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Ressource</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Type Ressource</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donneesFiltrees.length > 0 ? (
                      donneesFiltrees.map((item) => (
                        <tr key={item.id} className="hover:bg-orange-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {parseFloat(item.amount).toFixed(2)} Dh
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${item.type === "Revenu" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reference_number}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.entity_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.entity_type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(item.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          Aucune opération trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {!chargement && donneesFiltrees.length > 0 && (
              <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
                Affichage de {donneesFiltrees.length} opération(s) {typeFiltre !== "Tous" ? `de type ${typeFiltre}` : ""}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Finance;