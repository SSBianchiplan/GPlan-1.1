import { TrendingUp, TrendingDown, Target } from 'lucide-react';

const GoalComparison = ({ goals }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-600';
    if (percentage >= 75) return 'bg-blue-600';
    if (percentage >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getIcon = (percentage) => {
    if (percentage >= 100) return <TrendingUp className="text-green-600" size={20} />;
    if (percentage >= 75) return <Target className="text-blue-600" size={20} />;
    return <TrendingDown className="text-red-600" size={20} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparação de Metas</h3>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getIcon(goal.percentage)}
                <span className="font-medium text-gray-800">{goal.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-600">{goal.percentage}%</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Planejado: R$ {goal.planned.toLocaleString('pt-BR')}</span>
              <span>Realizado: R$ {goal.actual.toLocaleString('pt-BR')}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(goal.percentage)}`}
                style={{ width: `${Math.min(goal.percentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {goal.percentage >= 100 ? (
                <span className="text-green-600">✓ Meta atingida!</span>
              ) : (
                <span>Faltam R$ {(goal.planned - goal.actual).toLocaleString('pt-BR')} para atingir a meta</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalComparison;
