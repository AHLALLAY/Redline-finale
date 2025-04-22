const RecordTable = () => {
    const transactions = [
      {
        date: '15/06/2023',
        student: 'Jean Dupont',
        type: 'Frais de scolarité',
        amount: '1,200 DH',
        status: 'Payé',
        statusColor: 'bg-green-100 text-green-800'
      },
      {
        date: '14/06/2023',
        student: 'Marie Durand',
        type: 'Frais de cantine',
        amount: '350 DH',
        status: 'Payé',
        statusColor: 'bg-green-100 text-green-800'
      },
      {
        date: '10/06/2023',
        student: 'Ahmed Benali',
        type: 'Frais de scolarité',
        amount: '1,200 DH',
        status: 'En attente',
        statusColor: 'bg-yellow-100 text-yellow-800'
      }
    ];
  
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dernières Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Élève</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.student}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.statusColor}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default RecordTable;