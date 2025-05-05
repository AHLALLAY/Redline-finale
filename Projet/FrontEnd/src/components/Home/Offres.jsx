import { useState, useEffect } from "react";

function Offres() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/offers');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des offres');
                }
                const result = await response.json();
                // Modification pour accéder au tableau data contenant les offres
                setOffres(result.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission ici
    };

    if (loading) {
        return (
            <section id="offres" className="bg-orange-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Nos Offres d'Emploi
                        <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
                    </h2>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="offres" className="bg-orange-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Nos Offres d'Emploi
                        <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
                    </h2>
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <p>Erreur: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="offres" className="bg-orange-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Nos Offres d'Emploi
                    <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
                </h2>
                
                {offres.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {offres.map(offre => (
                            <form onSubmit={handleSubmit} key={offre.id}>
                                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{offre.title}</h3>
                                        
                                        <div className="flex items-center text-gray-600 mb-3">
                                            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            <span>{offre.contrat_type}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-600 mb-6">
                                            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{"Description: " + offre.description.substring(0, 30) + "..."}</span>
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                                        >
                                            Postuler maintenant
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Aucune offre disponible pour le moment</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Offres;