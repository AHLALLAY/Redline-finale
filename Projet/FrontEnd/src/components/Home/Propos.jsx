import Carousel from './Carousel';

function Propos() {
    return (
        <section id="propos" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 relative">
                    Notre École
                    <div className="w-20 h-1 bg-green-600 mx-auto mt-4"></div>
                </h2>
                
                <div className="flex flex-col lg:flex-row gap-8 h-[600px]"> {/* Hauteur fixe pour le conteneur */}
                    {/* Texte à gauche */}
                    <div className="lg:w-1/2 flex flex-col gap-8 h-full">
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-1/2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Qui sommes-nous ?
                            </h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                OMEGA SCHOOL est une institution éducative moderne qui forme les leaders de demain grâce à une pédagogie innovante et un environnement d'apprentissage exceptionnel.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-1/2 overflow-y-auto">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Nos Principes
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Enseignants hautement qualifiés",
                                    "Environnement stimulant et sécurisé",
                                    "Programme éducatif complet et actualisé",
                                    "Infrastructure moderne et adaptée",
                                    "Approche pédagogique centrée sur l'élève",
                                    "Technologies éducatives de pointe",
                                    "Activités parascolaires enrichissantes",
                                    "Suivi personnalisé de chaque étudiant"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start text-lg text-gray-600">
                                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Carrousel à droite - version étendue */}
                    <div className="lg:w-1/2 w-full h-full">
                        <div className="rounded-xl overflow-hidden shadow-xl h-full">
                            <Carousel className="h-full w-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Propos;