import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaPlus, FaEye, FaFilter, FaMale, FaFemale } from "react-icons/fa";

// Composants
const Header = ({ onBack, onToggleMenu, mobileMenuOpen, onLogout }) => (
  <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
    <div className="container mx-auto px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Logo et titre */}
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="text-3xl font-bold text-orange-600 mr-2"
            title="Retour au tableau de bord"
          >
            Ω
          </button>
          <h1 className="text-xl font-bold text-orange-600">OMEGA SCHOOL</h1>
        </div>

        {/* Bouton de déconnexion (visible uniquement sur desktop) */}
        <div className="hidden md:flex">
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-300 font-medium"
          >
            Déconnexion
          </button>
        </div>

        {/* Bouton du menu mobile */}
        <button
          className="md:hidden text-gray-700 p-2 rounded-full hover:bg-gray-100"
          onClick={onToggleMenu}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
    </div>

    {/* Menu mobile */}
    {mobileMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 font-medium"
        >
          Déconnexion
        </button>
      </div>
    )}
  </header>
);

// Composant pour les filtres
const FilterPanel = ({ 
  filterOpen, 
  levels, 
  groups, 
  selectedLevel, 
  selectedGroup, 
  onLevelChange, 
  onGroupChange, 
  onReset 
}) => {
  // Si le panneau de filtre n'est pas ouvert, ne rien afficher
  if (!filterOpen) return null;
  
  return (
    <div className="bg-orange-50 p-4 rounded-lg mb-4 border border-orange-100 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Filtre par niveau */}
        <div>
          <label htmlFor="levelFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Niveau
          </label>
          <select
            id="levelFilter"
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les niveaux</option>
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Filtre par groupe */}
        <div>
          <label htmlFor="groupFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Groupe
          </label>
          <select
            id="groupFilter"
            value={selectedGroup}
            onChange={(e) => onGroupChange(e.target.value)}
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les groupes</option>
            {groups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Bouton de réinitialisation */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md transition duration-200"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

// Carte d'étudiant
const StudentCard = ({ student, onViewGrades }) => {
  // Formatter la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-l-4 border-orange-400">
      <div className="flex items-start justify-between">
        {/* Nom et icône de genre */}
        <div className="flex items-center mb-2">
          <span className={`mr-2 ${student.gender === 'Masculin' ? 'text-blue-500' : 'text-pink-500'}`}>
            {student.gender === 'Masculin' ? <FaMale size={18} /> : <FaFemale size={18} />}
          </span>
          <h3 className="font-semibold text-gray-800">{student.name}</h3>
        </div>
        
        {/* Bouton pour voir les notes */}
        <button
          onClick={() => onViewGrades(student.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
          title="Voir les notes"
        >
          <FaEye size={16} />
        </button>
      </div>
      
      {/* Infos de l'étudiant */}
      <div className="mt-3 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Niveau:</span> 
          <span>{student.level}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Groupe:</span> 
          <span>{student.group || "Non assigné"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Date de naissance:</span> 
          <span>{student.birth_date ? formatDate(student.birth_date) : "N/A"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Inscription:</span> 
          <span>{formatDate(student.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

// Grille de cartes pour les étudiants
const StudentGrid = ({ students, onViewGrades }) => {
  if (students.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Aucun élève ne correspond à vos critères.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {students.map((student) => (
        <StudentCard 
          key={student.id} 
          student={student} 
          onViewGrades={onViewGrades} 
        />
      ))}
    </div>
  );
};

// Composant pour le formulaire d'ajout d'élève
const StudentModal = ({ isOpen, onClose, student, onChange, onSubmit, levels }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Ajouter un nouvel élève</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Informations de l'élève */}
              <div className="rounded-lg p-4 bg-orange-50 space-y-4 border border-orange-100">
                <h2 className="font-semibold text-orange-700">Informations de l'élève</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet*</label>
                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                  <input
                    type="text"
                    name="password"
                    value={student.password}
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Mot de passe par défaut: 123456789</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de Naissance*</label>
                    <input
                      type="date"
                      name="birth_date"
                      value={student.birth_date}
                      onChange={onChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de Naissance*</label>
                    <input
                      type="text"
                      name="birth_place"
                      value={student.birth_place}
                      onChange={onChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre*</label>
                  <select
                    name="gender"
                    value={student.gender}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau*</label>
                  <select
                    name="level"
                    value={student.level}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Sélectionner un niveau</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Informations du parent */}
              <div className="rounded-lg p-4 bg-orange-50 space-y-4 border border-orange-100">
                <h2 className="font-semibold text-orange-700">Informations du parent</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du parent*</label>
                  <input
                    type="text"
                    name="parent"
                    value={student.parent}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
                  <input
                    type="text"
                    name="cin"
                    value={student.cin}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse*</label>
                  <input
                    type="text"
                    name="address"
                    value={student.address}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={student.phone}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Composants pour l'état de chargement
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-orange-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600"></div>
      <p className="mt-4 text-gray-600">Chargement des données...</p>
    </div>
  </div>
);

// Composant pour afficher une erreur
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-orange-50">
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md max-w-lg">
      <p className="font-bold text-xl mb-2">Erreur</p>
      <p className="mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Réessayer
      </button>
    </div>
  </div>
);

// Composant pour les notifications
const Notification = ({ message, type, visible }) => {
  if (!visible) return null;
  
  const bgColor = type === 'success' ? 'bg-green-100 border-green-500 text-green-700' :
                 type === 'error' ? 'bg-red-100 border-red-500 text-red-700' :
                 'bg-blue-100 border-blue-500 text-blue-700';
  
  return (
    <div className={`fixed top-20 right-4 p-4 rounded-md shadow-md border-l-4 animate-fadeIn ${bgColor}`}>
      <p>{message}</p>
    </div>
  );
};

// Composant principal
const StudentList = () => {
  // États pour les données
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [levels, setLevels] = useState([]);
  const [groups, setGroups] = useState([]);
  
  // États pour l'interface utilisateur
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État pour les notifications
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    visible: false
  });
  
  // État pour le nouvel étudiant
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "123456789",
    birth_date: "",
    birth_place: "",
    gender: "",
    level: "",
    parent: "",
    cin: "",
    address: "",
    phone: ""
  });

  // Hook de navigation
  const navigate = useNavigate();

  // Fonction pour afficher une notification
  const showNotification = (message, type = 'info') => {
    setNotification({
      message,
      type,
      visible: true
    });
    
    // Masquer la notification après 3 secondes
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Récupère les données des étudiants
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/students');

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success' && Array.isArray(result.data)) {
        // Extraire les données
        setStudents(result.data);
        setFilteredStudents(result.data);

        // Extraire les niveaux et groupes uniques
        const uniqueLevels = [...new Set(result.data.map(student => student.level))];
        setLevels(uniqueLevels);

        const uniqueGroups = [...new Set(result.data.map(student => student.group))];
        setGroups(uniqueGroups.sort());
      } else {
        throw new Error('Format de réponse API inattendu');
      }
    } catch (err) {
      setError(err.message);
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchStudents();
  }, []);

  // Filtrer les étudiants quand les filtres changent
  useEffect(() => {
    let results = [...students];

    if (selectedLevel !== "all") {
      results = results.filter(student => student.level === selectedLevel);
    }

    if (selectedGroup !== "all") {
      results = results.filter(student => student.group === selectedGroup);
    }

    setFilteredStudents(results);
  }, [selectedLevel, selectedGroup, students]);

  // Handlers pour les actions utilisateur
  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login/staff");
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const resetFilters = () => {
    setSelectedLevel("all");
    setSelectedGroup("all");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      setIsModalOpen(false);
      showNotification('Élève ajouté avec succès!', 'success');  
      fetchStudents();
      setNewStudent({
        name: "",
        email: "",
        password: "123456789",
        birth_date: "",
        birth_place: "",
        gender: "",
        level: "",
        parent: "",
        cin: "",
        address: "",
        phone: ""
      });

    } catch (err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    }
  };

  const handleViewGrades = (studentId) => {
    // À implémenter: afficher les notes d'un étudiant
    showNotification('Fonctionnalité à venir: affichage des notes', 'info');
    console.log("Voir les notes de l'étudiant:", studentId);
  };

  // Rendu conditionnel
  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error} onRetry={fetchStudents} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onBack={handleBack}
        onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
        onLogout={handleLogout}
      />

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
      />

      {/* Contenu principal */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* En-tête et filtres */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                Liste des élèves
                <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {filteredStudents.length}/{students.length}
                </span>
              </h2>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaFilter />
                  <span>Filtres</span>
                  {(selectedLevel !== "all" || selectedGroup !== "all") && (
                    <span className="ml-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                  )}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaPlus />
                  <span>Nouvel élève</span>
                </button>
              </div>
            </div>

            {/* Zone de filtres */}
            <FilterPanel
              filterOpen={filterOpen}
              levels={levels}
              groups={groups}
              selectedLevel={selectedLevel}
              selectedGroup={selectedGroup}
              onLevelChange={setSelectedLevel}
              onGroupChange={setSelectedGroup}
              onReset={resetFilters}
            />
          </div>

          {/* Grille d'étudiants */}
          <StudentGrid
            students={filteredStudents}
            onViewGrades={handleViewGrades}
          />
        </div>
      </div>

      {/* Modal d'ajout */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={newStudent}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        levels={levels}
      />
    </div>
  );
};

export default StudentList;