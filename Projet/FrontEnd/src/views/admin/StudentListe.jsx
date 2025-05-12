import { useState, useEffect } from "react";
import { FaTimes, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Header
function Header() {
    const navigate = useNavigate();

    const back = () => navigate('/admin/dashboard');

    const logout = () => {
        localStorage.clear();
        navigate('/login/staff');
    }

  const user = JSON.parse(localStorage.getItem('user'))

    return (
        <header className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white fixed top-0 left-0 right-0 z-50 shadow-lg h-16 flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={back}
                            className="flex items-center space-x-2 focus:outline-none"
                        >
                            <span className="text-2xl font-bold text-orange-900">Ω</span>
                            <span className="text-xl font-bold hidden sm:inline-block">MEGA SCHOOL</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="text-sm md:text-base text-orange-100">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-orange-200">{user.role}</p>
                        </div>

                        <button
                            onClick={logout}
                            className="bg-white text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg text-sm font-semibold transition-colors duration-200 shadow hover:shadow-md"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Filter
function Filter({ onFilterChange }) {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
        level: "",
        group: "",
        searchName: ""
    });

    const toggle = () => setOpen(!open);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFilters({ ...filters, [name]: value });
    };

    const reset = () => {
        const resetFilters = { level: "", group: "", searchName: "" };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
        setOpen(false);
    };

    const apply = () => {
        onFilterChange(filters);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={toggle}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition shadow hover:shadow-md"
            >
                <FaFilter className="text-orange-600" />
                <span>Filtrer</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-orange-200">
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium text-gray-800">Filtres</h3>
                            <button onClick={toggle} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Recherche par nom
                            </label>
                            <input
                                type="text"
                                name="searchName"
                                value={filters.searchName}
                                onChange={handleChange}
                                placeholder="Nom de l'élève..."
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Niveau
                            </label>
                            <select
                                name="level"
                                value={filters.level}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="">Tous les niveaux</option>
                                <option value="1ére année">1ére année</option>
                                <option value="2ème année">2ème année</option>
                                <option value="3ème année">3ème année</option>
                                <option value="4ème année">4ème année</option>
                                <option value="5ème année">5ème année</option>
                                <option value="6ème année">6ème année</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Groupe
                            </label>
                            <select
                                name="group"
                                value={filters.group}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            >
                                <option value="">Tous les groupes</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={reset}
                                className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                            >
                                Réinitialiser
                            </button>
                            <button
                                onClick={apply}
                                className="px-3 py-1 text-sm bg-orange-600 text-white hover:bg-orange-700 rounded"
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Add Student Modal
function AddStudent({ onStudentAdded }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        level: "",
        group: "",
        parent_name: "",
        parent_cin: "",
        address: "",
        phone: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                setOpen(false);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    birth_date: "",
                    birth_place: "",
                    gender: "",
                    level: "",
                    group: "",
                    parent_name: "",
                    parent_cin: "",
                    address: "",
                    phone: ""
                });
                onStudentAdded();
            } else {
                // Traitement des erreurs
                if (response.status === 422 && data.errors) {
                    setErrors(data.errors);
                    console.error("Erreurs de validation:", data.errors);
                } else if (data.message) {
                    setErrors({ general: data.message });
                    console.error("Erreur API:", data.message);
                } else {
                    setErrors({ general: "Une erreur s'est produite lors de l'ajout de l'élève" });
                }
            }
        } catch (error) {
            console.error("Erreur de connexion:", error);
            setErrors({ general: "Erreur de connexion au serveur: " + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(true)}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition shadow hover:shadow-md"
            >
                <FaPlus />
                <span>Nouvel élève</span>
            </button>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4 border-b pb-3">
                                <h2 className="text-lg font-semibold text-gray-800">Ajouter un nouvel élève</h2>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Message d'erreur général */}
                                {errors.general && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                                        {errors.general}
                                    </div>
                                )}

                                {/* Section Élève */}
                                <div className="mb-6">
                                    <h3 className="text-md font-medium text-orange-700 mb-3">Informations de l'élève</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Nom*</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="gender" className="block text-sm text-gray-700 mb-1">Sexe*</label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            >
                                                <option value="">Choisir...</option>
                                                <option value="Masculin">Masculin</option>
                                                <option value="Féminin">Féminin</option>
                                            </select>
                                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email*</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Mot de passe*</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="birth_date" className="block text-sm text-gray-700 mb-1">Date de naissance*</label>
                                            <input
                                                type="date"
                                                id="birth_date"
                                                name="birth_date"
                                                value={formData.birth_date}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.birth_date ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="birth_place" className="block text-sm text-gray-700 mb-1">Lieu de naissance*</label>
                                            <input
                                                type="text"
                                                id="birth_place"
                                                name="birth_place"
                                                value={formData.birth_place}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.birth_place ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.birth_place && <p className="text-red-500 text-xs mt-1">{errors.birth_place}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="level" className="block text-sm text-gray-700 mb-1">Niveau*</label>
                                            <select
                                                id="level"
                                                name="level"
                                                value={formData.level}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.level ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            >
                                                <option value="">Choisir...</option>
                                                <option value="1ére année">1ére année</option>
                                                <option value="2ème année">2ème année</option>
                                                <option value="3ème année">3ème année</option>
                                                <option value="4ème année">4ème année</option>
                                                <option value="5ème année">5ème année</option>
                                                <option value="6ème année">6ème année</option>
                                            </select>
                                            {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="group" className="block text-sm text-gray-700 mb-1">Groupe*</label>
                                            <select
                                                id="group"
                                                name="group"
                                                value={formData.group}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.group ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            >
                                                <option value="">Choisir...</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </select>
                                            {errors.group && <p className="text-red-500 text-xs mt-1">{errors.group}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Section Parent */}
                                <div className="mb-6">
                                    <h3 className="text-md font-medium text-orange-700 mb-3">Informations du parent</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="parent" className="block text-sm text-gray-700 mb-1">Nom du parent*</label>
                                            <input
                                                type="text"
                                                id="parent"
                                                name="parent_name"
                                                value={formData.parent_name}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.parent_name ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.parent_name && <p className="text-red-500 text-xs mt-1">{errors.parent_name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="cin" className="block text-sm text-gray-700 mb-1">CIN*</label>
                                            <input
                                                type="text"
                                                id="cin"
                                                name="parent_cin"
                                                value={formData.cin_parent}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.cin_parent ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.cin_parent && <p className="text-red-500 text-xs mt-1">{errors.cin_parent}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="address" className="block text-sm text-gray-700 mb-1">Adresse*</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">Téléphone*</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-orange-500 focus:border-orange-500`}
                                                required
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons */}
                                <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
                                        disabled={loading}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                                                Traitement...
                                            </>
                                        ) : 'Enregistrer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Student Card
function StudentCard({ student }) {
    const navigate = useNavigate();

    const viewDetails = () => {
        navigate(`/admin/students/${student.id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="font-semibold text-lg text-orange-800 mb-2">{student.name}</h3>
            <div className="text-gray-600 space-y-1">
                <p className="text-sm">Niveau: <span className="font-medium">{student.level}</span></p>
                <p className="text-sm">Groupe: <span className="font-medium">{student.group || 'N/A'}</span></p>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={viewDetails}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-800 transition text-sm font-medium"
                >
                    <FaEye />
                    <span>Voir détails</span>
                </button>
            </div>
        </div>
    );
}

// root
function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        level: "",
        group: "",
        searchName: ""
    });

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/admin/students");
            const data = await response.json();

            if (data.status === "success") {
                setStudents(data.data);
            } else {
                setStudents([]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des élèves:", error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredStudents = students.filter(student => {
        const nameMatch = !filters.searchName ||
            student.name.toLowerCase().includes(filters.searchName.toLowerCase());
        const levelMatch = !filters.level || student.level === filters.level;
        const groupMatch = !filters.group || student.group === filters.group;

        return nameMatch && levelMatch && groupMatch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
            <Header />

            <main className="flex-1 p-4 md:p-6 mt-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Gestion des élèves
                    </h2>

                    <div className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Liste des élèves</h3>

                            <div className="flex space-x-4">
                                <Filter onFilterChange={handleFilterChange} />
                                <AddStudent onStudentAdded={fetchStudents} />
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center p-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                            </div>
                        ) : filteredStudents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredStudents.map(student => (
                                    <StudentCard key={student.id} student={student} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-8 text-gray-500">
                                <p>Aucun élève trouvé. Utilisez le bouton "Nouvel élève" pour en ajouter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StudentList;