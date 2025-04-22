const StatsCard = ({ title, value, change, isPositive, icon }) => {
    const bgColor = isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
    const textColor = isPositive ? 'text-green-600' : 'text-red-600';
    
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
  };
  
  export default StatsCard;