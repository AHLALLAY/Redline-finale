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

// Filter
function Filter({ onFilterChange }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    subject: "",
    searchName: ""
  });

  const toggle = () => setOpen(!open);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters({ ...filters, [name]: value });
  };

  const reset = () => {
    const resetFilters = { role: "", subject: "", searchName: "" };
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
                placeholder="Nom du personnel..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                name="role"
                value={filters.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Tous les rôles</option>
                <option value="Admin">Admin</option>
                <option value="Secrétaire">Secrétaire</option>
                <option value="Enseignant">Enseignant</option>
                <option value="Comptable">Comptable</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matière
              </label>
              <select
                name="subject"
                value={filters.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Toutes les matières</option>
                <option value="Langue Arabe">Langue Arabe</option>
                <option value="Langue Française">Langue Française</option>
                <option value="Langue Anglaise">Langue Anglaise</option>
                <option value="Éducation Islamique">Éducation Islamique</option>
                <option value="Mathématiques">Mathématiques</option>
                <option value="Activité Scientifique">Activité Scientifique</option>
                <option value="Informatique">Informatique</option>
                <option value="Sciences Sociales">Sciences Sociales</option>
                <option value="Éducation Artistique">Éducation Artistique</option>
                <option value="Éducation Physique">Éducation Physique</option>
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

// Add Staff ModaL
function AddStaff({ onStaffAdded }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cin: "",
    email: "",
    password: "",
    role: "",
    birth_date: "",
    phone: "",
    last_diploma: "",
    obtained_at: "",
    subject_id: "",
    teaching_level: ""
  });


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs requis
    if (!formData.name || !formData.cin || !formData.email || !formData.password ||
      !formData.role || !formData.birth_date || !formData.last_diploma || !formData.obtained_at) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const dataToSend = {
      name: formData.name,
      cin: formData.cin,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      birth_date: formData.birth_date,
      phone: formData.phone || null,
      last_diploma: formData.last_diploma,
      obtained_at: formData.obtained_at,
      is_suspended: false,
      is_deleted: false,

      ...(formData.role === "Enseignant" && {
        subject_id: formData.subject_id,
        teaching_level: formData.teaching_level
      })
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/staff", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();

      if (data.status === "success") {
        setOpen(false);
        setFormData({
          name: "",
          cin: "",
          email: "",
          password: "",
          role: "",
          birth_date: "",
          phone: "",
          last_diploma: "",
          obtained_at: "",
          subject_id: "",
          teaching_level: ""
        });
        onStaffAdded();
      } else {
        alert(data.message || "Erreur lors de l'ajout du personnel");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur de connexion au serveur. Veuillez vérifier votre connexion ou contacter l'administrateur.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition shadow hover:shadow-md"
      >
        <FaPlus />
        <span>Nouveau personnel</span>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-800">Ajouter un nouveau membre du personnel</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Informations personnelles */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-orange-700 mb-3">Informations personnelles</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Nom complet*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        required
                        maxLength={50}
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
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        required
                        maxLength={9}
                      />
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
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        required
                        maxLength={70}
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
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        required
                        minLength={8}
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
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">Téléphone</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        pattern="^(\+212|0)[\s\-\.]?[5-7][\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}$"
                        title="Format de téléphone marocain valide requis"
                      />
                    </div>
                  </div>
                </div>

                {/* Informations professionnelles */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-orange-700 mb-3">Informations professionnelles</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="role" className="block text-sm text-gray-700 mb-1">Rôle*</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        required
                      >
                        <option value="">Choisir...</option>
                        <option value="Admin">Admin</option>
                        <option value="Secrétaire">Secrétaire</option>
                        <option value="Enseignant">Enseignant</option>
                        <option value="Comptable">Comptable</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="last_diploma" className="block text-sm text-gray-700 mb-1">Dernier diplôme*</label>
                      <input
                        type="text"
                        id="last_diploma"
                        name="last_diploma"
                        value={formData.last_diploma}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="obtained_at" className="block text-sm text-gray-700 mb-1">Date d'obtention*</label>
                      <input
                        type="date"
                        id="obtained_at"
                        name="obtained_at"
                        value={formData.obtained_at}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
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
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
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

// Staff Card
function StaffCard({ staff }) {
  const navigate = useNavigate();

  const viewDetails = () => {
    navigate(`/admin/staff/${staff.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:-translate-y-1">
      <h3 className="font-semibold text-lg text-orange-800 mb-2">{staff.name}</h3>
      <div className="text-gray-600 space-y-1">
        <p className="text-sm">Rôle: <span className="font-medium">{staff.role}</span></p>
        {staff.role === "Enseignant" && (
          <p className="text-sm">Matière: <span className="font-medium">{staff.subject?.name || 'N/A'}</span></p>
        )}
        <p className="text-sm">CIN: <span className="font-medium">{staff.cin}</span></p>
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
function StaffList() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: "",
    subject: "",
    searchName: ""
  });

  const fetchStaffMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/staff", {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await response.json();

      if (data.status === "success") {
        setStaffMembers(data.data);
      } else {
        setStaffMembers([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du personnel:", error);
      setStaffMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredStaffMembers = staffMembers.filter(staff => {
    const nameMatch = !filters.searchName ||
      staff.name.toLowerCase().includes(filters.searchName.toLowerCase());
    const roleMatch = !filters.role || staff.role === filters.role;
    const subjectMatch = !filters.subject ||
      (staff.subject && staff.subject.name === filters.subject);

    return nameMatch && roleMatch && subjectMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <Header />

      <main className="flex-1 p-4 md:p-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Gestion du personnel
          </h2>

          <div className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Liste du personnel</h3>

              <div className="flex space-x-4">
                <Filter onFilterChange={handleFilterChange} />
                <AddStaff onStaffAdded={fetchStaffMembers} />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              </div>
            ) : filteredStaffMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredStaffMembers.map(staff => (
                  <StaffCard key={staff.id} staff={staff} />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <p>Aucun membre du personnel trouvé. Utilisez le bouton "Nouveau personnel" pour en ajouter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default StaffList;