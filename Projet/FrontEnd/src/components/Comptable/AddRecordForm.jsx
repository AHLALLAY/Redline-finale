import { useState } from "react";

function AddRecordForm({ onSuccess }) {

    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('charge');
    const [reference, setReference] = useState('');
    const [resource, setResource] = useState('');
    const [resourceType, setResourceType] = useState('client');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

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

            setLabel('');
            setAmount('');
            setType('charge');
            setReference('');
            setResource('');
            setResourceType('client');

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className=" flex space-x-20">
                    <div>
                        <div>
                            <label className="block text-sm font-medium">Libellé*</label>
                            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Montant*</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full p-2 border rounded" min="0" step="0.01" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Type*</label>
                            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded" >
                                <option value="charge">Charge</option>
                                <option value="produit">Produit</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label className="block text-sm font-medium">Référence</label>
                            <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Ressource</label>
                            <input type="text" value={resource} onChange={(e) => setResource(e.target.value)} className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Type de ressource</label>
                            <select value={resourceType} onChange={(e) => setResourceType(e.target.value)} className="w-full p-2 border rounded">
                                <option value="client">Client</option>
                                <option value="fournisseur">Fournisseur</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-3 pt-4">
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddRecordForm;