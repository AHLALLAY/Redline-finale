import FooterGlobal from "../Global/FooterGlobal";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
                    {/* Logo et description */}
                    <div className="max-w-xs">
                        <div className="flex items-center mb-4">
                            <span className="text-4xl font-bold text-green-500 mr-2">Ω</span>
                            <h1 className="text-3xl font-bold">
                                OMEGA SCHOOL
                            </h1>
                        </div>
                        <p className="text-gray-400">
                            Une école d'excellence formant les leaders de demain à travers une éducation innovante et un environnement stimulant.
                        </p>
                    </div>

                    {/* Liens rapides */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 border-b border-green-500 pb-2 inline-block">
                            Liens Rapides
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <a 
                                    href="#propos" 
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('propos')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    À propos
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#offres" 
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Nos Offres
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 border-b border-green-500 pb-2 inline-block">
                            Contact
                        </h2>
                        <address className="not-italic text-gray-400 space-y-2">
                            <p className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                123 Rue de l'Éducation, Ville
                            </p>
                            <p className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                contact@omegaschool.edu
                            </p>
                            <p className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +123 456 7890
                            </p>
                        </address>
                    </div>
                </div>
                
                {/* Footer global */}

                    <FooterGlobal />
            </div>
        </footer>
    );
}

export default Footer;