import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaChartBar, FaCalendarAlt } from "react-icons/fa";

// Header
function Header() {
    const navigate = useNavigate();

    const back = () => navigate('/admin/students');
    const logout = () => {
        localStorage.clear();
        navigate('/login/staff');
    }

    const user = JSON.parse(localStorage.getItem('user'));
    

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

// Composant pour afficher une information
function InfoCard({ label, value }) {
    return (
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors duration-200 mb-2">
            <p className="text-xs text-orange-600 font-medium truncate">{label}</p>
            <p className="text-gray-800 font-semibold text-sm truncate">{value || '-'}</p>
        </div>
    );
}

// Section des informations de l'élève
function StudentInfoSection({ student }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 lg:mb-0 lg:w-64 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-orange-800">Informations</h2>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                <InfoCard label="Nom complet" value={student.name} />
                <InfoCard label="Email" value={student.email} />
                <InfoCard label="Date naiss." value={student.birth_date} />
                <InfoCard label="Lieu naiss." value={student.birth_place} />
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

// Section des absences
function AbsenceSection({ absences }) {
    if (!absences || absences.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-orange-800 mb-4">Absences</h2>
                <p className="text-gray-500">Aucune absence enregistrée pour cet élève</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-orange-800 mb-4">Absences</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-orange-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Matière</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Professeur</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Justification</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {absences.map((absence, index) => (
                            <tr key={index} className="hover:bg-orange-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{absence.date}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{absence.subject}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{absence.teacher}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        absence.justified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {absence.justified ? 'Justifiée' : 'Non justifiée'}
                                    </span>
                                </td>
                            </tr>
                        ))}
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
    const [absences, setAbsences] = useState([]);
    const [activeTab, setActiveTab] = useState('grades');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                setLoading(true);
                
                // Récupération des informations de l'élève
                const studentResponse = await fetch(`http://127.0.0.1:8000/api/student/details/${id}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (!studentResponse.ok) {
                    throw new Error('Erreur lors de la récupération des données de l\'élève');
                }
                
                const responseData = await studentResponse.json();
                
                if (responseData.status !== 'success') {
                    throw new Error(responseData.message || 'Erreur lors de la récupération des données');
                }
                
                const studentData = responseData.student[0];
                
                // Données mockées pour les notes
                const mockGrades = [
                    {
                        semester: "Semestre 1",
                        subject: "Mathématiques",
                        teacher: "Prof. Ahmed",
                        control1: 15,
                        control2: 14,
                        activity: 16
                    },
                    {
                        semester: "Semestre 1",
                        subject: "Langue Arabe",
                        teacher: "Prof. Fatima",
                        control1: 13,
                        control2: 12,
                        activity: 14
                    },
                    {
                        semester: "Semestre 1",
                        subject: "Langue Française",
                        teacher: "Prof. Jean",
                        control1: 16,
                        control2: 17,
                        activity: 15
                    },
                    {
                        semester: "Semestre 2",
                        subject: "Mathématiques",
                        teacher: "Prof. Ahmed",
                        control1: 14,
                        control2: 16,
                        activity: 15
                    },
                    {
                        semester: "Semestre 2",
                        subject: "Langue Arabe",
                        teacher: "Prof. Fatima",
                        control1: 12,
                        control2: 13,
                        activity: 14
                    }
                ];
                
                // Données mockées pour les absences
                const mockAbsences = [
                    {
                        date: "2023-10-15",
                        subject: "Mathématiques",
                        teacher: "Prof. Ahmed",
                        justified: true
                    },
                    {
                        date: "2023-11-02",
                        subject: "Langue Arabe",
                        teacher: "Prof. Fatima",
                        justified: false
                    },
                    {
                        date: "2023-11-10",
                        subject: "Physique",
                        teacher: "Prof. Karim",
                        justified: true
                    }
                ];
                
                setStudent(studentData);
                setGrades(mockGrades);
                setAbsences(mockAbsences);
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
            <main className="flex-1 p-4 md:p-6 pt-20 mt-12">
                <div className="max-w-7xl mx-auto">
                    {/* Conteneur flexible pour la mise en page bureau */}
                    <div className="lg:flex lg:gap-6">
                        {/* Sidebar avec les informations de l'élève */}
                        <StudentInfoSection student={student} />
                        
                        {/* Contenu principal */}
                        <div className="flex-1">
                            <div className="flex space-x-4 mb-4">
                                <button
                                    onClick={() => setActiveTab('grades')}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                        activeTab === 'grades' 
                                            ? 'bg-orange-600 text-white shadow-md' 
                                            : 'bg-white text-orange-600 hover:bg-orange-50 shadow'
                                    }`}
                                >
                                    <FaChartBar />
                                    <span>Notes</span>
                                </button>
                                
                                <button
                                    onClick={() => setActiveTab('absences')}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                        activeTab === 'absences' 
                                            ? 'bg-orange-600 text-white shadow-md' 
                                            : 'bg-white text-orange-600 hover:bg-orange-50 shadow'
                                    }`}
                                >
                                    <FaCalendarAlt />
                                    <span>Absences</span>
                                </button>
                            </div>
                            
                            {activeTab === 'grades' ? (
                                <GradesSection grades={grades} />
                            ) : (
                                <AbsenceSection absences={absences} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StudentDetails;