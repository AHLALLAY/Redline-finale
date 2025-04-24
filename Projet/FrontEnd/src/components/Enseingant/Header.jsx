const Header = () => {
    return (
      <header className="bg-orange-400 shadow-md">
        <nav className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-orange-500 font-bold">E</span>
              </div>
              <div className="text-white">
                <p className="text-sm">Bienvenue</p>
                <h2 className="font-semibold">Enseingant</h2>
              </div>
            </div>
            <button className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Déconnexion
            </button>
          </div>
        </nav>
      </header>
    );
  };
  
  export default Header;