import FooterGlobale from './../../components/Global/FooterGlobal';
import Header from './../../components/Enseingant/Header';
import SideBar from '../../components/Enseingant/SideBar';

function DashboardEnseignant() {
    // Données simulées pour une seule matière
    const matiere = "Mathématiques";
    const classes = ["4ème A", "5ème B", "Terminale C"];
    const etudiantsTotal = 72;
    const devoirsARelier = 5;
    const moyenneGenerale = 14.5;
    const prochainsCours = [
        { date: "Aujourd'hui, 10h-12h", salle: "B203" },
        { date: "Demain, 8h-10h", salle: "A112" },
        { date: "Vendredi, 14h-16h", salle: "C304" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header en position fixe */}
            <Header />
            
            {/* Contenu principal avec sidebar et dashboard */}
            <div className="flex flex-1 pt-16"> {/* pt-16 pour compenser le header fixe */}
                {/* Sidebar fixe */}
                <SideBar />
                
                {/* Contenu du dashboard */}
                <main className="flex-1 p-6 overflow-auto">
                    {/* En-tête */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord - {matiere}</h1>
                        <p className="text-gray-600">Bienvenue, Professeur</p>
                    </div>

                    {/* Statistiques principales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Carte Classes */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                            <h3 className="text-lg font-medium text-gray-500">Classes</h3>
                            <div className="mt-2">
                                {classes.map((classe, index) => (
                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                                        {classe}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Carte Étudiants */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                            <h3 className="text-lg font-medium text-gray-500">Étudiants</h3>
                            <p className="text-3xl font-bold text-green-600">{etudiantsTotal}</p>
                            <p className="text-sm text-gray-500">Total inscrits</p>
                        </div>

                        {/* Carte Devoirs */}
                        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                            <h3 className="text-lg font-medium text-gray-500">Devoirs à corriger</h3>
                            <p className="text-3xl font-bold text-yellow-600">{devoirsARelier}</p>
                            <p className="text-sm text-gray-500">En attente</p>
                        </div>
                    </div>

                    {/* Deux colonnes */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Prochains cours */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Prochains cours</h2>
                            <ul className="space-y-3">
                                {prochainsCours.map((cours, index) => (
                                    <li key={index} className="border-b pb-2 last:border-b-0">
                                        <p className="font-medium">{cours.date}</p>
                                        <p className="text-gray-600">Salle: {cours.salle}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Performance */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Performance de la classe</h2>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-4xl font-bold text-purple-600">{moyenneGenerale}/20</p>
                                    <p className="text-gray-500">Moyenne générale</p>
                                </div>
                                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl font-bold text-purple-600">72%</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    <span className="text-green-500">↑ 5%</span> par rapport au dernier trimestre
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
            {/* Footer en bas de page */}
            <FooterGlobale />
        </div>
    );
}

export default DashboardEnseignant;