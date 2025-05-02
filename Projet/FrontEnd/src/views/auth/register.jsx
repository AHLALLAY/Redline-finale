import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Register({ onClose }) {
    const initialFormData = {
        name: '',
        email: '',
        password: 'defaultPassword', // Mot de passe par défaut
        birth_date: '',
        birth_place: '',
        gender: '',
        level: '',
        group: '',
        parent: '',
        cin: '',
        address: '',
        phone: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Options pour les sélecteurs
    const levelOptions = ['1ére année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année'];
    const groupOptions = ['A', 'B', 'C', 'D'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = ['name', 'email', 'birth_date', 'birth_place', 'gender', 'level', 'parent', 'address', 'phone'];

        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                setMessage({ text: `Le champ ${field} est requis`, type: 'error' });
                return false;
            }
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setMessage({ text: "Veuillez entrer un email valide", type: 'error' });
            return false;
        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {
            setMessage({ text: "Le numéro de téléphone doit contenir 10 chiffres", type: 'error' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/student', {
                method: 'POST',
                mode: 'cors', // Explicitement activer CORS
                credentials: 'include', // Inclure les cookies si nécessaire
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Vérifier si la réponse est une redirection
            if (response.redirected) {
                throw new Error("Le serveur a tenté une redirection non autorisée");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Échec de l'inscription");
            }

            setMessage({
                text: "Inscription réussie !",
                type: 'success'
            });
            setFormData(initialFormData);

            setTimeout(() => onClose && onClose(), 2000);

        } catch (error) {
            console.error("Erreur d'inscription:", error);
            setMessage({
                text: error.message || "Une erreur est survenue lors de l'inscription",
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Ajouter un élève</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Message de notification */}
                        {message.text && (
                            <div className={`p-3 rounded-lg border ${message.type === 'success'
                                ? 'bg-green-100 border-green-200 text-green-700'
                                : 'bg-red-100 border-red-200 text-red-700'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Section Informations personnelles */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-orange-700">Informations personnelles</h4>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Nom complet*</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Genre*</label>
                                        <select
                                            name="gender"
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionner</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Féminin">Féminin</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="flex space-x-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Date de naissance*</label>
                                        <input
                                            type="date"
                                            name="birth_date"
                                            id="birth_date"
                                            value={formData.birth_date}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">lieu de naissance*</label>
                                        <input
                                            type="text"
                                            name="birth_place"
                                            id="birth_place"
                                            value={formData.birth_place}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Niveau*</label>
                                        <select
                                            name="level"
                                            id="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionner</option>
                                            {levelOptions.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Groupe*</label>
                                        <select
                                            name="group"
                                            id="group"
                                            value={formData.group}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Sélectionner</option>
                                            {groupOptions.map(group => (
                                                <option key={group} value={group}>{group}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section Informations du parent */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-orange-700">Informations du parent</h4>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Nom du parent*</label>
                                    <input
                                        type="text"
                                        name="parent"
                                        id="parent"
                                        value={formData.parent}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Adresse*</label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Téléphone*</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        pattern="[0-9]{10}"
                                        title="10 chiffres requis"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">CIN</label>
                                    <input
                                        type="text"
                                        name="cin"
                                        id="cin"
                                        value={formData.cin}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                                    }`}
                            >
                                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}