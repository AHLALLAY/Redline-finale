import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaPlus, FaEye, FaFilter, FaMale, FaFemale } from "react-icons/fa";

// Composant principal
export default function StaffList() {
  // États principaux
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // États pour les filtres
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [levels, setLevels] = useState([]);

  // États pour le modal d'ajout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
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

  // Notification
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });

  // Charger les données des staffs
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/staff');
        if (!response.ok) throw new Error('Erreur de chargement');
        
        const data = await response.json();
        if (data.status === 'success') {
          setStaffs(data.data);
          
          // Extraire les niveaux uniques
          const uniqueLevels = [...new Set(data.data.map(s => s.level))];
          setLevels(uniqueLevels);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filtrer les staffs
  const filteredStaffs = staffs.filter(staff => {
    return selectedLevel === "all" || staff.level === selectedLevel;
  });

  // Gestion des actions
  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login/staff");
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type, visible: true });
    setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!newStaff.name || !newStaff.email || !newStaff.level) {
      showNotification('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
  
    try {
      const staffData = {
        name: newStaff.name,
        email: newStaff.email,
        password: newStaff.password, // "123456789" par défaut
        birth_date: newStaff.birth_date,
        birth_place: newStaff.birth_place,
        gender: newStaff.gender,
        level: newStaff.level,
        parent: newStaff.parent,
        cin: newStaff.cin,
        address: newStaff.address,
        phone: newStaff.phone
      };
  
      // Appel API
      const response = await fetch('http://127.0.0.1:8000/api/register/staff', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(staffData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'ajout du membre du staff');
      }
  
      // Succès
      showNotification('Membre du staff ajouté avec succès', 'success');
      setIsModalOpen(false);
      
      // Réinitialisation du formulaire
      setNewStaff({
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
  
      fetchStaffs();
  
    } catch (err) {
      console.error('Erreur:', err);
      showNotification(err.message || 'Une erreur est survenue', 'error');
    }
  };
  
  const fetchStaffs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/staff');
      if (!response.ok) throw new Error('Erreur de chargement');
      
      const data = await response.json();
      if (data.status === 'success') {
        setStaffs(data.data);
        
        const uniqueLevels = [...new Set(data.data.map(s => s.level))];
        setLevels(uniqueLevels);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Affichage conditionnel
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorScreen message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-orange-50">
      <Header 
        onBack={() => navigate("/admin/dashboard")} 
        onLogout={handleLogout}
      />
      
      <Notification 
        message={notification.message} 
        type={notification.type} 
        visible={notification.visible} 
      />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-orange-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold text-orange-800">
                Liste des membres du staff ({filteredStaffs.length})
              </h2>
              
              <div className="flex flex-wrap gap-2">
                <FilterButton 
                  isActive={filterOpen || selectedLevel !== "all"}
                  onClick={() => setFilterOpen(!filterOpen)}
                />
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaPlus /> Nouveau membre
                </button>
              </div>
            </div>
            
            {filterOpen && (
              <FilterPanel
                levels={levels}
                selectedLevel={selectedLevel}
                onLevelChange={setSelectedLevel}
                onReset={() => {
                  setSelectedLevel("all");
                }}
              />
            )}
          </div>
          
          <StaffGrid 
            staffs={filteredStaffs} 
            onViewDetails={(id) => showNotification(`Affichage des détails pour le membre ${id}`, 'info')}
          />
        </div>
      </main>
      
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        staff={newStaff}
        onChange={(e) => setNewStaff({...newStaff, [e.target.name]: e.target.value})}
        onSubmit={handleSubmit}
        levels={levels}
      />
    </div>
  );
}

function Header({ onBack, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="text-3xl font-bold text-orange-600 mr-2 hover:text-orange-700"
              title="Retour au tableau de bord"
            >
              Ω
            </button>
            <h1 className="text-xl font-bold text-orange-600">OMEGA SCHOOL</h1>
          </div>
          
          <div className="hidden md:block">
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Déconnexion
            </button>
          </div>
          
          <button
            className="md:hidden text-gray-600 p-2 rounded-lg hover:bg-orange-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 pt-2 border-t border-orange-200">
            <button
              onClick={onLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function FilterButton({ isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        isActive ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <FaFilter />
      <span>Filtres</span>
      {isActive && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
    </button>
  );
}

function FilterPanel({ levels, selectedLevel, onLevelChange, onReset }) {
  return (
    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
          <select
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les niveaux</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}

function StaffGrid({ staffs, onViewDetails }) {
  if (staffs.length === 0) {
    return <div className="p-8 text-center text-gray-500">Aucun membre du staff trouvé</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {staffs.map(staff => (
        <StaffCard key={staff.id} staff={staff} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}

function StaffCard({ staff, onViewDetails }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-l-4 border-orange-400">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className={`mr-2 ${staff.gender === 'Masculin' ? 'text-blue-500' : 'text-pink-500'}`}>
            {staff.gender === 'Masculin' ? <FaMale /> : <FaFemale />}
          </span>
          <h3 className="font-semibold text-gray-800">{staff.name}</h3>
        </div>
        
        <button
          onClick={() => onViewDetails(staff.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
          title="Voir les détails"
        >
          <FaEye />
        </button>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Niveau:</span>
          <span>{staff.level || "N/A"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{staff.email || "N/A"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Téléphone:</span>
          <span>{staff.phone || "N/A"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Ajouté le:</span>
          <span>{formatDate(staff.created_at)}</span>
        </div>
      </div>
    </div>
  );
}

function AddStaffModal({ isOpen, onClose, staff, onChange, onSubmit, levels }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Ajouter un membre du staff</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Informations de base */}
              <div className="space-y-3">
                <h4 className="font-medium text-orange-700">Informations personnelles</h4>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Nom complet*</label>
                  <input
                    type="text"
                    name="name"
                    value={staff.name}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Genre*</label>
                    <select
                      name="gender"
                      value={staff.gender}
                      onChange={onChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="Masculin">Masculin</option>
                      <option value="Féminin">Féminin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Date de naissance*</label>
                    <input
                      type="date"
                      name="birth_date"
                      value={staff.birth_date}
                      onChange={onChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={staff.email}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Niveau*</label>
                  <select
                    name="level"
                    value={staff.level}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Sélectionner</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Informations supplémentaires */}
              <div className="space-y-3">
                <h4 className="font-medium text-orange-700">Informations supplémentaires</h4>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Lieu de naissance</label>
                  <input
                    type="text"
                    name="birth_place"
                    value={staff.birth_place}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Parent</label>
                  <input
                    type="text"
                    name="parent"
                    value={staff.parent}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">CIN</label>
                  <input
                    type="text"
                    name="cin"
                    value={staff.cin}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={staff.address}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Téléphone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={staff.phone}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Notification({ message, type, visible }) {
  if (!visible) return null;
  
  const colors = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700'
  };
  
  return (
    <div className={`fixed top-20 right-4 p-4 rounded-lg border-l-4 shadow-md ${colors[type]}`}>
      {message}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-md text-center">
        <h3 className="font-bold text-lg mb-2">Erreur</h3>
        <p className="mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
// Les composants Header restent identiques
// à ceux du composant StudentList et peuvent être réutilisés tels quels