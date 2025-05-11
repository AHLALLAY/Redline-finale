import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaIdCard, FaPhone, FaGraduationCap, FaBook, FaUsers, FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user')) || {};

  const logout = useCallback(() => {
    localStorage.clear();
    navigate('/login/staff');
  }, [navigate]);

  return (
    <header className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white fixed top-0 left-0 right-0 z-50 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/enseignant/dashboard')} className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-900">Ω</span>
              <span className="text-xl font-bold hidden sm:inline-block">MEGA SCHOOL</span>
            </button>
          </div>
          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="text-sm">
              <p className="font-medium">{userData.name}</p>
              <p className="text-xs text-orange-200">{userData.role}</p>
            </div>
            <button onClick={logout} className="bg-white text-orange-600 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProfileCard() {
  const userData = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-orange-100 p-3 rounded-full">
          <FaChalkboardTeacher className="text-orange-600 text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-orange-600 font-medium">{userData.subject_name}</p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <div className="flex items-center space-x-3">
          <FaIdCard className="text-gray-500" />
          <span className="text-sm md:text-base">CIN: {userData.cin}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaPhone className="text-gray-500" />
          <span className="text-sm md:text-base">{userData.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaGraduationCap className="text-gray-500" />
          <span className="text-sm md:text-base">{userData.last_diploma}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaBook className="text-gray-500" />
          <span className="text-sm md:text-base">Niveau: {userData.level}</span>
        </div>
      </div>
    </div>
  );
}

function ClassesCard() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user')) || {};


  const displayMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      if (!userData.id) {
        displayMessage("error", "ID enseignant non trouvé");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/prof/classes/${userData.id}`);
        if (response.ok) {
          const data = await response.json();
          setClasses(data.classes || []);
        } else {
          displayMessage("error", "Erreur de chargement des classes");
        }
      } catch (error) {
        displayMessage("error", "Erreur de connexion :" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [userData.id]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Groupes assignés</h3>
        <div className="bg-orange-100 p-2 rounded-full">
          <FaUsers className="text-orange-600 text-xl" />
        </div>
      </div>

      {message.text && (
        <div className={`p-2 mb-4 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {classes.length > 0 ? (
            classes.map((classe) => (
              <div key={classe.id} className="border border-orange-200 rounded-lg p-3 md:p-4 hover:bg-orange-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm md:text-base">{classe.level} {classe.group}</h4>
                  <button
                    onClick={() => navigate(`/enseignant/eleves/${classe.id}`)}
                    className="bg-orange-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm"
                  >
                    Voir élèves
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Aucun groupe assigné</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScheduleCard() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const userData = JSON.parse(localStorage.getItem('user')) || {};


  const displayMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userData.id) {
        displayMessage("error", "ID enseignant non trouvé");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/prof/timetable/${userData.id}`);
        if (response.ok) {
          const data = await response.json();
          setSchedule(data.schedule || []);
        } else {
          displayMessage("error", "Erreur de chargement de l'emploi du temps");
        }
      } catch (error) {
        displayMessage("error", "Erreur de connexion : " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userData.id]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Emploi du temps</h3>
        <div className="bg-orange-100 p-2 rounded-full">
          <FaCalendarAlt className="text-orange-600 text-xl" />
        </div>
      </div>

      {message.text && (
        <div className={`p-2 mb-4 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-center text-xl font-bold text-orange-700">{schedule.length}</p>
            <p className="text-center text-sm text-gray-600">Cours par semaine</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(day => {
              const coursCount = schedule.filter(item =>
                item.day.toLowerCase() === day.toLowerCase()
              ).length;

              return (
                <div key={day} className="flex justify-between items-center p-2 border rounded">
                  <span className="text-xs md:text-sm font-medium">{day}</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                    {coursCount} cours
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ExercisesTable() {
  const [exercises, setExercises] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [newExercise, setNewExercise] = useState({
    title: "",
    description: "",
    class_id: "",
    group: ""
  });

  // Récupérer les données de l'utilisateur
  const userData = JSON.parse(localStorage.getItem('user')) || {};

  // Afficher un message temporaire
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Charger les exercices depuis l'API
  const loadExercises = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/prof/exercices/${userData.id}`);
      const data = await response.json();
      if (response.ok) {
        setExercises(data.exercises || []);
      } else {
        showMessage("error", "Erreur lors du chargement des exercices");
      }
    } catch (error) {
      showMessage("error", "Problème de connexion : "+error);
    }
  },[userData.id]);

  // Charger les classes
  const loadClasses = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/prof/classes/${userData.id}`);
      const data = await response.json();
      if (response.ok) {
        // Filtrer les doublons de classes
        const uniqueClasses = [];
        const seen = new Set();
        
        data.classes.forEach(classe => {
          const key = `${classe.level}-${classe.group}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueClasses.push(classe);
          }
        });
        
        setClasses(uniqueClasses);
      }
    } catch (error) {
      console.error("Erreur de chargement des classes", error);
    }
  },[userData.id]);
  // Basculer le statut d'un exercice
  const toggleStatus = async (exerciseId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/prof/exercice/done/${exerciseId}`,
        { method: "PATCH" }
      );
      
      if (response.ok) {
        loadExercises();
        showMessage("success", "Statut mis à jour");
      } else {
        showMessage("error", "Échec de la mise à jour");
      }
    } catch (error) {
      showMessage("error", "Problème de connexion : "+error);
    }
  };

  // Ajouter un nouvel exercice
  const addExercise = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/prof/exercice/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newExercise.title,
          description: newExercise.description,
          class_id: newExercise.class_id,
          group: newExercise.group,
          teacher_id: userData.id,
          is_done: false,
          done_at: null
        })
      });

      if (response.ok) {
        showMessage("success", "Exercice ajouté !");
        loadExercises();
        setShowModal(false);
        setNewExercise({
          title: "",
          description: "",
          class_id: "",
          group: ""
        });
      } else {
        showMessage("error", "Erreur lors de l'ajout");
      }
    } catch (error) {
      showMessage("error", "Problème de connexion : "+error);
    }
  };

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([loadExercises(), loadClasses()]);
      setLoading(false);
    };

    if (userData.id) {
      loadData();
    } else {
      showMessage("error", "ID enseignant manquant");
    }
  }, [loadExercises,loadClasses, userData.id]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Exercices Assignés</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Nouvel exercice
        </button>
      </div>

      {/* Messages d'alerte */}
      {message.text && (
        <div className={`p-3 mb-4 rounded-lg ${message.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {message.text}
        </div>
      )}

      {/* Chargement */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        /* Tableau des exercices */
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-4 py-3 text-left text-orange-800">Titre</th>
                <th className="px-4 py-3 text-left text-orange-800">Classe</th>
                <th className="px-4 py-3 text-left text-orange-800">Date</th>
                <th className="px-4 py-3 text-left text-orange-800">Statut</th>
                <th className="px-4 py-3 text-left text-orange-800">Corrigé le</th>
                <th className="px-4 py-3 text-left text-orange-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.length > 0 ? (
                exercises.map((ex) => (
                  <tr key={ex.id} className="border-b hover:bg-orange-50">
                    <td className="px-4 py-3">{ex.title}</td>
                    <td className="px-4 py-3">{ex.level} {ex.group}</td>
                    <td className="px-4 py-3">{new Date(ex.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${ex.status === "done" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                        {ex.status === "done" ? "Corrigé" : "À corriger"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {ex.correction_date ? new Date(ex.correction_date).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(ex.id)}
                        className={`px-3 py-1 rounded text-sm ${ex.status === "done" ? "bg-gray-200 text-gray-700" : "bg-orange-600 text-white"}`}
                      >
                        {ex.status === "done" ? "Annuler" : "Terminer"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                    Aucun exercice trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal d'ajout d'un exercice */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-bold">Ajouter un exercice</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={addExercise} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Titre*</label>
                <input
                  type="text"
                  value={newExercise.title}
                  onChange={(e) => setNewExercise({...newExercise, title: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description*</label>
                <textarea
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                  rows="3"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Classe*</label>
                  <select
                    value={newExercise.class_id}
                    onChange={(e) => setNewExercise({...newExercise, class_id: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Choisir...</option>
                    {classes.map((classe) => (
                      <option key={classe.id} value={classe.id}>{classe.level}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Groupe*</label>
                  <select
                    value={newExercise.group}
                    onChange={(e) => setNewExercise({...newExercise, group: e.target.value})}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Choisir...</option>
                    <option value="A">Groupe A</option>
                    <option value="B">Groupe B</option>
                    <option value="C">Groupe C</option>
                    <option value="D">Groupe D</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardEnseignant() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100">
      <Header />

      <main className="flex-1 p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-6">Tableau de bord</h2>

          {/* Section profil */}
          <div className="mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <ProfileCard />
            <ClassesCard />
            <ScheduleCard />
          </div>

          <ExercisesTable />
        </div>
      </main>
    </div>
  );
}

export default DashboardEnseignant;