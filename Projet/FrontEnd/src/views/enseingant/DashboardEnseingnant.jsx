import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaUsers, FaCalendarAlt, FaTasks, FaPlus } from "react-icons/fa";

function DashboardEnseignant() {
  const navigate = useNavigate();
  
  // États pour les données et l'interface
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Données du professeur
  const [matiere, setMatiere] = useState("");
  const [classes, setClasses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [exercises, setExercises] = useState([]);
  
  // Nouvel exercice
  const [newExercise, setNewExercise] = useState({
    title: '',
    description: '',
    deadline: '',
    class_id: ''
  });

  // Récupérer les infos du professeur
  const teacherId = localStorage.getItem('id');
  const username = localStorage.getItem('username') || 'Professeur';

  // Afficher un message temporaire
  const displayMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  // Charger les données au chargement
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les classes
        const classesResponse = await fetch(`http://127.0.0.1:8000/api/prof/classes/${teacherId}`);
        if (classesResponse.ok) {
          const classesData = await classesResponse.json();
          setClasses(classesData.classes || []);
        }

        // Récupérer l'emploi du temps
        const scheduleResponse = await fetch(`http://127.0.0.1:8000/api/prof/timetable/${teacherId}`);
        if (scheduleResponse.ok) {
          const scheduleData = await scheduleResponse.json();
          setSchedule(scheduleData.schedule || []);
        }

        // Récupérer les exercices
        const exercisesResponse = await fetch(`http://127.0.0.1:8000/api/prof/exercices/${teacherId}`);
        if (exercisesResponse.ok) {
          const exercisesData = await exercisesResponse.json();
          console.log(exercisesData);
          setExercises(exercisesData.data || []);
        }

        // Récupérer la matière
        setMatiere(localStorage.getItem('subject') || "Matière non définie");
      } catch (error) {
        displayMessage("error", "Erreur de chargement des données : " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  // Ajouter un exercice
  const handleAddExercise = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/prof/exercice/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...newExercise,
          teacher_id: teacherId,
          is_done: false
        }),
      });

      if (response.ok) {
        displayMessage("success", "Exercice ajouté avec succès");
        setShowModal(false);
        
        // Recharger les exercices
        const exercisesResponse = await fetch(`http://127.0.0.1:8000/api/prof/exercices/${teacherId}`);
        if (exercisesResponse.ok) {
          const exercisesData = await exercisesResponse.json();
          setExercises(exercisesData.data || []);
        }
        
        // Réinitialiser le formulaire
        setNewExercise({
          title: '',
          description: '',
          deadline: '',
          class_id: ''
        });
      } else {
        displayMessage("error", "Erreur lors de l'ajout de l'exercice");
      }
    } catch (error) {
      displayMessage("error", error.message);
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.clear();
    navigate('/login/staff');
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* En-tête */}
      <header className="w-full bg-orange-500 text-white fixed top-0 left-0 right-0 z-10 shadow-md h-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/enseignant/dashboard')}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold text-orange-900">Ω</span>
              <span className="text-xl font-bold hidden sm:inline-block">MEGA SCHOOL</span>
            </button>

            <div className="flex items-center space-x-4">
              <div>
                <p className="font-medium">{username}</p>
                <p className="text-xs">Enseignant</p>
              </div>
              
              <button
                onClick={logout}
                className="bg-white text-orange-600 hover:bg-orange-100 px-3 py-1 rounded-lg text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="pt-20 p-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tableau de bord - {matiere}
          </h2>

          {/* Messages */}
          {message.text && (
            <div className={`p-4 mb-4 rounded-lg ${
              message.type === "error" 
                ? "bg-red-100 border-l-4 border-red-500 text-red-700" 
                : "bg-green-100 border-l-4 border-green-500 text-green-700"
            }`}>
              <p>{message.text}</p>
            </div>
          )}

          {/* Matière enseignée */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-gray-800">Matière enseignée</h3>
              <FaBook className="text-orange-600 text-2xl" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{matiere}</p>
          </div>

          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <>
              {/* Classes assignées */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Groupes assignés</h3>
                  <FaUsers className="text-orange-600 text-2xl" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.length > 0 ? (
                    classes.map((classe, index) => (
                      <div key={index} className="bg-orange-50 p-4 rounded-lg shadow hover:shadow-md">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{classe.level} {classe.group}</h4>
                          <button
                            onClick={() => navigate(`/enseignant/eleves/${classe.id}`)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded text-sm"
                          >
                            Voir élèves
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Salle: {classe.room_number}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Aucune classe assignée</p>
                  )}
                </div>
              </div>

              {/* Emploi du temps */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Emploi du temps</h3>
                  <FaCalendarAlt className="text-orange-600 text-2xl" />
                </div>
                
                <div className="space-y-2">
                  {schedule.length > 0 ? (
                    schedule.map((item, index) => (
                      <div key={index} className="bg-orange-50 p-3 rounded-lg shadow hover:shadow-md">
                        <p className="font-medium">{item.day} - {item.time}</p>
                        <p className="text-sm text-gray-600">Salle: {item.room} | Classe: {item.class}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Aucun cours programmé</p>
                  )}
                </div>
              </div>

              {/* Exercices */}
              <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Exercices assignés</h3>
                    <p className="text-sm text-gray-600">Total: {exercises.length} exercices</p>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg"
                  >
                    <FaPlus className="text-sm" />
                    <span>Ajouter</span>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {exercises.length > 0 ? (
                    exercises.map((exercise) => (
                      <div key={exercise.id} className="bg-orange-50 p-3 rounded-lg shadow hover:shadow-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{exercise.title}</h4>
                            <p className="text-sm text-gray-600">Classe: {exercise.class_id || "Non définie"}</p>
                          </div>
                          <button
                            onClick={() => navigate(`/enseignant/exercice/${exercise.id}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Détails
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">Aucun exercice assigné</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modal pour ajouter un exercice */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Nouvel exercice</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={newExercise.title}
                  onChange={(e) => setNewExercise({...newExercise, title: e.target.value})}
                  placeholder="Titre de l'exercice"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                  placeholder="Description de l'exercice..."
                ></textarea>
              </div>
              
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={newExercise.class_id}
                  onChange={(e) => setNewExercise({...newExercise, class_id: e.target.value})}
                >
                  <option value="">Sélectionner une classe</option>
                  {classes.map((classe, index) => (
                    <option key={index} value={classe.id}>
                      {classe.level} {classe.group}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddExercise}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  disabled={!newExercise.title || !newExercise.deadline || !newExercise.class_id}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardEnseignant;