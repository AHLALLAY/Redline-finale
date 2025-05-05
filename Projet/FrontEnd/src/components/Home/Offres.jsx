function Offres() {
    const offres = [
        {
            id: 1,
            titre: "Professeur de Français",
            type: "CDD",
            duree: "1 an"
        },
        {
            id: 2,
            titre: "Stage en Mathématiques",
            type: "Stage",
            duree: "6 mois"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission ici
    };

    return (
        <section id="offres" className="bg-orange-50 py-16">
            <div className="container mx-auto px-4">
                {/* Section title */}
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Nos Offres d'Emploi
                    <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
                </h2>
                
                {/* Cards grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offres.map(off => (
                        <form onSubmit={handleSubmit} key={off.id}>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{off.titre}</h3>
                                    
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <span>{off.type}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-gray-600 mb-6">
                                        <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{off.duree}</span>
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
            </div>
        </section>
    );
}

export default Offres;