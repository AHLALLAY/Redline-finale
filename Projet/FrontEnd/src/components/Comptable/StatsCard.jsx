import { useState, useEffect } from "react";

function StatsCard({ type, month: propMonth }) {
  const [bgColor, setBgColor] = useState('');
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [change, setChange] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currentMonth = new Date().getMonth() + 1;
  const monthToUse = propMonth || currentMonth;

  console.log(monthToUse);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/accountant/journal/statistics/${monthToUse}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data)

        if (data.status === "success") {
          if (type === "charge") {
            setTitle("Total Charges");
            setValue(`${data.data.charges.stats.total} ${data.data.currency}`); // Utilisation du total plutôt que la moyenne
            setBgColor('bg-red-100');
            setChange(`${data.data.charges.stats.count} charges du mois (${data.data.month})`);
            setIcon(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>);
          } else if (type === "produit") {
            setTitle("Total Produits");
            setValue(`${data.data.produit.stats.total} ${data.data.currency}`); // Utilisation du total plutôt que la moyenne
            setBgColor('bg-green-100');
            setChange(`${data.data.produit.stats.count} produits du mois (${data.data.month})`);
            setIcon(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, monthToUse]);

  if (loading) return <div className="bg-white p-6 rounded-lg shadow-md">Chargement...</div>;
  if (error) return <div className="bg-white p-6 rounded-lg shadow-md text-red-500">Erreur: {error}</div>;

  const textColor = bgColor.includes('green') ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          {icon}
        </div>
      </div>
      <p className={`${textColor} text-sm mt-2`}>{change}</p>
    </div>
  );
}

export default StatsCard;