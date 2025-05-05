function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Logo et Description */}
                    <div className="mb-6 md:mb-0 md:w-1/3">
                        <div className="flex items-center mb-4">
                            <span className="text-3xl font-bold text-orange-500 mr-2">Ω</span>
                            <h2 className="text-xl font-bold">OMEGA SCHOOL</h2>
                        </div>
                        <p className="text-gray-400">
                            Une institution éducative moderne qui forme les leaders de demain grâce à une pédagogie innovante.
                        </p>
                    </div>
                    
                    {/* Liens rapides */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#offres" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Nos offres
                                </a>
                            </li>
                            <li>
                                <a href="#propos" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    À propos
                                </a>
                            </li>
                            <li>
                                <a href="/login/staff" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Espace personnel
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                123 Avenue de l'Éducation, 22300 Demnate
                            </li>
                            <li className="flex items-center text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                contact@omega-school.com
                            </li>
                            <li className="flex items-center text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +212 6 06 58 16 12
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} OMEGA SCHOOL. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;