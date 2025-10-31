import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DashboardCard = ({ title, description, icon: Icon, to, stats, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    red: 'bg-red-50 text-red-600 hover:bg-red-100',
  };

  return (
    <Link
      to={to}
      className={`block p-6 rounded-lg shadow-md transition-all hover:shadow-lg ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Icon size={24} />
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-sm opacity-80">{description}</p>
        </div>
        <ArrowRight size={20} className="opacity-60" />
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-current border-opacity-20">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
};

export default DashboardCard;
