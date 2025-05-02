import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Composant Header
function Header() {
  const navigate = useNavigate();
  const back = () => navigate('/admin/students');
  const logout = () => {
    localStorage.clear();
    navigate('/login/staff');
  };
  const role = localStorage.getItem('role') || 'N/A';
  
  return (
    <div className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <button onClick={back} className="mr-4 text-white hover:text-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Ω MEGA SCHOOL</h1>
        </div>
        <div className="text-center flex-grow hidden md:block">
          <p className="text-xl">Bonjour {role}</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant pour les détails de l'étudiant
function StudentInfo({ studentData, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Informations de l'élève</h2>
        <button 
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          Modifier
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries({
          'Nom complet': studentData.name,
          'Email': studentData.email,
          'Date de naissance': studentData.birth_date,
          'Lieu de naissance': studentData.birth_place,
          'Genre': studentData.gender,
          'Niveau': studentData.level,
          'Groupe': studentData.group,
          'Parent': studentData.parent,
          'CIN': studentData.cin,
          'Adresse': studentData.address,
          'Téléphone': studentData.phone
        }).map(([label, value]) => (
          <div key={label} className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold">{value || 'Non renseigné'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Composant pour le tableau des notes
function GradesTable({ grades }) {
  if (grades.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes d'examens</h2>
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes d'examens</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">Semestre</th>
              <th className="py-3 px-4 text-left">Matière</th>
              <th className="py-3 px-4 text-left">Professeur</th>
              <th className="py-3 px-4 text-center">Contrôle 1</th>
              <th className="py-3 px-4 text-center">Contrôle 2</th>
              <th className="py-3 px-4 text-center">Contrôle 3</th>
              <th className="py-3 px-4 text-center">Contrôle 4</th>
              <th className="py-3 px-4 text-center">Activité</th>
              <th className="py-3 px-4 text-center">Moyenne</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {grades.map((grade, index) => {
              const average = calculateAverage(
                [grade.control1, grade.control2, grade.control3, grade.control4],
                grade.activity
              );
              
              return (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{grade.semester}</td>
                  <td className="py-3 px-4">{grade.subject}</td>
                  <td className="py-3 px-4">{grade.teacher}</td>
                  <td className="py-3 px-4 text-center">{grade.control1 ?? '-'}</td>
                  <td className="py-3 px-4 text-center">{grade.control2 ?? '-'}</td>
                  <td className="py-3 px-4 text-center">{grade.control3 ?? '-'}</td>
                  <td className="py-3 px-4 text-center">{grade.control4 ?? '-'}</td>
                  <td className="py-3 px-4 text-center">{grade.activity ?? '-'}</td>
                  <td className="py-3 px-4 text-center font-bold">{average}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Composant principal
function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulation d'un appel API
        const response = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          setStudentData(data.student);
          setGrades(data.grades || []);
        } else {
          throw new Error(data.message || "Données invalides reçues du serveur");
        }
      } catch (err) {
        setError(err.message);
        console.error("Erreur de chargement:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/admin/students/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erreur!</strong>
            <span className="block sm:inline"> {error}</span>
            <button 
              onClick={() => window.location.reload()} 
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8 px-4">
        {studentData ? (
          <>
            <StudentInfo 
              studentData={studentData}
              onEdit={handleEdit}
            />
            <GradesTable grades={grades} />
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">Aucune donnée disponible pour cet élève</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;