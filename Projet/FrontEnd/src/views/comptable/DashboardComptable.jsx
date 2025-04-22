import Header from '../../components/Comptable/Header';
import Sidebar from '../../components/Comptable/SideBar';
import StatsCard from '../../components/Comptable/StatsCard';
import RecordTable from '../../components/Comptable/RecordTable';
import Footer from '../../components/Comptable/Footer';

function DashboardComptable() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord Comptable</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard 
                title="Recettes Mensuelles" 
                value="25,840 DH" 
                change="+12% vs mois dernier" 
                isPositive={true}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
              />
              
              <StatsCard 
                title="Dépenses Mensuelles" 
                value="18,230 DH" 
                change="+8% vs mois dernier" 
                isPositive={false}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                }
              />
              
              <StatsCard 
                title="Solde Actuel" 
                value="7,610 DH" 
                change="+4% vs mois dernier" 
                isPositive={true}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>

            <RecordTable />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default DashboardComptable;