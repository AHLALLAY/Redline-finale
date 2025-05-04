import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes, FaEdit } from "react-icons/fa";

// Header
function Header() {
    const navigate = useNavigate();

    const back = () => navigate('/admin/students');
    const logout = () => {
        localStorage.clear();
        navigate('/login/staff');
    }

    const role = localStorage.getItem('role') || 'Administrateur';
    const username = localStorage.getItem('username') || 'Utilisateur';

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
                            <p className="font-medium">{username}</p>
                            <p className="text-xs text-orange-200">{role}</p>
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

// Section des informations de l'élève
function StudentInfoSection({ student }) {
    const navigate = useNavigate();
    
    const handleEdit = () => {
        navigate(`/admin/students/edit/${student.id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-orange-800">Informations de l'élève</h2>
                <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition shadow hover:shadow-md"
                >
                    <FaEdit />
                    <span>Modifier</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard label="Nom complet" value={student.name} />
                <InfoCard label="Email" value={student.email} />
                <InfoCard label="Date de naissance" value={student.birth_date} />
                <InfoCard label="Lieu de naissance" value={student.birth_place} />
                <InfoCard label="Genre" value={student.gender} />
                <InfoCard label="Niveau" value={student.level} />
                <InfoCard label="Groupe" value={student.group} />
                <InfoCard label="Parent" value={student.parent_name} />
                <InfoCard label="CIN Parent" value={student.parent_cin} />
                <InfoCard label="Adresse" value={student.address} />
                <InfoCard label="Téléphone" value={student.phone} />
            </div>
        </div>
    );
}

// Composant pour afficher une information
function InfoCard({ label, value }) {
    return (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <p className="text-sm text-orange-600 font-medium">{label}</p>
            <p className="text-gray-800 font-semibold">{value || 'Non renseigné'}</p>
        </div>
    );
}

// Section des notes de l'élève
function GradesSection({ grades }) {
    if (!grades || grades.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-orange-800 mb-4">Notes d'examens</h2>
                <p className="text-gray-500">Aucune note disponible pour cet élève</p>
            </div>
        );
    }

    const calculateAverage = (controls, activity) => {
        const validControls = controls.filter(control => control !== null && !isNaN(control));
        if (validControls.length === 0) return 'N/A';
        
        const sum = validControls.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / validControls.length;
        const activityValue = activity || 0;
        return ((avg * 0.75) + (activityValue * 0.25)).toFixed(2);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-800 mb-4">Notes d'examens</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-orange-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Semestre</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Matière</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Professeur</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-orange-600 uppercase tracking-wider">Contrôle 1</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-orange-600 uppercase tracking-wider">Contrôle 2</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-orange-600 uppercase tracking-wider">Activité</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-orange-600 uppercase tracking-wider">Moyenne</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {grades.map((grade, index) => {
                            const average = calculateAverage(
                                [grade.control1, grade.control2],
                                grade.activity
                            );
                            
                            return (
                                <tr key={index} className="hover:bg-orange-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{grade.semester}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{grade.subject}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{grade.teacher}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-800">{grade.control1 ?? '-'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-800">{grade.control2 ?? '-'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-800">{grade.activity ?? '-'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-bold text-orange-700">{average}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// root
function StudentDetails() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                setLoading(true);
                
                // Récupération des informations de l'élève
                const studentResponse = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (!studentResponse.ok) {
                    throw new Error('Erreur lors de la récupération des données de l\'élève');
                }
                
                const studentData = await studentResponse.json();
                
                // Récupération des notes de l'élève (n'est pas encors implémente)
                const gradesResponse = await fetch(`http://127.0.0.1:8000/api/students/${id}/grades`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                let gradesData = [];
                if (gradesResponse.ok) {
                    const data = await gradesResponse.json();
                    gradesData = data.grades || [];
                }
                
                setStudent(studentData.student);
                setGrades(gradesData);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Erreur:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
                <Header />
                <main className="flex-1 p-4 md:p-6 mt-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-center p-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
                <Header />
                <main className="flex-1 p-4 md:p-6 mt-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                            <p className="font-bold">Erreur</p>
                            <p>{error}</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
                <Header />
                <main className="flex-1 p-4 md:p-6 mt-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <p className="text-gray-500">Élève non trouvé</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
            <Header />
            <main className="flex-1 p-4 md:p-6 mt-16">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Fiche de l'élève: <span className="text-orange-600">{student.name}</span>
                        </h1>
                    </div>
                    
                    <StudentInfoSection student={student} />
                    <GradesSection grades={grades} />
                </div>
            </main>
        </div>
    );
}

export default StudentDetails;