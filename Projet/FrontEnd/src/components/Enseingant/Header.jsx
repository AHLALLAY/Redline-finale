import Logout from "../Global/Logout";

function Header() {
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
          <Logout />
        </div>
      </nav>
    </header>
  );
};

export default Header;