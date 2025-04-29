import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaPlus, FaEye, FaFilter } from "react-icons/fa";

const StudentListe = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filtres
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");

  // Listes pour les filtres
  const [levels, setLevels] = useState([]);
  const [groups, setGroups] = useState([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    level: "",
    group: "",
    address: "",
    phone: "",
    parent: ""
  });

  const navigate = useNavigate();

  const getStudentList = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/students');

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Données reçues:", JSON.stringify(result.data, null, 2));

      if (result.status === 'success' && Array.isArray(result.data)) {
        setStudents(result.data);
        setFilteredStudents(result.data);

        // Extraire les niveaux uniques des données
        const uniqueLevels = [...new Set(result.data.map(student => student.level))];
        setLevels(uniqueLevels);

        // Extraire les groupes uniques des données
        const uniqueGroups = [...new Set(result.data
          .map(student => student.group)
          .filter(group => group !== null && group !== undefined))];
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

  useEffect(() => {
    getStudentList();
  }, []);

  // Filtre les étudiants lorsque les filtres changent
  useEffect(() => {
    const applyFilters = () => {
      let results = [...students];

      // Appliquer le filtre de niveau
      if (selectedLevel !== "all") {
        results = results.filter(student => student.level === selectedLevel);
      }

      // Appliquer le filtre de groupe
      if (selectedGroup !== "all") {
        results = results.filter(student => student.group === selectedGroup);
      }

      setFilteredStudents(results);
    };

    applyFilters();
  }, [selectedLevel, selectedGroup, students]);

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
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Élève ajouté:", result);

      // Fermer le modal et rafraîchir la liste
      setIsModalOpen(false);
      getStudentList();

      // Réinitialiser le formulaire
      setNewStudent({
        name: "",
        birth_date: "",
        birth_place: "",
        level: "",
        group: "",
        address: "",
        phone: "",
        parent: ""
      });

    } catch (err) {
      console.error("Erreur lors de l'ajout:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md max-w-lg">
          <p className="font-bold text-xl mb-2">Erreur</p>
          <p className="mb-4">{error}</p>
          <button
            onClick={getStudentList}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-300 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <button
                  onClick={handleBack}
                  className="text-3xl font-bold text-green-600 mr-2 hover:opacity-80 transition-opacity"
                >
                  Ω
                </button>
                <h1 className="text-xl font-bold text-green-600">OMEGA SCHOOL</h1>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-300"
              >
                Déconnexion
              </button>
            </div>

            <button
              className="md:hidden text-gray-800 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4 shadow-lg animate-fadeIn">
            <button
              onClick={handleLogout}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition duration-300"
            >
              Déconnexion
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Table Header and Filters */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                Liste des élèves
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {filteredStudents.length}/{students.length}
                </span>
              </h2>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition duration-300"
                >
                  <FaFilter />
                  <span>Filtres</span>
                  {(selectedLevel !== "all" || selectedGroup !== "all") && (
                    <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  <FaPlus />
                  <span>Nouvel élève</span>
                </button>
              </div>
            </div>

            {/* Zone de filtres */}
            {filterOpen && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="levelFilter" className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau
                    </label>
                    <select
                      id="levelFilter"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="all">Tous les niveaux</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="groupFilter" className="block text-sm font-medium text-gray-700 mb-1">
                      Groupe
                    </label>
                    <select
                      id="groupFilter"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="all">Tous les groupes</option>
                      {groups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 flex items-end">
                    <button
                      onClick={resetFilters}
                      className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md transition duration-200"
                    >
                      Réinitialiser
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Aucun élève ne correspond à vos critères.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-green-600 hover:text-green-800 underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Niveau
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Groupe
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Adresse
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Téléphone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date Inscription
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`hover:bg-gray-50 transition duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.level}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.group || "Non assigné"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{student.parent}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(student.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-2 rounded-full transition duration-300"
                          title="Voir les détails"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Ajouter un nouvel élève</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* student info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="rounded-lg p-4 bg-gray-100">
                    <h2 className="mb-5 font-semibold">Elève</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        value={newStudent.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div className="flex space-x-4 mb-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de Naissance</label>
                        <input
                          type="text"
                          name="birth_date"
                          value={newStudent.birth_date}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de Naissance</label>
                        <input
                          type="text"
                          name="birth_place"
                          value={newStudent.birth_place}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 mb-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                        <select
                          name="level"
                          value={newStudent.level}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                          required
                        >
                          <option value="">Sélectionner un niveau</option>
                          {levels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>

                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Groupe</label>
                        <select
                          name="group"
                          value={newStudent.group}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Sélectionner un groupe</option>
                          {groups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Parent info */}
                  <div className="rounded-lg p-4 bg-gray-100">
                    <h2 className="mb-5 font-semibold">Parent</h2>
                    <div className="flex space-x-4 mb-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
                        <input
                          type="text"
                          name="parent"
                          value={newStudent.parent}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
                        <input
                          type="text"
                          name="cin"
                          value={newStudent.cin}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={newStudent.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newStudent.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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
};

export default StudentListe;