import FooterGlobal from '../../components/Global/FooterGlobal';

function LoginStaff() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
                {/* Formulaire de connexion */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <fieldset className="border border-gray-300 rounded-lg p-6 shadow-md bg-white">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Connexion</h3>
                                <button type="button" className="text-gray-500 hover:text-gray-700 text-xl">
                                    &times;
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Mot de Passe <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Connexion
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>

                {/* Image */}
                <div className="hidden md:block md:w-1/2 bg-gray-200">
                    <img 
                        src="/img/3.jpg" 
                        alt="notre ecole" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <FooterGlobal />
        </div>
    );
}

export default LoginStaff;