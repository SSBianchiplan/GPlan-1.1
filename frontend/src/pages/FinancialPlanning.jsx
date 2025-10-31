import { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import FinancialChart from '../components/FinancialPlanning/FinancialChart';
import GoalComparison from '../components/FinancialPlanning/GoalComparison';
import ExportButtons from '../components/FinancialPlanning/ExportButtons';

const FinancialPlanning = () => {
  // Sample data - in production, this would come from an API
  const [financialData] = useState([
    { month: 'Jan', planned: 45000, actual: 42000 },
    { month: 'Fev', planned: 48000, actual: 51000 },
    { month: 'Mar', planned: 52000, actual: 49000 },
    { month: 'Abr', planned: 50000, actual: 53000 },
    { month: 'Mai', planned: 55000, actual: 52000 },
    { month: 'Jun', planned: 58000, actual: 60000 },
    { month: 'Jul', planned: 60000, actual: 58000 },
    { month: 'Ago', planned: 62000, actual: 65000 },
    { month: 'Set', planned: 65000, actual: 63000 },
    { month: 'Out', planned: 68000, actual: 70000 },
    { month: 'Nov', planned: 70000, actual: 68000 },
    { month: 'Dez', planned: 75000, actual: 72000 },
  ]);

  const [goals] = useState([
    {
      name: 'Receita Trimestral Q4',
      planned: 213000,
      actual: 180000,
      percentage: 84.5,
    },
    {
      name: 'Redução de Custos',
      planned: 50000,
      actual: 48000,
      percentage: 96.0,
    },
    {
      name: 'Margem de Lucro',
      planned: 150000,
      actual: 165000,
      percentage: 110.0,
    },
    {
      name: 'Investimento em Marketing',
      planned: 30000,
      actual: 22000,
      percentage: 73.3,
    },
  ]);

  const totalPlanned = financialData.reduce((sum, item) => sum + item.planned, 0);
  const totalActual = financialData.reduce((sum, item) => sum + item.actual, 0);
  const achievementRate = ((totalActual / totalPlanned) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                <DollarSign className="text-blue-600" size={32} />
                <span>Planejamento Financeiro</span>
              </h1>
              <p className="text-gray-600">
                Análise completa do desempenho financeiro e metas
              </p>
            </div>
            <ExportButtons data={financialData} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Planejado</p>
              <Calendar className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              R$ {totalPlanned.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-gray-500 mt-2">Ano completo</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Realizado</p>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              R$ {totalActual.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-green-600 mt-2">
              {totalActual > totalPlanned ? '+' : ''}{((totalActual - totalPlanned) / totalPlanned * 100).toFixed(1)}% vs planejado
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Taxa de Atingimento</p>
              <AlertCircle className="text-purple-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{achievementRate}%</p>
            <p className="text-xs text-gray-500 mt-2">Média anual</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Variação</p>
              <DollarSign className="text-orange-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              R$ {Math.abs(totalActual - totalPlanned).toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {totalActual > totalPlanned ? 'Acima' : 'Abaixo'} do planejado
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FinancialChart
            data={financialData}
            type="line"
            title="Evolução Mensal - Planejado vs Realizado"
          />
          <FinancialChart
            data={financialData}
            type="bar"
            title="Comparação por Mês"
          />
        </div>

        {/* Goals Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <GoalComparison goals={goals} />
        </div>
      </div>
    </div>
  );
};

export default FinancialPlanning;
