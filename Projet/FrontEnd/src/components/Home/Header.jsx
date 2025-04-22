import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuItems = [
        { id: 'offres', label: 'Nos offres' },
        { id: 'propos', label: 'À propos' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3">
                {/* Menu Desktop */}
                <div className="flex justify-between items-center pr-8">
                    {/* Logo */}
                    <div className="inline-flex items-center mb-4">
                        <span className="hidden md:flex text-5xl font-bold text-green-600 mr-2">Ω</span>
                        <h1 className="hidden md:flex text-3xl font-bold text-green-600">
                            OMEGA SCHOOL
                        </h1>
                    </div>

                    {/* Menu Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        {menuItems.map(item => (
                            <button
                                className="text-gray-800 hover:text-green-600 font-medium transition-colors"
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Menu Mobile */}
                <div className="flex justify-between items-center md:hidden">
                    {/* Logo */}
                    <div className="inline-flex items-center mb-4">
                        <span className="text-5xl font-bold text-green-600 mr-2">Ω</span>
                    </div>
                    {/* Bouton Mobile */}
                    <button
                        className="text-gray-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 bg-white shadow-lg rounded-lg">
                    <nav className="flex flex-col space-y-3">
                        {menuItems.map(item => (
                            <button
                                className="text-left ml-10 py-2 text-gray-800 hover:text-green-600 font-medium"
                                key={item.id}
                                onClick={() => {
                                    scrollToSection(item.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
