import { useEffect, useState } from "react";

const RecordTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/accountant/journal/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement");
        }
        return res.json();
      })
      .then((data) => {
        setRecords(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fonction simple pour afficher la date en format jour/mois/année
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>Erreur : {error}</div>;

  return (
    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Journal des Opérations</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f1f1f1" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Référence</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Libellé</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Montant</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Type</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Ressource</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <tr key={item.id} style={{ borderTop: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{formatDate(item.created_at)}</td>
              <td style={{ padding: "10px", fontWeight: "bold" }}>{item.reference}</td>
              <td style={{ padding: "10px" }}>{item.label}</td>
              <td style={{ padding: "10px" }}>{parseFloat(item.amount).toFixed(2)} DH</td>
              <td style={{ padding: "10px", color: item.type === "Produit" ? "green" : "red" }}>
                {item.type}
              </td>
              <td style={{ padding: "10px" }}>
                {item.ressource} ({item.ressource_type})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;