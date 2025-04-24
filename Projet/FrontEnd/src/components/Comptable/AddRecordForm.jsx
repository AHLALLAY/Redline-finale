import { useState } from "react";

function AddRecordForm() {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('charge');
  const [reference, setReference] = useState('');
  const [resource, setResource] = useState('');
  const [resourceType, setResourceType] = useState('client');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accountant/journal/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label,
          amount: parseFloat(amount),
          type,
          reference,
          resource,
          resource_type: resourceType
        })
      });

      if (!response.ok) throw new Error('Erreur lors de l\'enregistrement');

      setSuccess(true);
      setLabel('');
      setAmount('');
      setReference('');
      setResource('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Nouvelle écriture comptable</h2>

        <div>
          <label className="block text-sm font-medium">Libellé*</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Montant*</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type*</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="charge">Charge</option>
            <option value="produit">Produit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Référence</label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Ressource</label>
          <input
            type="text"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type de ressource</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="client">Client</option>
            <option value="fournisseur">Fournisseur</option>
          </select>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">Enregistré avec succès!</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {isSubmitting ? 'En cours...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}

export default AddRecordForm;