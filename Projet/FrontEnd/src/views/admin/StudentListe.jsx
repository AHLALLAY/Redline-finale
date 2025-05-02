import { useState, useEffect } from "react";
import { FaTimes, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Header
function Header() {
    const navigate = useNavigate();

    const back = () => navigate('/admin/dashboard');
    
    const logout = () => {
        localStorage.clear();
        navigate('/login/staff');
    }

    const role = localStorage.getItem('role') || 'N/A';

    return (
        <div className="w-full bg-orange-500 text-orange-50 font-bold">
            <div className="flex justify-between p-2">
                <div>
                    <div className="text-3xl flex space-x-1">
                        <button onClick={back} className="text-orange-900 text-4xl">Ω</button>
                        <span>MEGA SCHOOL</span>
                    </div>
                    <div>
                        <p className="text-lg">Bonjour {role}</p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 rounded-lg px-2 py-1"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
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
            <button onClick={toggle} className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                <span>Filtrer</span>
            </button>

            {open && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
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
                                placeholder="Nom d'élève..."
                                className="w-full p-2 border border-gray-300 rounded-md"
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
                                className="w-full p-2 border border-gray-300 rounded-md"
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
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Tous les groupes</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={reset} className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                Réinitialiser
                            </button>
                            <button onClick={apply} className="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded">
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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        level: "",
        group: "",
        parent: "",
        cin: "",
        address: "",
        phone: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.status === "success") {
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
                    parent: "",
                    cin: "",
                    address: "",
                    phone: ""
                });
                onStudentAdded();
            } else {
                alert("Erreur lors de l'ajout de l'élève");
            }
        } catch (error) {
            alert("Erreur de connexion : " + error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(true)}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
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
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="gender" className="block text-sm text-gray-700 mb-1">Sexe*</label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            >
                                                <option value="">Choisir...</option>
                                                <option value="Masculin">Masculin</option>
                                                <option value="Féminin">Féminin</option>
                                            </select>
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
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Mot de passe*</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
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
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="birth_place" className="block text-sm text-gray-700 mb-1">Lieu de naissance*</label>
                                            <input
                                                type="text"
                                                id="birth_place"
                                                name="birth_place"
                                                value={formData.birth_place}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
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
                                                className="w-full p-2 border border-gray-300 rounded"
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
                                        </div>
                                        <div>
                                            <label htmlFor="group" className="block text-sm text-gray-700 mb-1">Groupe*</label>
                                            <select
                                                id="group"
                                                name="group"
                                                value={formData.group}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            >
                                                <option value="">Choisir...</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </select>
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
                                                name="parent"
                                                value={formData.parent}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cin" className="block text-sm text-gray-700 mb-1">CIN*</label>
                                            <input
                                                type="text"
                                                id="cin"
                                                name="cin"
                                                value={formData.cin}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
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
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">Téléphone*</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons */}
                                <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                    >
                                        Enregistrer
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
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-orange-800">{student.name}</h3>
            <div className="mt-2 text-gray-600">
                <p>Niveau: {student.level}</p>
                <p>Groupe: {student.group || 'N/A'}</p>
            </div>
            <div className="mt-3 flex justify-end">
                <button
                    onClick={viewDetails}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                >
                    <FaEye className="text-sm" />
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
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center p-4 bg-white rounded shadow mb-4">
                    <div className="text-xl font-semibold text-orange-800">Liste des élèves</div>

                    <div className="flex space-x-4">
                        <Filter onFilterChange={handleFilterChange} />
                        <AddStudent onStudentAdded={fetchStudents} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    {loading ? (
                        <p className="text-center text-gray-500 p-8">Chargement...</p>
                    ) : filteredStudents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredStudents.map(student => (
                                <StudentCard key={student.id} student={student} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 p-8">
                            Aucun élève trouvé. Utilisez le bouton "Nouvel élève" pour en ajouter.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentList;