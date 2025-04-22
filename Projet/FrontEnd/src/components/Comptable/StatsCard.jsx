import { useState, useEffect } from "react";

function StatsCard({ type, month }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentMonth = new Date().getMonth() + 1;
  const selectedMonth = month || currentMonth;

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/accountant/journal/statistics/${selectedMonth}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",},
          }
        );

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const result = await response.json();
        if (result.status === "success") {
          setData(result.data);
        } else {
          throw new Error("Données invalides");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [type, selectedMonth]);

  // Affichage pendant le chargement
  if (loading) {
    return <div className="p-6 bg-white rounded shadow">Chargement...</div>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <div className="p-6 bg-white rounded shadow text-red-500">Erreur : {error}</div>;
  }

  // Variables d'affichage
  let title = "";
  let value = "";
  let change = "";



  const currency = data.currency;

  if (type === "charge") {
    const stats = data.charges.stats;
    title = "Total Charges";
    value = `${parseFloat(stats.total).toFixed(2)} ${currency}`;
    change = `${stats.count} charges (${data.month})`;
  } else if (type === "produit") {
    const stats = data.produit.stats;
    title = "Total Produits";
    value = `${parseFloat(stats.total).toFixed(2)} ${currency}`;
    change = `${stats.count} produits (${data.month})`;
  } else if (type === "benefice") {
    const charges = parseFloat(data.charges.stats.total);
    const produits = parseFloat(data.produit.stats.total);
    const benefice = produits - charges;
    const isPositive = benefice >= 0;
    title = "Bénéfice Net";
    value = `${benefice.toFixed(2)} ${currency}`;
    change = isPositive ? `Bénéfice (${data.month})` : `Déficit (${data.month})`;
  }

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md border-l-4 
      ${type === 'charge' ? 'border-red-500' :
        type === 'produit' ? 'border-green-500' :
        'border-blue-500'}
    `}>
      <div className="flex flex-col space-y-2">
        <h4 className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
          {title}
        </h4>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className={`
          text-sm font-medium 
          ${type === 'charge' ? 'text-red-600' :
            type === 'produit' ? 'text-green-600' :
            'text-blue-600'}
        `}>
          {change}
        </p>
      </div>
    </div>
  );
  
}

export default StatsCard;