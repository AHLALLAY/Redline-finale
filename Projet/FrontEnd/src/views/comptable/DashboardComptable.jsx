import { useState } from 'react';
import Header from '../../components/Comptable/Header';
import Sidebar from '../../components/Comptable/SideBar';
import StatsCard from '../../components/Comptable/StatsCard';
import RecordTable from '../../components/Comptable/RecordTable';
import Footer from '../../components/Comptable/Footer';

function DashboardComptable() {
  // Mois sélectionné dans le menu déroulant
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Liste des mois pour le menu
  const mois = [
    { value: '1', label: 'Janvier' },
    { value: '2', label: 'Février' },
    { value: '3', label: 'Mars' },
    { value: '4', label: 'Avril' },
    { value: '5', label: 'Mai' },
    { value: '6', label: 'Juin' },
    { value: '7', label: 'Juillet' },
    { value: '8', label: 'Août' },
    { value: '9', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* En-tête */}
      <Header />

      <div className="flex flex-1">
        {/* Barre latérale */}
        <Sidebar />

        {/* Contenu principal */}
        <main className="flex-1 p-6">
          {/* Sélection du mois + bouton */}
          <div className="flex justify-between items-center mb-6">
            <select
              className="px-4 py-2 border rounded bg-white shadow-sm"
              value={selectedMonth || ''}
              onChange={(e) => setSelectedMonth(e.target.value || null)}
            >
              <option value="">Mois actuel</option>
              {mois.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Cartes des statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard type="charge" month={selectedMonth} />
            <StatsCard type="produit" month={selectedMonth} />
            <StatsCard type="benefice" month={selectedMonth} />
          </div>

          {/* Tableau des enregistrements */}
          <div className="bg-white p-4 rounded shadow">
            <RecordTable month={selectedMonth} />
          </div>
        </main>
      </div>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default DashboardComptable;
