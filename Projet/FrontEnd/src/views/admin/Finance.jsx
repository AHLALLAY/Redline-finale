import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Finance() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate("");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/Login/staff");
    };
    const comeBack = () => {
        navigate("/admin/dashboard");
    };

    return (
        <div className="flex flex-col">
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="inline-flex items-center">
                            <button onClick={comeBack} className="text-5xl font-bold text-green-600 mr-2">Ω</button>
                            <h1 className="text-xl md:text-3xl font-bold text-green-600">
                                OMEGA SCHOOL
                            </h1>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <button
                                onClick={handleLogout}
                                className="bg-green-600 rounded-full px-6 py-2 text-white hover:bg-green-700 transition-colors font-medium"
                            >
                                Déconnexion
                            </button>
                        </nav>

                        <button
                            className="md:hidden text-gray-800"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 p-4">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-green-600 rounded-full px-6 py-2 text-white hover:bg-green-700 transition-colors font-medium"
                        >
                            Déconnexion
                        </button>
                    </div>
                )}
            </header>
            <div className="ml-5 mt-20">
                <main>
                    <div></div>
                    <table className="flex">
                        <thead>
                            <th>
                                <tr>Lébellé</tr>
                                <tr>Montant</tr>
                                <tr>Type</tr>
                                <tr>Reference</tr>
                                <tr>Ressource</tr>
                                <tr>Type de Ressource</tr>
                                <tr>Date d'opération</tr>
                            </th>
                        </thead>
                        <tbody>
                            <td>
                                <tr></tr>
                            </td>
                        </tbody>
                    </table>

                </main>
            </div>
        </div>
    );
}

export default Finance;