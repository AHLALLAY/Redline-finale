import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaIdCard, FaPhone, FaGraduationCap, FaBook, FaUsers, FaCalendarAlt, FaPlus } from "react-icons/fa";

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
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <p className="font-medium">{userData.name}</p>
              <p className="text-xs text-orange-200">{userData.role}</p>
            </div>
            <button onClick={logout} className="bg-white text-orange-600 px-3 py-1 rounded-lg text-sm font-semibold">
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
    <div className="bg-white rounded-lg shadow-md p-6">
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
          <span>CIN: {userData.cin}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaPhone className="text-gray-500" />
          <span>{userData.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaGraduationCap className="text-gray-500" />
          <span>{userData.last_diploma}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaBook className="text-gray-500" />
          <span>Niveau: {userData.level}</span>
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
  const teacherId = userData.id;

  const displayMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) {
        displayMessage("error", "ID enseignant non trouvé");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/prof/classes/${teacherId}`);
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
  }, [teacherId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
              <div key={classe.id} className="border border-orange-200 rounded-lg p-4 hover:bg-orange-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold">{classe.level} {classe.group}</h4>
                  <button
                    onClick={() => navigate(`/enseignant/eleves/${classe.id}`)}
                    className="bg-orange-600 text-white px-3 py-1 rounded text-sm"
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
// emploi de temps
function ScheduleCard() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const teacherId = userData.id;

  const displayMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!teacherId) {
        displayMessage("error", "ID enseignant non trouvé");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/prof/timetable/${teacherId}`);
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
  }, [teacherId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
                  <span className="text-sm font-medium">{day}</span>
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
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState({
    title: '',
    description: '',
    class_id: ''
  });

  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const teacherId = userData.id;

  const displayMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const fetchExercises = useCallback(async () => {
    if (!teacherId) {
      displayMessage("error", "ID enseignant non trouvé");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/prof/exercices/${teacherId}`);
      if (response.ok) {
        const data = await response.json();
        setExercises(data.data || []);
      } else {
        displayMessage("error", "Erreur de chargement des exercices");
      }
    } catch (error) {
      displayMessage("error", "Erreur de connexion : " + error);
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const handleAddExercise = async () => {
    if (!teacherId) {
      displayMessage("error", "ID enseignant non trouvé");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/prof/exercice/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token') || userData.token}`
        },
        body: JSON.stringify({
          ...newExercise,
          teacher_id: teacherId
        }),
      });

      if (response.ok) {
        displayMessage("success", "Exercice ajouté avec succès");
        setShowModal(false);
        setNewExercise({ title: '', description: '', class_id: '' });
        fetchExercises();
      } else {
        displayMessage("error", "Erreur lors de l'ajout");
      }
    } catch (error) {
      displayMessage("error", "Erreur de connexion : " + error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Exercices</h3>
            <p className="text-sm text-gray-600">Total: {exercises.length}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            <FaPlus />
            <span>Nouvel exercice</span>
          </button>
        </div>

        {message.text && (
          <div className={`p-2 mb-4 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Groupe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date limite</th>
                </tr>
              </thead>
              <tbody>
                {exercises.length > 0 ? (
                  exercises.map((exercise) => (
                    <tr key={exercise.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{exercise.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{exercise.description}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {exercise.class_id || "Non définie"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {exercise.deadline || "Non définie"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      Aucun exercice
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal pour ajouter un exercice */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nouvel exercice</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newExercise.title}
                  onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Groupe*</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newExercise.class_id}
                  onChange={(e) => setNewExercise({ ...newExercise, class_id: e.target.value })}
                  required
                >
                  <option value="">Sélectionner un groupe</option>
                  {/* Les options seraient chargées depuis une API ou un contexte */}
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
                  disabled={!newExercise.title || !newExercise.class_id}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DashboardEnseignant() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>

          {/* Section profil */}
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
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