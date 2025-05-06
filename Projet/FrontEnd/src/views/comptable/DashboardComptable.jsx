import { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaPlus, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const mois = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function DashboardComptable() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Comptable';

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'Dépense',
    reference_number: '',
    entity_name: '',
    entity_type: 'Fournisseur'
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login/staff');
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/accountant/journal/all");
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.data);
      }
    } catch (error) {
      setMessage("Erreur lors du chargement des transactions : "+error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accountant/journal/new", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept":"application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage("Transaction ajoutée avec succès");
        setShowModal(false);
        fetchTransactions();
        setFormData({
          description: '',
          amount: '',
          type: 'Dépense',
          reference_number: '',
          entity_name: '',
          entity_type: 'Fournisseur'
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Filtrer les transactions par mois
  const filteredTransactions = transactions.filter(transaction => {
    if (!selectedMonth) return true;
    const transactionDate = new Date(transaction.created_at);
    return transactionDate.getMonth() + 1 === selectedMonth;
  });

  // Calculer les totaux
  const totalRevenus = filteredTransactions
    .filter(t => t.type === 'Revenu')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalDepenses = filteredTransactions
    .filter(t => t.type === 'Dépense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const solde = totalRevenus - totalDepenses;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <header className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white fixed top-0 left-0 right-0 z-50 shadow-lg h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-orange-900">Ω</span>
            <span className="text-xl font-bold">MEGA SCHOOL</span>
          </div>
          <div className="flex items-center space-x-6">
            <div>
              <p className="font-medium">{username}</p>
              <p className="text-xs text-orange-200">Comptable</p>
            </div>
            <button onClick={handleLogout} className="bg-white text-orange-600 px-3 py-1 rounded-lg flex items-center space-x-2">
              <FaSignOutAlt />
              <span className="font-bold">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <select
              className="px-4 py-2 border rounded bg-white"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              <option value="">Tous les mois</option>
              {mois.map((mois, index) => (
                <option key={index} value={index + 1}>{mois}</option>
              ))}
            </select>

            <button onClick={() => setShowModal(true)} className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <FaPlus />
              <span>Ajouter une transaction</span>
            </button>
          </div>

          {message && (
            <div className={`p-4 mb-6 rounded-lg ${message.includes("succès") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              <p>{message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border bg-orange-50 p-6 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Total Revenus</p>
              <div className="flex items-center">
                <FaMoneyBillWave className="text-orange-600 text-2xl mr-3" />
                <p className="text-2xl font-bold text-orange-600">{totalRevenus.toFixed(2)} Dh</p>
              </div>
            </div>

            <div className="border bg-orange-50 p-6 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Total Dépenses</p>
              <div className="flex items-center">
                <FaMoneyBillWave className="text-orange-600 text-2xl mr-3" />
                <p className="text-2xl font-bold text-orange-600">{totalDepenses.toFixed(2)} Dh</p>
              </div>
            </div>

            <div className="border bg-orange-50 p-6 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Solde</p>
              <div className="flex items-center">
                <FaMoneyBillWave className="text-orange-600 text-2xl mr-3" />
                <p className="text-2xl font-bold text-orange-600">{solde.toFixed(2)} Dh</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-orange-800 mb-6">Journal Comptable</h2>
          
          <div className="bg-white p-4 rounded shadow">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Référence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entité</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount} Dh</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'Revenu' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.reference_number}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.entity_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          Aucune transaction trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-800">Ajouter une transaction</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Montant (DH)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  >
                    <option value="Dépense">Dépense</option>
                    <option value="Revenu">Revenu</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reference_number">
                    Numéro de référence
                  </label>
                  <input
                    type="text"
                    id="reference_number"
                    name="reference_number"
                    value={formData.reference_number}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entity_name">
                    Nom de l'entité
                  </label>
                  <input
                    type="text"
                    id="entity_name"
                    name="entity_name"
                    value={formData.entity_name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entity_type">
                    Type d'entité
                  </label>
                  <select
                    id="entity_type"
                    name="entity_type"
                    value={formData.entity_type}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  >
                    <option value="Etudiant">Étudiant</option>
                    <option value="Personnel">Personnel</option>
                    <option value="Fournisseur">Fournisseur</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardComptable;